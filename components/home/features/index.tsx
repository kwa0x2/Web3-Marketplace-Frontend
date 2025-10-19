import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { features } from "@/lib/mock_data";

export default function Features() {
  return (
    <section className="max-w-[1800px] mx-auto px-8 py-16">
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-bold text-white">Why Choose Our Marketplace?</h2>
        <p className="text-gray-400 mt-1">The best platform for NFT trading</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <Card key={index} className="text-center bg-black/40 border-white/10 hover:border-purple-500/50 transition-all">
            <CardContent className="pt-6">
              <div className="w-16 h-16 bg-purple-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">{feature.icon}</span>
              </div>
              <CardTitle className="mb-2 text-white">{feature.title}</CardTitle>
              <CardDescription className="text-gray-400">
                {feature.description}
              </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
