import { ApodData } from '@/lib/types';
import ApodImageCard from './apod-image-card';

export default function ApodCard({ apod }: { apod: ApodData }) {
  return (
    <div className="space-y-6">
      <ApodImageCard apod={apod} className="w-full" />
      <div>
        <h2 className="text-xl font-normal mb-2">{apod.title}</h2>
        <time className="text-sm text-gray-500 dark:text-gray-400 mb-4 block">{apod.date}</time>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-base">
          {apod.explanation}
        </p>
      </div>
    </div>
  );
}