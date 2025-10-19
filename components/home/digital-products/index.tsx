import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { products } from "@/lib/mock_data";

export default function DigitalProducts() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-white">Digital Products & APIs</h2>
          <p className="text-gray-400 mt-1">Premium software, APIs, and digital services</p>
        </div>
        <Button variant="ghost" className="text-purple-400 hover:text-purple-300">
          View All →
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="group cursor-pointer">
            <CardHeader>
              <div className="flex items-start justify-between mb-3">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg flex items-center justify-center text-2xl">
                  {product.type === "API" ? "🔌" : "💻"}
                </div>
                <Badge variant="outline">{product.type}</Badge>
              </div>
              <CardTitle className="text-xl mb-2">{product.name}</CardTitle>
              <CardDescription className="text-sm mb-4">{product.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center pt-4 border-t border-white/10">
                <div>
                  <div className="text-xs text-gray-500">{product.duration} License</div>
                  <div className="text-purple-400 font-bold text-xl">{product.price} ETH</div>
                </div>
                <Button size="sm">Purchase</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
