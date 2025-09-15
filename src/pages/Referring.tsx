import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Users, DollarSign, Gift, Share2, Copy, Trophy, Check  } from "lucide-react";
import Layout from "@/components/Layout";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";

const Referring = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const { toast } = useToast();
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const baseURL = window.location.origin;

  const referralTiers = [
    {
      tier: 1,
      commission: 10,
      color: "border-blue-500/50 bg-blue-500/5",
      icon: Users,
      requirements: t('direct_referrals'),
      description: t('earn_10_percent_commission')
    },
    {
      tier: 2,
      commission: 7,
      color: "border-purple-500/50 bg-purple-500/5",
      icon: Share2,
      requirements: t('second_level_referrals'),
      description: t('earn_7_percent_commission')
    },
    {
      tier: 3,
      commission: 5,
      color: "border-yellow-500/50 bg-yellow-500/5 shadow-glow",
      icon: Trophy,
      requirements: t('third_level_referrals'),
      description: t('earn_5_percent_commission')
    }
  ];

  const stats = [
    { label: t("total_referrals"), value: "0", icon: Users },
    { label: t("active_referrals"), value: "0", icon: Share2 },
    { label: t("total_earnings"), value: "$0.00", icon: DollarSign },
    { label: t("this_month"), value: "$0.00", icon: Trophy }
  ];

    const handleCopyLink = async (referralLink) => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopiedLink(true);
      toast({
        title: "Referral Link Copied",
        description: "You can now share it with your friends!",
        duration: 3000,
      });
      setTimeout(() => setCopiedLink(false), 2000); // Revert after 2 seconds
    } catch (err) {
      console.error('Failed to copy referral link: ', err);
    }
  }; const handleCopyCode = async (referralCode: string) => {
    try {
      await navigator.clipboard.writeText(referralCode);
      setCopiedCode(true);
      toast({
        title: "Referral Code Copied",
        description: "You can now share it with your friends!",
        duration: 3000,
      });
      setTimeout(() => setCopiedCode(false), 2000); // Revert after 2 seconds
    } catch (err) {
      console.error('Failed to copy referral code: ', err);
    }
  };


  return (
    <Layout>
      <div className="min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-gradient-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Users className="w-4 h-4" />
              <span>{t("referral_program")}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
              {t("earn_while_you_share")}
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t("invite_friends_and_earn")}
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
                    <span>{t("your_referral_link")}</span>
                  </CardTitle>
                  <CardDescription>
                    {t("share_link_with_friends")}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="referral-link">{t("referral_link")}</Label>
                    <div className="flex space-x-2">
                      <Input 
                        id="referral-link"
                        value={`${baseURL}/auth/${user?.referralCode || 'YOURCODE'}`}
                        readOnly
                        className="flex-1"
                      />
                      <Button size="icon" variant="outline" onClick={() => handleCopyLink(`${baseURL}/auth/${user?.referralCode || 'YOURCODE'}`)}>
                        { copiedLink ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="referral-code">{t("referral_code")}</Label>
                    <div className="flex space-x-2">
                      <Input 
                        id="referral-code"
                        value={user?.referralCode || 'YOURCODE'}
                        readOnly
                        className="flex-1"
                      />
                      <Button size="icon" variant="outline" onClick={() => handleCopyCode(user?.referralCode || 'YOURCODE') }>
                        { copiedCode ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>

                  <Button className="w-full bg-gradient-primary hover:shadow-glow">
                    <Share2 className="w-4 h-4 mr-2" />
                    {t("share_link")}
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Commission Tiers */}
            <div className="lg:col-span-2">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-foreground mb-4">{t("commission_structure")}</h3>
                {referralTiers.map((tier) => (
                  <Card key={tier.tier} className={`transition-all duration-300 hover:scale-105 ${tier.color}`}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-accent/20 rounded-full">
                            <tier.icon className="w-6 h-6 text-accent" />
                          </div>
                          <div>
                            <CardTitle className="text-xl">{t("tier", { tier: tier.tier })}</CardTitle>
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
                      <div className="text-sm text-muted-foreground">{t("example_if_invests", { amount: 1000 })}</div>
                      <div className="text-lg font-bold text-accent">
                        {t("you_earn", { amount: (1000 * tier.commission / 100).toFixed(2) })}
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
                <span>{t("referral_market_coming_soon")}</span>
              </CardTitle>
              <CardDescription>
                {t("advanced_referral_marketplace")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Gift className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {t("exciting_features_coming_soon")}
                </h3>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  {t("get_ready_for_marketplace")}
                </p>
                <Button variant="outline" size="lg">
                  <Gift className="w-4 h-4 mr-2" />
                  {t("notify_me_when_available")}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Bottom CTA */}
          <div className="text-center">
            <Card className="bg-gradient-card border-border/50">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  {t("ready_to_start_earning")}
                </h3>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  {t("join_referral_program_today")}
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="bg-gradient-primary hover:shadow-glow">
                    <Users className="w-4 h-4 mr-2" />
                    {t("start_referring_now")}
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
    </Layout>
  );
};

export default Referring;