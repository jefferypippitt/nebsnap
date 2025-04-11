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
      <AspectRatio ratio={16 / 9} className="bg-gray-50 dark:bg-gray-900 overflow-hidden rounded-lg">
        {apod.media_type === 'image' ? (
          <Image 
            src={apod.url} 
            alt={apod.title}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 672px) 100vw, 672px"
          />
        ) : isYouTube ? (
          <div className="w-full h-full bg-black">
            <iframe
              src={apod.url.replace('watch?v=', 'embed/')}
              title={apod.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        ) : (
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
        )}
      </AspectRatio>
    </div>
  );
} 