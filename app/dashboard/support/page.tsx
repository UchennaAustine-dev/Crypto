"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { MessageCircle, Phone, Mail } from "lucide-react";
import { toast } from "react-hot-toast";

const faqs = [
  {
    question: "How do I deposit funds?",
    answer:
      "To deposit funds, go to your wallet section and click on 'Deposit'. You can choose from various payment methods including bank transfer, credit/debit card, or cryptocurrency transfer. Follow the on-screen instructions to complete your deposit.",
  },
  {
    question: "How do I start trading?",
    answer:
      "To start trading, first ensure your account is funded. Then navigate to the Trading section, select your desired trading pair, enter the amount you wish to trade, and click either 'Buy' or 'Sell' depending on your trading direction.",
  },
  {
    question: "What are the trading fees?",
    answer:
      "Trading fees vary based on your monthly trading volume and membership tier. Basic accounts start at 0.1% per trade. You can view our complete fee schedule in the Trading Fees section of our website.",
  },
  {
    question: "How do I withdraw my funds?",
    answer:
      "To withdraw funds, go to your wallet and click 'Withdraw'. Select your withdrawal method, enter the amount and required details. Note that withdrawals may take 1-3 business days to process depending on the method chosen.",
  },
  {
    question: "Is my account secure?",
    answer:
      "Yes, we implement multiple security measures including 2FA, cold storage for funds, and regular security audits. We recommend enabling all security features in your account settings for maximum protection.",
  },
];

export default function SupportPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmitTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // Implement support ticket submission
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Support ticket submitted successfully");
      // Reset form
    } catch (error) {
      toast.error("Failed to submit support ticket");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto p-4 lg:p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Support Center</h1>
        <p className="text-muted-foreground">
          Get help with your account and trading
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="h-5 w-5" />
                Live Chat
              </CardTitle>
              <CardDescription>Chat with our support team</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full">Start Chat</Button>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                Phone Support
              </CardTitle>
              <CardDescription>Call our support line</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                +1 (800) 123-4567
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Email Support
              </CardTitle>
              <CardDescription>Send us an email</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full">
                support@crypto.com
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Submit a Ticket</CardTitle>
              <CardDescription>
                We typically respond within 24 hours
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitTicket} className="space-y-4">
                <div className="space-y-2">
                  <Input placeholder="Subject" />
                </div>
                <div className="space-y-2">
                  <Textarea
                    placeholder="Describe your issue in detail"
                    className="min-h-[100px]"
                  />
                </div>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Submitting..." : "Submit Ticket"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>
                Quick answers to common questions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible>
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                    <AccordionContent>{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
