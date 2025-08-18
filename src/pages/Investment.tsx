import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, DollarSign, Clock, Target, Zap } from "lucide-react";
import Layout from "@/components/Layout";

interface InvestmentPlan {
  id: number;
  name: string;
  amount: number;
  roi: number;
  days: number;
  tier: "starter" | "premium" | "vip";
  features: string[];
}

const Investment = () => {
  const [currentEarnings, setCurrentEarnings] = useState<Record<number, number>>({});

  const plans: InvestmentPlan[] = [
    {
      id: 1,
      name: "Starter Plan",
      amount: 50,
      roi: 10,
      days: 3,
      tier: "starter",
      features: ["10% ROI", "3 Days Duration", "Basic Support"]
    },
    {
      id: 2,
      name: "Growth Plan",
      amount: 100,
      roi: 10,
      days: 3,
      tier: "starter",
      features: ["10% ROI", "3 Days Duration", "Priority Support"]
    },
    {
      id: 3,
      name: "Pro Plan",
      amount: 500,
      roi: 20,
      days: 3,
      tier: "premium",
      features: ["20% ROI", "3 Days Duration", "Premium Support", "Weekly Reports"]
    },
    {
      id: 4,
      name: "Elite Plan",
      amount: 1000,
      roi: 23,
      days: 2,
      tier: "premium",
      features: ["23% ROI", "2 Days Duration", "VIP Support", "Daily Reports"]
    },
    {
      id: 5,
      name: "Executive Plan",
      amount: 2000,
      roi: 30,
      days: 2,
      tier: "vip",
      features: ["30% ROI", "2 Days Duration", "Personal Manager", "Real-time Analytics"]
    },
    {
      id: 6,
      name: "Diamond Plan",
      amount: 5000,
      roi: 35,
      days: 2,
      tier: "vip",
      features: ["35% ROI", "2 Days Duration", "Dedicated Support", "Custom Strategies"]
    },
    {
      id: 7,
      name: "Platinum Plan",
      amount: 10000,
      roi: 40,
      days: 2,
      tier: "vip",
      features: ["40% ROI", "2 Days Duration", "White Glove Service", "Exclusive Access"]
    }
  ];

  // Simulate live earnings growth
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentEarnings(prev => {
        const newEarnings = { ...prev };
        plans.forEach(plan => {
          const baseEarning = (plan.amount * plan.roi) / 100;
          const randomMultiplier = 0.8 + Math.random() * 0.4; // 80% to 120% of expected
          newEarnings[plan.id] = baseEarning * randomMultiplier;
        });
        return newEarnings;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "starter": return "border-blue-500/50 bg-blue-500/5";
      case "premium": return "border-purple-500/50 bg-purple-500/5";
      case "vip": return "border-yellow-500/50 bg-yellow-500/5 shadow-glow";
      default: return "";
    }
  };

  const getTierBadgeVariant = (tier: string) => {
    switch (tier) {
      case "starter": return "secondary";
      case "premium": return "outline";
      case "vip": return "default";
      default: return "secondary";
    }
  };

  return (
    <Layout>
      <div className="min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-gradient-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium mb-4">
              <TrendingUp className="w-4 h-4" />
              <span>Cryptocurrency Investment Plans</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
              Invest in Your Future
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Choose from our carefully crafted investment plans designed to maximize your returns 
              with industry-leading ROI rates and flexible durations.
            </p>
          </div>

          {/* Live Stats Bar */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
            <Card className="bg-gradient-card border-border/50">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <DollarSign className="w-5 h-5 text-accent" />
                  <div>
                    <p className="text-sm text-muted-foreground">Total Invested</p>
                    <p className="text-lg font-bold text-foreground">$2.4M+</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-card border-border/50">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Target className="w-5 h-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">Active Investors</p>
                    <p className="text-lg font-bold text-foreground">15,847</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-card border-border/50">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Clock className="w-5 h-5 text-warning" />
                  <div>
                    <p className="text-sm text-muted-foreground">Avg ROI</p>
                    <p className="text-lg font-bold text-foreground">24.5%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-card border-border/50">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Zap className="w-5 h-5 text-crypto-blue" />
                  <div>
                    <p className="text-sm text-muted-foreground">Success Rate</p>
                    <p className="text-lg font-bold text-foreground">98.7%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Investment Plans */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {plans.map((plan) => {
              const expectedReturn = (plan.amount * plan.roi) / 100;
              const liveEarning = currentEarnings[plan.id] || expectedReturn;
              const progressPercentage = (liveEarning / expectedReturn) * 100;

              return (
                <Card key={plan.id} className={`relative overflow-hidden transition-all duration-300 hover:scale-105 ${getTierColor(plan.tier)}`}>
                  <CardHeader className="space-y-4">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl font-bold">{plan.name}</CardTitle>
                      <Badge variant={getTierBadgeVariant(plan.tier)} className="capitalize">
                        {plan.tier}
                      </Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="text-3xl font-bold text-foreground">
                        ${plan.amount}
                      </div>
                      <CardDescription>
                        {plan.roi}% ROI in {plan.days} day{plan.days > 1 ? 's' : ''}
                      </CardDescription>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    {/* Live Earnings Display */}
                    <div className="bg-gradient-card rounded-lg p-4 border border-border/30">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground">Live Example Earnings</span>
                        <div className="flex items-center space-x-1">
                          <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                          <span className="text-xs text-accent">Live</span>
                        </div>
                      </div>
                      <div className="text-2xl font-bold text-accent">
                        ${liveEarning.toFixed(2)}
                      </div>
                      <Progress value={progressPercentage} className="mt-2" />
                      <div className="text-xs text-muted-foreground mt-1">
                        Expected: ${expectedReturn}
                      </div>
                    </div>

                    {/* Features */}
                    <div className="space-y-2">
                      {plan.features.map((feature, index) => (
                        <div key={index} className="flex items-center space-x-2 text-sm">
                          <div className="w-1.5 h-1.5 bg-accent rounded-full" />
                          <span className="text-muted-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* Investment Button */}
                    <Button 
                      className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300"
                      size="lg"
                    >
                      <DollarSign className="w-4 h-4 mr-2" />
                      Invest Now
                    </Button>

                    {/* ROI Calculation */}
                    <div className="text-center p-3 bg-accent/10 rounded-lg">
                      <div className="text-sm text-muted-foreground">Total Return</div>
                      <div className="text-lg font-bold text-accent">
                        ${(plan.amount + expectedReturn).toFixed(2)}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Bottom CTA Section */}
          <div className="mt-16 text-center">
            <Card className="bg-gradient-crypto border-border/50 shadow-premium">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  Ready to Start Your Investment Journey?
                </h3>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Join thousands of successful investors who trust our platform for consistent returns. 
                  Start with any plan and watch your investment grow.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="bg-gradient-primary hover:shadow-glow">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    View All Plans
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

export default Investment;