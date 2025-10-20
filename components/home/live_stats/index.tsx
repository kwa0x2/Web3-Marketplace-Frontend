'use client';

import { Card, CardContent } from "@/components/ui/card";
import { stats } from "@/lib/mock_data";

export default function LiveStats() {
  return (
    <section className="max-w-[1800px] mx-auto px-8 py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card
              key={index}
              className="bg-gradient-to-br from-black/60 to-black/40 border-white/10 hover:border-purple-500/50 transition-all"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-purple-500/20 rounded-lg">
                    <Icon className="w-6 h-6 text-purple-400" />
                  </div>
                  <div
                    className={`text-sm font-semibold ${
                      stat.positive ? "text-green-400" : "text-red-400"
                    }`}
                  >
                    {stat.change}
                  </div>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
                  <p className="text-white text-2xl font-bold">{stat.value}</p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
