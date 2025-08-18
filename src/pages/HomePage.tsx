import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Shield, Users, Zap, Star, DollarSign, MessageCircle, Briefcase } from "lucide-react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";

const HomePage = () => {
  const features = [
    {
      icon: TrendingUp,
      title: "High ROI Returns",
      description: "Up to 40% returns on your investment with our premium plans",
      color: "text-accent"
    },
    {
      icon: Shield,
      title: "Secure Platform",
      description: "Bank-level security with encrypted transactions and data protection",
      color: "text-crypto-blue"
    },
    {
      icon: Users,
      title: "Referral Program",
      description: "Earn additional income by referring friends and family",
      color: "text-primary"
    },
    {
      icon: Zap,
      title: "Instant Payouts",
      description: "Fast and reliable payment processing for all withdrawals",
      color: "text-warning"
    }
  ];

  const stats = [
    { label: "Total Invested", value: "$2.4M+", icon: DollarSign },
    { label: "Active Users", value: "15,847", icon: Users },
    { label: "Success Rate", value: "98.7%", icon: Star },
    { label: "Daily Payouts", value: "$45K+", icon: TrendingUp }
  ];

  return (
    <Layout>
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 lg:py-32">
          <div className="absolute inset-0 bg-gradient-hero" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="inline-flex items-center space-x-2 bg-gradient-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium mb-6">
                <TrendingUp className="w-4 h-4" />
                <span>Crypto Investment Platform</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6">
                Invest in Cryptocurrency
                <span className="block bg-gradient-primary bg-clip-text text-transparent">
                  Maximize Your Returns
                </span>
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
                Join the leading cryptocurrency investment platform with proven track record of 
                delivering consistent returns. Start your journey to financial freedom today.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Link to="/investment">
                  <Button size="lg" className="bg-gradient-primary hover:shadow-glow transition-all duration-300">
                    <TrendingUp className="w-5 h-5 mr-2" />
                    Start Investing
                  </Button>
                </Link>
                <Link to="/feedback">
                  <Button size="lg" variant="outline" className="border-border/50 hover:bg-secondary/50">
                    <MessageCircle className="w-5 h-5 mr-2" />
                    View Testimonials
                  </Button>
                </Link>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
                {stats.map((stat, index) => (
                  <Card key={index} className="bg-gradient-card border-border/50 backdrop-blur-sm">
                    <CardContent className="p-4 text-center">
                      <stat.icon className="w-6 h-6 text-primary mx-auto mb-2" />
                      <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Why Choose Our Platform?
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                We provide everything you need to succeed in cryptocurrency investment
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <Card key={index} className="bg-gradient-card border-border/50 hover:shadow-card transition-all duration-300 hover:scale-105">
                  <CardHeader className="text-center">
                    <div className="mx-auto w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center mb-4">
                      <feature.icon className={`w-6 h-6 ${feature.color}`} />
                    </div>
                    <CardTitle className="text-xl font-semibold">{feature.title}</CardTitle>
                    <CardDescription className="text-muted-foreground">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Important Categories Section */}
        <section className="py-20 bg-gradient-card/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Important Categories
              </h2>
              <p className="text-xl text-muted-foreground">
                Essential features for your investment success
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Investment */}
              <Card className="bg-gradient-card border-border/50 hover:shadow-premium transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-6 h-6 text-primary" />
                    <CardTitle className="text-xl">Investment Plans</CardTitle>
                    <Badge variant="destructive" className="text-xs">Important</Badge>
                  </div>
                  <CardDescription>
                    Explore our profitable investment plans with guaranteed returns
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link to="/investment">
                    <Button className="w-full bg-gradient-primary">
                      View Plans
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Feedback */}
              <Card className="bg-gradient-card border-border/50 hover:shadow-premium transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <MessageCircle className="w-6 h-6 text-accent" />
                    <CardTitle className="text-xl">User Feedback</CardTitle>
                    <Badge variant="destructive" className="text-xs">Important</Badge>
                  </div>
                  <CardDescription>
                    Read testimonials from our successful investors
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link to="/feedback">
                    <Button className="w-full" variant="outline">
                      Read Reviews
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Employment */}
              <Card className="bg-gradient-card border-border/50 hover:shadow-premium transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center space-x-2">
                    <Briefcase className="w-6 h-6 text-warning" />
                    <CardTitle className="text-xl">Employment</CardTitle>
                    <Badge variant="destructive" className="text-xs">Important</Badge>
                  </div>
                  <CardDescription>
                    Join our team and earn through referrals and partnerships
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link to="/employment">
                    <Button className="w-full" variant="outline">
                      Learn More
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <Card className="bg-gradient-crypto border-border/50 shadow-premium">
              <CardContent className="p-12">
                <h3 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                  Ready to Start Your Investment Journey?
                </h3>
                <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Join thousands of investors who trust our platform for consistent, profitable returns. 
                  Your financial freedom starts here.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link to="/investment">
                    <Button size="lg" className="bg-gradient-primary hover:shadow-glow">
                      <TrendingUp className="w-5 h-5 mr-2" />
                      Get Started Now
                    </Button>
                  </Link>
                  <Link to="/support">
                    <Button size="lg" variant="outline">
                      Contact Support
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default HomePage;