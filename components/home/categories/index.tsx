import { Card, CardContent } from "@/components/ui/card";
import { categories } from "./consts";

export default function Categories() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20">
        {categories.map((category, index) => (
          <Card key={index} className="text-center cursor-pointer hover:scale-105 transition-transform">
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
