import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function QuickActions() {
  return (
    <Card className="bg-black/40 border-white/10">
      <CardHeader>
        <CardTitle className="text-white">Quick Actions</CardTitle>
        <CardDescription>Manage your marketplace activity</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Button className="justify-between bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
            Create NFT
            <ChevronRight className="w-4 h-4" />
          </Button>
          <Button variant="outline" className="justify-between">
            List Item for Sale
            <ChevronRight className="w-4 h-4" />
          </Button>
          <Link href="/marketplace" className="block">
            <Button variant="outline" className="w-full justify-between">
              Browse Marketplace
              <ChevronRight className="w-4 h-4" />
            </Button>
          </Link>
          <Link href="/profile" className="block">
            <Button variant="outline" className="w-full justify-between">
              Edit Profile
              <ChevronRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
