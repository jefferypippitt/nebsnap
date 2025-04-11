import { ApodData } from '@/lib/types';
import Image from 'next/image';
import { AspectRatio } from "@/components/ui/aspect-ratio";

interface ApodImageCardProps {
  apod: ApodData;
  className?: string;
}

export default function ApodImageCard({ apod, className = '' }: ApodImageCardProps) {
  const isYouTube = apod.url.includes('youtube.com') || apod.url.includes('youtu.be');

  return (
    <div className={`${className} max-w-2xl mx-auto`}>
      {apod.media_type === 'image' ? (
        <div className="relative w-full bg-gray-50 dark:bg-gray-900 rounded-lg overflow-hidden">
          <Image 
            src={apod.url} 
            alt={apod.title}
            width={1200}
            height={800}
            priority
            className="w-full h-auto"
            sizes="(max-width: 672px) 100vw, 672px"
          />
        </div>
      ) : isYouTube ? (
        <AspectRatio ratio={16 / 9} className="bg-gray-50 dark:bg-gray-900 overflow-hidden rounded-lg">
          <div className="w-full h-full bg-black">
            <iframe
              src={apod.url.replace('watch?v=', 'embed/')}
              title={apod.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        </AspectRatio>
      ) : (
        <AspectRatio ratio={16 / 9} className="bg-gray-50 dark:bg-gray-900 overflow-hidden rounded-lg">
          <div className="w-full h-full bg-black">
            <video 
              src={apod.url} 
              controls
              playsInline
              className="w-full h-full object-contain"
            >
              <source src={apod.url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </AspectRatio>
      )}
    </div>
  );
} 