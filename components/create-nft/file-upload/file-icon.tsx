import { File, Image as ImageIcon, Film, Music } from 'lucide-react';

export function getFileIcon(type: string) {
  if (type.startsWith('image/')) return <ImageIcon className="w-8 h-8" />;
  if (type.startsWith('video/')) return <Film className="w-8 h-8" />;
  if (type.startsWith('audio/')) return <Music className="w-8 h-8" />;
  return <File className="w-8 h-8" />;
}
