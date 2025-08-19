import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Mail, Phone, ExternalLink, Clock, CheckCircle } from "lucide-react";
import Layout from "@/components/Layout";

const Support = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    whatsapp: "",
    subject: "",
    message: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Support form submitted:", formData);
    setIsSubmitted(true);
  };

  const supportChannels = [
    {
      name: "Telegram Support",
      description: "Join our Telegram group for instant support",
      icon: "TG",
      color: "bg-blue-500",
      link: "https://t.me/support"
    },
    {
      name: "WhatsApp Support",
      description: "Message us directly on WhatsApp",
      icon: "WA",
      color: "bg-green-500",
      link: "https://wa.me/support"
    },
    {
      name: "Facebook Page",
      description: "Follow us and get updates on Facebook",
      icon: "FB",
      color: "bg-blue-600",
      link: "https://facebook.com/page"
    },
    {
      name: "Instagram",
      description: "Connect with us on Instagram",
      icon: "IG",
      color: "bg-pink-500",
      link: "https://instagram.com/profile"
    }
  ];

  const faqItems = [
    {
      question: "How do I start investing?",
      answer: "Simply choose an investment plan that suits your budget and goals, then follow the investment process."
    },
    {
      question: "When will I receive my ROI?",
      answer: "ROI is paid according to the specific timeframe of your chosen plan (2-3 days depending on the plan)."
    },
    {
      question: "Is my investment secure?",
      answer: "Yes, we use industry-standard security measures to protect all investments and user data."
    },
    {
      question: "Can I withdraw my investment early?",
      answer: "Investment terms are fixed for the duration specified in each plan to ensure guaranteed returns."
    }
  ];

  if (isSubmitted) {
    return (
      <Layout>
        <div className="min-h-screen py-12 flex items-center justify-center">
          <div className="max-w-2xl mx-auto px-4 text-center">
            <Card className="bg-gradient-card border-border/50 shadow-premium">
              <CardContent className="p-12">
                <CheckCircle className="w-16 h-16 text-accent mx-auto mb-6" />
                <h1 className="text-3xl font-bold text-foreground mb-4">
                  Thank You for Contacting Us!
                </h1>
                <p className="text-muted-foreground mb-8">
                  Your support request has been submitted successfully. Our team will review your message 
                  and get back to you as soon as possible.
                </p>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-4">
                      Get Immediate Help Through Our Support Channels
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      {supportChannels.map((channel) => (
                        <Button
                          key={channel.name}
                          variant="outline"
                          className="h-16 flex-col space-y-2"
                          asChild
                        >
                          <a href={channel.link} target="_blank" rel="noopener noreferrer">
                            <div className={`w-6 h-6 ${channel.color} rounded text-white text-xs flex items-center justify-center`}>
                              {channel.icon}
                            </div>
                            <span className="text-sm">{channel.name.split(' ')[0]}</span>
                          </a>
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-4">
                      Quick Links
                    </h3>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button variant="outline" asChild>
                        <a href="/feedback">
                          <MessageSquare className="w-4 h-4 mr-2" />
                          Feedback Group
                        </a>
                      </Button>
                      <Button className="bg-gradient-primary hover:shadow-glow" asChild>
                        <a href="/investment">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Investment Plans
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-gradient-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium mb-4">
              <MessageSquare className="w-4 h-4" />
              <span>Support Center</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
              How Can We Help?
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Get the support you need from our dedicated team. We're here to help you 
              with any questions or concerns about your investments.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Support Form */}
            <div className="lg:col-span-2">
              <Card className="bg-gradient-card border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Mail className="w-5 h-5" />
                    <span>Contact Support</span>
                  </CardTitle>
                  <CardDescription>
                    Fill out the form below and we'll get back to you as soon as possible
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Your full name"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="your@email.com"
                          required
                        />
                        <p className="text-xs text-muted-foreground">
                          Don't worry if your email format isn't perfect - we'll still help you!
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="whatsapp">WhatsApp Number (Optional)</Label>
                      <Input
                        id="whatsapp"
                        name="whatsapp"
                        value={formData.whatsapp}
                        onChange={handleInputChange}
                        placeholder="+1234567890"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject *</Label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder="What is your inquiry about?"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Please describe your issue or question in detail..."
                        rows={6}
                        required
                      />
                    </div>

                    <Button type="submit" className="w-full bg-gradient-primary hover:shadow-glow" size="lg">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* FAQ Section */}
              <Card className="bg-gradient-card border-border/50 mt-8">
                <CardHeader>
                  <CardTitle>Frequently Asked Questions</CardTitle>
                  <CardDescription>Quick answers to common questions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {faqItems.map((item, index) => (
                    <div key={index} className="p-4 bg-gradient-subtle rounded-lg border border-border/30">
                      <h4 className="font-semibold text-foreground mb-2">{item.question}</h4>
                      <p className="text-sm text-muted-foreground">{item.answer}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Support Channels */}
              <Card className="bg-gradient-card border-border/50">
                <CardHeader>
                  <CardTitle>Direct Support Channels</CardTitle>
                  <CardDescription>Get instant help through our social platforms</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {supportChannels.map((channel) => (
                    <Button
                      key={channel.name}
                      variant="outline"
                      className="w-full justify-start h-auto p-4"
                      asChild
                    >
                      <a href={channel.link} target="_blank" rel="noopener noreferrer">
                        <div className="flex items-center space-x-3">
                          <div className={`w-8 h-8 ${channel.color} rounded text-white text-sm flex items-center justify-center flex-shrink-0`}>
                            {channel.icon}
                          </div>
                          <div className="text-left">
                            <div className="font-medium">{channel.name}</div>
                            <div className="text-xs text-muted-foreground">{channel.description}</div>
                          </div>
                          <ExternalLink className="w-4 h-4 ml-auto" />
                        </div>
                      </a>
                    </Button>
                  ))}
                </CardContent>
              </Card>

              {/* Response Time */}
              <Card className="bg-gradient-crypto border-border/50">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Clock className="w-5 h-5" />
                    <span>Response Times</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Email Support</span>
                    <Badge variant="outline">24-48 hours</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Live Chat</span>
                    <Badge variant="default">Instant</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Social Media</span>
                    <Badge variant="outline">2-6 hours</Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Office Hours */}
              <Card className="bg-gradient-card border-border/50">
                <CardHeader>
                  <CardTitle>Support Hours</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Monday - Friday</span>
                      <span className="font-medium">24/7</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Weekend</span>
                      <span className="font-medium">24/7</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Emergency</span>
                      <span className="font-medium">Always Available</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Support;