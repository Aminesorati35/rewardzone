import { Gift, Shield, TrendingUp, Users, Zap } from "lucide-react";

const rewards = [
  {
    id: "robux",
    title: "Free Robux",
    shortName: "ROBUX REWARDS",
    provider: "Roblox Platform",
    rating: 4.9,
    claimed: "3.8M",
    value: "5000",
    time: "5 min",
    lockerId: "6ndjjm",
    category: "Gaming Currency",
    heroImage: "https://cdn.mos.cms.futurecdn.net/WUdnquJWWuu73Mbt6Ek3KW.jpg",
    images: [
      "https://tr.rbxcdn.com/180DAY-77f32e653e53a15c2f1d3b84e71ba3a3/768/432/Image/Webp/noFilter",
      "https://staticg.sportskeeda.com/editor/2024/09/8e6d2-17266902206093-1920.jpg",
      "https://tr.rbxcdn.com/180DAY-bcf72f7a2e90406a5f6d17c574e5dd3d/768/432/Image/Webp/noFilter"
    ],
    features: [
      { icon: Zap, title: "Instant Delivery", desc: "Get rewards instantly" },
      { icon: Shield, title: "100% Safe", desc: "Secure & verified" },
      { icon: Users, title: "3.8M Users", desc: "Trusted by millions" },
      { icon: TrendingUp, title: "High Value", desc: "Up to 5000 Robux" }
    ],
    reviews: [
      { name: "Emily Chen", initials: "EC", rating: 5, text: "Got my Robux in minutes! This is legit and super easy to use.", gradient: "from-purple-500 to-pink-500" },
      { name: "Jake Miller", initials: "JM", rating: 4.8, text: "Finally a reward site that actually works! Claimed 3000 Robux already.", gradient: "from-blue-500 to-cyan-500" }
    ]
  },
];
export default rewards