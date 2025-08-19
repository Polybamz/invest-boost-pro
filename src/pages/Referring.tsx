import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Users, DollarSign, Gift, Share2, Copy, Trophy } from "lucide-react";
import Layout from "@/components/Layout";

const Referring = () => {
  const referralTiers = [
    {
      tier: 1,
      commission: 10,
      color: "border-blue-500/50 bg-blue-500/5",
      icon: Users,
      requirements: "Direct referrals",
      description: "Earn 10% commission on every investment made by users you directly refer"
    },
    {
      tier: 2,
      commission: 7,
      color: "border-purple-500/50 bg-purple-500/5",
      icon: Share2,
      requirements: "Second level referrals",
      description: "Earn 7% commission on investments from referrals of your referrals"
    },
    {
      tier: 3,
      commission: 5,
      color: "border-yellow-500/50 bg-yellow-500/5 shadow-glow",
      icon: Trophy,
      requirements: "Third level referrals",
      description: "Earn 5% commission on third-level referral investments"
    }
  ];

  const stats = [
    { label: "Total Referrals", value: "0", icon: Users },
    { label: "Active Referrals", value: "0", icon: Share2 },
    { label: "Total Earnings", value: "$0.00", icon: DollarSign },
    { label: "This Month", value: "$0.00", icon: Trophy }
  ];

  return (
    <Layout>
      <div className="min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-gradient-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Users className="w-4 h-4" />
              <span>Referral Program</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
              Earn While You Share
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Invite friends and earn up to 10% commission on their investments. 
              Build your network and maximize your passive income.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {stats.map((stat, index) => (
              <Card key={index} className="bg-gradient-card border-border/50">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <stat.icon className="w-5 h-5 text-accent" />
                    <div>
                      <p className="text-sm text-muted-foreground">{stat.label}</p>
                      <p className="text-lg font-bold text-foreground">{stat.value}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Referral Link Section */}
            <div className="lg:col-span-1">
              <Card className="bg-gradient-card border-border/50 h-fit">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Share2 className="w-5 h-5" />
                    <span>Your Referral Link</span>
                  </CardTitle>
                  <CardDescription>
                    Share this link with friends to start earning commissions
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="referral-link">Referral Link</Label>
                    <div className="flex space-x-2">
                      <Input 
                        id="referral-link"
                        value="https://platform.com/ref/USER123"
                        readOnly
                        className="flex-1"
                      />
                      <Button size="icon" variant="outline">
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="referral-code">Referral Code</Label>
                    <div className="flex space-x-2">
                      <Input 
                        id="referral-code"
                        value="USER123"
                        readOnly
                        className="flex-1"
                      />
                      <Button size="icon" variant="outline">
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <Button className="w-full bg-gradient-primary hover:shadow-glow">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share Link
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Commission Tiers */}
            <div className="lg:col-span-2">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-foreground mb-4">Commission Structure</h3>
                {referralTiers.map((tier) => (
                  <Card key={tier.tier} className={`transition-all duration-300 hover:scale-105 ${tier.color}`}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-accent/20 rounded-full">
                            <tier.icon className="w-6 h-6 text-accent" />
                          </div>
                          <div>
                            <CardTitle className="text-xl">Tier {tier.tier}</CardTitle>
                            <CardDescription>{tier.requirements}</CardDescription>
                          </div>
                        </div>
                        <Badge variant="default" className="text-lg px-4 py-2">
                          {tier.commission}%
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{tier.description}</p>
                      <div className="mt-4 p-3 bg-accent/10 rounded-lg">
                        <div className="text-sm text-muted-foreground">Example: If your referral invests $1,000</div>
                        <div className="text-lg font-bold text-accent">
                          You earn: ${(1000 * tier.commission / 100).toFixed(2)}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Referral Market Section */}
          <Card className="bg-gradient-crypto border-border/50 shadow-premium mb-12">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Gift className="w-5 h-5" />
                <span>Referral Market (Coming Soon)</span>
              </CardTitle>
              <CardDescription>
                Advanced referral marketplace with additional earning opportunities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Gift className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  Exciting Features Coming Soon
                </h3>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Get ready for our advanced referral marketplace where you can trade referral 
                  positions, participate in bonus campaigns, and unlock exclusive rewards.
                </p>
                <Button variant="outline" size="lg">
                  <Gift className="w-4 h-4 mr-2" />
                  Notify Me When Available
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Bottom CTA */}
          <div className="text-center">
            <Card className="bg-gradient-card border-border/50">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  Ready to Start Earning?
                </h3>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Join our referral program today and turn your network into a passive income stream. 
                  The more you share, the more you earn!
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="bg-gradient-primary hover:shadow-glow">
                    <Users className="w-4 h-4 mr-2" />
                    Start Referring Now
                  </Button>
                  <Button size="lg" variant="outline">
                    Learn More
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Referring;