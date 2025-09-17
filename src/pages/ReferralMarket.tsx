import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import { Copy, Check, ExternalLink, RefreshCw, ShoppingCart, Lock } from "lucide-react";
import { useToast } from "../hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

// Mock data (replace with API calls)
type AddressSlot = {
  id: string; // Add a unique identifier
  address: string;
  claimedBy?: string;
  price?: number;
};

type UserReferralData = {
  referralCode: string;
  referralsCount: number;
  rewardsEarned: number;
};

const mockAddressSlots: AddressSlot[] = [
  { id: "slot1", address: "bc1q8jgnc6j3c3s9772su8vhjtp2euaxzeh3dk06h3", claimedBy: "user123", price: 0.01 },
  { id: "slot2", address: "bc1q633p7fx6yzju484atfp9yey5tjg9vw7elr4qpq", price: 0.015 },
  { id: "slot3", address: "bc1qn5hsgtsyw94lh5k099kpyly3p4zyg3mq04hjkh", price: 0.02 },
  { id: "slot4", address: "bc1qzyxwvutsrqponmlkjihgfedcba9876543210", price: 0.025 },
  { id: "slot5", address: "bc1qabcdefghijklmnopqrstuvwxyz0123456789", claimedBy: "user456", price: 0.03 },
];

const mockUserData: UserReferralData = {
  referralCode: "REF-ABC123",
  referralsCount: 5,
  rewardsEarned: 0.005,
};

const ReferralMarket: React.FC = () => {
  const [slots, setSlots] = useState<AddressSlot[]>([]);
  const [filterQuery, setFilterQuery] = useState("");
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);
  const [userData, setUserData] = useState<UserReferralData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    setIsLoading(true);
    // Simulate API fetch
    const fetchData = () => {
      setTimeout(() => {
        setSlots(mockAddressSlots);
        setUserData(mockUserData);
        setIsLoading(false);
      }, 1000);
    };
    fetchData();
  }, []);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: `${label} Copied!`,
      description: text,
      action: <Check className="h-4 w-4 text-green-500" />,
    });
  };

  const handleBuySlot = (slot: AddressSlot) => {
    if (slot.claimedBy) {
      toast({
        title: "Slot already claimed.",
        description: "This referral slot has been claimed by another user.",
        variant: "destructive",
      });
      return;
    }
    // Implement your payment/backend logic here
    toast({
      title: "Feature Not Available",
      description: "Payment and claiming functionality is not yet implemented.",
    });
  };

  const filteredSlots = slots.filter(slot => {
    const isClaimed = !!slot.claimedBy;
    const matchesFilter = slot.address.includes(filterQuery);

    if (showAvailableOnly && isClaimed) return false;
    if (filterQuery && !matchesFilter) return false;

    return true;
  });

  return (
    <Layout>
      <div className="flex flex-col items-center py-12 px-4 min-h-screen bg-background text-foreground">
        <div className="max-w-4xl w-full">
          {/* Main Hero Section */}
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-2">
              The Referral Market
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Unlock a new level of growth. Buy, sell, and manage high-value referral slots to expand your network and earn more.
            </p>
          </div>
        </div>

        {/* User Stats Card */}
        {userData && (
          <Card className="max-w-4xl w-full mb-8 shadow-lg">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-center">
                <div className="flex flex-col items-center">
                  <h3 className="text-sm uppercase font-semibold text-muted-foreground">Your Referral Code</h3>
                  <div className="flex items-center mt-2 gap-2">
                    <span className="font-mono text-lg font-bold">{userData.referralCode}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleCopy(userData.referralCode, "Referral Code")}
                    >
                      <Copy className="w-4 h-4 text-primary" />
                    </Button>
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <h3 className="text-sm uppercase font-semibold text-muted-foreground">Total Referrals</h3>
                  <p className="mt-2 text-4xl font-extrabold text-blue-600">
                    {userData.referralsCount}
                  </p>
                </div>
                <div className="flex flex-col items-center">
                  <h3 className="text-sm uppercase font-semibold text-muted-foreground">Rewards Earned</h3>
                  <p className="mt-2 text-4xl font-extrabold text-green-600">
                    {userData.rewardsEarned} BTC
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Market Controls & Slots */}
        <Card className="w-full max-w-4xl shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">Explore & Claim New Slots</CardTitle>
            <CardDescription>
              Purchase a unique Bitcoin address to use as your personal referral link. Each address can be
              claimed only once.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Filter Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div className="flex-1">
                <Label htmlFor="address-search" className="sr-only">Search Address</Label>
                <Input
                  id="address-search"
                  type="text"
                  placeholder="Search for an address..."
                  value={filterQuery}
                  onChange={(e) => setFilterQuery(e.target.value)}
                  className="w-full"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="available-only"
                  checked={showAvailableOnly}
                  onCheckedChange={setShowAvailableOnly}
                />
                <Label htmlFor="available-only">Show Available Only</Label>
              </div>
            </div>

            {/* Slots Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {isLoading ? (
                <div className="col-span-full flex justify-center items-center h-48">
                  <RefreshCw className="h-8 w-8 animate-spin text-gray-400" />
                </div>
              ) : filteredSlots.length === 0 ? (
                <p className="col-span-full text-center text-muted-foreground py-10">No slots match your criteria.</p>
              ) : (
                filteredSlots.map((slot) => {
                  const isClaimed = !!slot.claimedBy;
                  return (
                    <div
                      key={slot.id}
                      className={`relative flex flex-col justify-between p-5 rounded-lg border transition-all duration-200 ease-in-out ${
                        isClaimed ? "bg-gray-50 border-gray-200 opacity-70" : "bg-white border-blue-100 shadow-sm hover:shadow-lg"
                      }`}
                    >
                      <div className="flex-1">
                        <span className="block font-mono text-xs text-muted-foreground mb-2 truncate">
                          {slot.address}
                        </span>
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <span className={`text-lg font-bold ${isClaimed ? 'text-gray-400' : 'text-blue-600'}`}>
                          {isClaimed ? "Claimed" : `${slot.price} BTC`}
                        </span>
                        {isClaimed ? (
                          <div className="flex items-center text-sm text-gray-500 gap-1">
                            <Lock className="h-4 w-4" />
                            <span>Unavailable</span>
                          </div>
                        ) : (
                          <Button size="sm" onClick={() => handleBuySlot(slot)}>
                            <ShoppingCart className="w-4 h-4 mr-2" />
                            Buy Slot
                          </Button>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </CardContent>
        </Card>

        {/* How It Works Section */}
        <Card className="w-full max-w-4xl mt-8 shadow-lg">
          <CardHeader>
            <CardTitle>How the Referral Market Works</CardTitle>
            <CardDescription>
              Understand the rules and benefits of buying and using referral slots.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3">
              <span className="text-xl font-bold text-gray-500">1.</span>
              <p>
                **Get a Code:** Every user receives a unique referral code to share. Use it to start earning from your network.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-xl font-bold text-gray-500">2.</span>
              <p>
                **Purchase a Slot:** For enhanced rewards, you can buy an exclusive referral slot (Bitcoin address) from the market.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-xl font-bold text-gray-500">3.</span>
              <p>
                **Earn Rewards:** Referrals are tracked when new users sign up through your code or a purchased address. You get rewarded once they meet the set criteria.
              </p>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-xl font-bold text-gray-500">4.</span>
              <p>
                **All Sales are Final:** Slots are non-refundable once purchased. Ensure you've checked the address and price before confirming.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default ReferralMarket;