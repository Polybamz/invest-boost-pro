import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrendingUp, DollarSign, Clock, Target, Zap, MessageSquare } from "lucide-react";
import Layout from "@/components/Layout";
import { useTranslation } from "react-i18next";
import PaymentModal from "@/components/PaymentModal";
import { useTransactions } from "@/hooks/useTransactions";

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
  const { t } = useTranslation();
  const [currentEarnings, setCurrentEarnings] = useState<Record<number, number>>({});
  const [selectedPlan, setSelectedPlan] = useState<InvestmentPlan | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const { makeInvestment, investmentsPlan, transactions, loading, error, deposit, withdraw } = useTransactions();

  const plans: InvestmentPlan[] = [
    {
      id: 1,
      name: t("starter_plan"),
      amount: 50,
      roi: 10,
      days: 3,
      tier: "starter",
      features: [t("roi_10"), t("duration_3_days"), t("basic_support")]
    },
    {
      id: 2,
      name: t("growth_plan"),
      amount: 100,
      roi: 10,
      days: 3,
      tier: "starter",
      features: [t("roi_10"), t("duration_3_days"), t("priority_support")]
    },
    {
      id: 3,
      name: t("pro_plan"),
      amount: 500,
      roi: 20,
      days: 3,
      tier: "premium",
      features: [t("roi_20"), t("duration_3_days"), t("premium_support"), t("weekly_reports")]
    },
    {
      id: 4,
      name: t("elite_plan"),
      amount: 1000,
      roi: 23,
      days: 2,
      tier: "premium",
      features: [t("roi_23"), t("duration_2_days"), t("vip_support"), t("daily_reports")]
    },
    {
      id: 5,
      name: t("executive_plan"),
      amount: 2000,
      roi: 30,
      days: 2,
      tier: "vip",
      features: [t("roi_30"), t("duration_2_days"), t("personal_manager"), t("realtime_analytics")]
    },
    {
      id: 6,
      name: t("diamond_plan"),
      amount: 5000,
      roi: 35,
      days: 2,
      tier: "vip",
      features: [t("roi_35"), t("duration_2_days"), t("dedicated_support"), t("custom_strategies")]
    },
    {
      id: 7,
      name: t("platinum_plan"),
      amount: 10000,
      roi: 40,
      days: 2,
      tier: "vip",
      features: [t("roi_40"), t("duration_2_days"), t("white_glove_service"), t("exclusive_access")]
    }
  ];


  console.log("Investment Plans:", investmentsPlan);

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

  const handleInvestClick = (plan: InvestmentPlan) => {
    setSelectedPlan(plan);
    setShowPaymentModal(true);
  };

  return (
    <Layout>
      <div className="min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-gradient-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium mb-4">
              <TrendingUp className="w-4 h-4" />
              <span>{t('crypto_investment_plans')}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
              {t('invest_in_your_future')}
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t('investment_header_desc')}
            </p>
          </div>

          {/* Live Stats Bar */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
            <Card className="bg-gradient-card border-border/50">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <DollarSign className="w-5 h-5 text-accent" />
                  <div>
                    <p className="text-sm text-muted-foreground">{t("total_invested")}</p>
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
                    <p className="text-sm text-muted-foreground">{t("active_investors")}</p>
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
                    <p className="text-sm text-muted-foreground">{t("avg_roi")}</p>
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
                    <p className="text-sm text-muted-foreground">{t("success_rate")}</p>
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
                <Card key={plan.id} className={`relative overflow-hidden transition-all duration-300  ${loading? 'opacity-50 pointer-events-none blur' : ''} hover:scale-105 ${getTierColor(plan.tier)}`}>
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
                        {t("roi_in_days", { roi: plan.roi, days: plan.days })}
                      </CardDescription>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    {/* Live Earnings Display */}
                    <div className="bg-gradient-card rounded-lg p-4 border border-border/30">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-muted-foreground">{t("live_example_earnings")}</span>
                        <div className="flex items-center space-x-1">
                          <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
                          <span className="text-xs text-accent">{t("live")}</span>
                        </div>
                      </div>
                      <div className="text-2xl font-bold text-accent">
                        ${liveEarning.toFixed(2)}
                      </div>
                      <Progress value={progressPercentage} className="mt-2" />
                      <div className="text-xs text-muted-foreground mt-1">
                        {t("expected")}: ${expectedReturn}
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

                    {/* Investment Buttons */}
                    <div className="space-y-3">
                      <Button 
                        className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300"
                        size="lg"
                        onClick={() => handleInvestClick(plan)}
                      >
                        <DollarSign className="w-4 h-4 mr-2" />
                        {t("invest_now")}
                      </Button>
                      <Button 
                        variant="outline"
                        className="w-full"
                        size="lg"
                        onClick={() => window.location.href = '/feedback'}
                      >
                        <MessageSquare className="w-4 h-4 mr-2" />
                        {t("view_feedback")}
                      </Button>
                    </div>

                    {/* ROI Calculation */}
                    <div className="text-center p-3 bg-accent/10 rounded-lg">
                      <div className="text-sm text-muted-foreground">{t("total_return")}</div>
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
                  {t("ready_to_start_investment")}
                </h3>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  {t("join_successful_investors")}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="bg-gradient-primary hover:shadow-glow">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    {t("view_all_plans")}
                  </Button>
                  <Button size="lg" variant="outline">
                    {t("learn_more")}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {selectedPlan && (
        <PaymentModal
          isOpen={showPaymentModal}
          onClose={() => {
            setShowPaymentModal(false);
            setSelectedPlan(null);
          }}
          planName={selectedPlan.name}
          planAmount={selectedPlan.amount}
        />
      )}
    </Layout>
  );
};

export default Investment;