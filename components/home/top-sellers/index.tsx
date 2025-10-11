import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { sellers } from "./consts";

export default function TopSellers() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-white">Top Sellers</h2>
          <p className="text-gray-400 mt-1">Most successful creators and developers</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sellers.map((creator) => (
          <Card key={creator.id}>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500"></div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-white font-semibold text-lg">{creator.name}</h3>
                    {creator.verified && <Badge variant="secondary" className="text-xs">✓</Badge>}
                  </div>
                  <p className="text-gray-400 text-xs">{creator.type}</p>
                </div>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-white/10">
                <div className="text-center flex-1">
                  <div className="text-white font-bold text-lg">{creator.sales}</div>
                  <div className="text-gray-400 text-xs">Sales</div>
                </div>
                <div className="text-center flex-1 border-l border-white/10">
                  <div className="text-white font-bold text-lg">{creator.products}</div>
                  <div className="text-gray-400 text-xs">Products</div>
                </div>
                <Button size="sm" className="ml-4">Visit Store</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
