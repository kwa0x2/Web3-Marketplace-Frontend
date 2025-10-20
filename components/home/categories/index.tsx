import { Card, CardContent } from "@/components/ui/card";
import { categories } from "@/lib/mock_data";

export default function Categories() {
  return (
    <section className="max-w-[1800px] mx-auto px-8 py-16">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white">Browse by Category</h2>
        <p className="text-gray-400 mt-1">Explore NFTs by collection type</p>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {categories.map((category, index) => (
          <Card
            key={index}
            className="text-center cursor-pointer hover:scale-105 transition-transform bg-black/40 border-white/10 hover:border-purple-500/50"
          >
            <CardContent className="pt-6">
              <div className="text-4xl mb-3">{category.icon}</div>
              <div className="text-lg font-semibold text-white mb-1">{category.title}</div>
              <div className="text-sm text-gray-400">{category.description}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
