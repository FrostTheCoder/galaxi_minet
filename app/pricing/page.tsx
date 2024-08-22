"use client";

import React from 'react';
import { Check, Rocket, Zap, Crown, Cross, CircleX, CircleCheck } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useAction } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useUser } from '@clerk/nextjs';
import { motion } from 'framer-motion';

const PricingTier = ({ name, price, features, Icon, antifeatures, priceId, onSubscribe }: any) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    transition={{ duration: 0.3 }}
    className="flex flex-col"
  >
    <Card className="bg-gray-900 text-white">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon className="h-5 w-5" />
          {name}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="text-3xl font-bold mb-5">${price}<span className="text-xl font-normal">/mo</span></div>
        <ul className="space-y-2">
          {features.map((feature: any, index: any) => (
            <li key={index} className="flex items-center text-sm">
              <CircleCheck className="h-4 w-4 mr-2 flex-shrink-0 text-green-500" />
              <span>{feature}</span>
            </li>
          ))}
          {antifeatures?.map((antifeature: any, index: any) => (
            <li key={index} className="flex items-center text-sm">
              <CircleX className="h-4 w-4 mr-2 flex-shrink-0 text-red-500" />
              <span>{antifeature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500"
          onClick={() => onSubscribe(priceId)}
        >
          Choose Plan
        </Button>
      </CardFooter>
    </Card>
  </motion.div>
);

const GalaxiPricingPage = () => {
  const { user, isLoaded: isUserLoaded } = useUser();
  const pay = useAction(api.stripe.pay);

  const handleSubscribe = async (priceId: string) => {
    try {
      const checkoutUrl = await pay({ priceId });
      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      }
    } catch (error) {
      console.error('Error initiating checkout:', error);
      
    }
  };

  const pricingTiers = [
    {
      name: "Explorer",
      price: "199",
      icon: Rocket,
      priceId: "price_1PpSZxSGnnk5ihT852H8Zk0R", 
      features: [
        "4 trips a month",
        "Standard entertainment package",
        "20kg luggage allowance",
        "1 ton cargo allowance",
      ],
      antifeatures: [
        "No priority boarding",
        "No priority luggage collection",
        "No premium seats",
      ],
    },
    {
      name: "Voyager",
      price: "399",
      icon: Zap,
      priceId: "price_1PpSaoSGnnk5ihT8BGUuwNsR", 
      features: [
        "10 trips a month",
        "Premium entertainment suite",
        "Priority boarding",
        "50kg luggage allowance",
        "3 ton cargo allowance",
        "Premium seats"
      ],
      antifeatures: [
        "No private seats",
        "No dining services",
      ]
    },
    {
      name: "Columbus",
      price: "799",
      icon: Crown,
      priceId: "price_1PpScbSGnnk5ihT8CfyVkyzU", // Replace with actual Stripe price ID
      features: [
        "20 trips a month",
        "Exclusive VR experiences and entertainment",
        "VIP lounge access",
        "100kg luggage allowance",
        "8 ton cargo allowance",
        "Private, leathered seats"
      ],
    },
  ];

  if (!isUserLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-center mb-3">Galaxi Travel Plans</h1>
      <p className="text-center mb-10 max-w-2xl mx-auto">Choose your gateway to the stars. Our flexible monthly passes offer unparalleled access to the wonders of the universe.</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {pricingTiers.map((tier, index) => (
          <PricingTier
            key={index}
            {...tier}
            Icon={tier.icon}
            onSubscribe={handleSubscribe}
          />
        ))}
      </div>
    </div>
  );
};

export default GalaxiPricingPage;
