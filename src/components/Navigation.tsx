import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Menu, X, TrendingUp, Users, ShoppingCart, MessageCircle, FileText, Home, Headphones, Briefcase, Gift, User, Settings, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import LanguageSwitcher from "../components/LanguageSwitcher";


const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const location = useLocation();
  const { user, logOut } = useAuth();
  const navigationItems = [
    { name: "Home", href: "/", icon: Home, important: false },
    { name: "Investment", href: "/investment", icon: TrendingUp, important: false },
    { name: "Feedback", href: "/feedback", icon: MessageCircle, important: false },
    // { name: "Employment", href: "/employment", icon: Briefcase, important: false },
    { name: "Referring", href: "/referring", icon: Users },
    { name: "Shop", href: "/shop", icon: ShoppingCart },
    { name: "Buy Crypto", href: "/buy-crypto", icon: Gift },
    // { name: "Blog", href: "/blog", icon: FileText },
    { name: "Support", href: "/support", icon: Headphones },
  ];

  return (
    <nav className="bg-gradient-hero border-b border-border/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500  rounded-lg flex items-center justify-center shadow-glow">
                <img src="/images/logo/logo.png" alt="Logo" className="w-9 h-9" />
              </div>
              <span className="text-xl font-bold text-foreground">CryptoInvest</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navigationItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link key={item.name} to={item.href} className={`relative flex items-center space-x-2 px-2 rounded transition-smooth ${isActive ? 'bg-green-500' : ''}`}>
                  {/* <Button
                    variant={isActive ? "default" : "ghost"}
                    size="sm"
                    className="relative flex items-center space-x-2 transition-smooth"
                  > */}
                  <item.icon className="w-4 h-4" />
                  <span>{item.name}</span>
                  {item.important && (
                    <Badge variant="destructive" className="absolute -top-1 -right-1 px-1 text-xs">
                      !
                    </Badge>
                  )}
                  {/* </Button> */}
                </Link>
              );
            })}
          </div>
          <LanguageSwitcher />

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
          <div className='relative max-lg:hidden flex items-center justify-center space-x-2 border-2 border-white h-10 w-10 rounded-full'>
            <User onClick={() => setShowProfile(!showProfile)} className="cursor-pointer text-[11px]" />
            {showProfile && (<div className="absolute -top-[-100%] -right-1 px-1 min-w-[150px] text-xs rounded-sm bg-background text-primary-foreground flex flex-col gap-2 shadow-glow">
              <Link to={'/profile'} className="flex items-center justify-start gap-2 space-x-1 text-[15px] text-foreground hover:bg-gradient-primary  py-2 px-4 "><User />My Profile</Link>
              <Link to={'/settings'} className="flex items-center justify-start gap-2 space-x-1 text-[15px] text-foreground hover:bg-gradient-primary  py-2 px-4 "><Settings /> {'Settings'}</Link>
              <div className="flex items-center justify-start gap-2 space-x-1 text-[15px]  text-foreground cursor-pointer hover:bg-gradient-primary  py-2 px-4" onClick={logOut}><LogOut className="text-red-500" /> {'Logout'}</div>
              <button className="flex items-center justify-start gap-2 space-x-1 text-[15px]  text-foreground cursor-pointer hover:bg-gradient-primary  py-2 px-4">Withdraw</button>
              <button className="flex items-center justify-start gap-2 space-x-1 text-[15px]  text-foreground cursor-pointer hover:bg-gradient-primary  py-2 px-4">Deposite</button>

            </div>)}
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-card rounded-lg mt-2 mb-4 shadow-card">
              <p>{user.firstName} {user.lastName}</p>
              {navigationItems.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link key={item.name} to={item.href}>
                    <Button
                      variant={isActive ? "default" : "ghost"}
                      size="sm"
                      className="w-full justify-start relative flex items-center space-x-2"
                      onClick={() => setIsOpen(false)}
                    >
                      <item.icon className="w-4 h-4" />
                      <span>{item.name}</span>
                      {item.important && (
                        <Badge variant="destructive" className="ml-auto px-1 text-xs">
                          Important
                        </Badge>
                      )}
                    </Button>
                  </Link>
                );
              })}
              <Link to={'/settings'} className="flex items-center justify-start gap-2 space-x-1 text-[15px] text-foreground "><User /> {'Settings'}</Link>
              <div className="flex items-center justify-start gap-2 space-x-1 text-[15px]  text-foreground cursor-pointer" onClick={logOut}><User /> {'Logout'}</div>
              <button className="flex items-center justify-start gap-2 space-x-1 text-[15px]  text-foreground cursor-pointer hover:bg-gradient-primary  py-2 px-4">Withdraw</button>
              <button className="flex items-center justify-start gap-2 space-x-1 text-[15px]  text-foreground cursor-pointer hover:bg-gradient-primary  py-2 px-4">Deposite</button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;