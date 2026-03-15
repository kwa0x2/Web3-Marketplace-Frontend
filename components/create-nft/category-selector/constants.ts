import { Palette, Music, Trophy, Image as ImageIcon, Gamepad2, Camera, Shirt, Sparkles } from 'lucide-react';

export const categories = [
  { id: 'art', name: 'Art', icon: Palette, color: 'from-purple-500 to-pink-500' },
  { id: 'music', name: 'Music', icon: Music, color: 'from-blue-500 to-cyan-500' },
  { id: 'collectibles', name: 'Collectibles', icon: Trophy, color: 'from-yellow-500 to-orange-500' },
  { id: 'photography', name: 'Photography', icon: Camera, color: 'from-green-500 to-emerald-500' },
  { id: 'gaming', name: 'Gaming', icon: Gamepad2, color: 'from-red-500 to-pink-500' },
  { id: 'virtual', name: 'Virtual Worlds', icon: Sparkles, color: 'from-indigo-500 to-purple-500' },
  { id: 'fashion', name: 'Fashion', icon: Shirt, color: 'from-pink-500 to-rose-500' },
  { id: 'other', name: 'Other', icon: ImageIcon, color: 'from-gray-500 to-slate-500' },
];