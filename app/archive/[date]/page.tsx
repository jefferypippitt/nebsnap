import ApodCard from '@/components/apod-card';
import ApodCardSkeleton from '@/components/apod-card-skeleton';
import { fetchApod } from '@/lib/nasaApi';
import { ArrowLeftCircle } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';

export default async function ApodByDate({
  params,
}: {
  params: Promise<{ date: string }>;
}) {
  const { date } = await params;
  const apod = await fetchApod(date);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black text-black dark:text-white">
      <div className="max-w-2xl mx-auto px-4 py-4">
        <div className="mb-2">
          <Link 
            href="/archive" 
            className="text-sm text-blue-400 hover:underline transition-colors inline-flex items-center gap-1"
          >
            <ArrowLeftCircle className="w-4 h-4" /> Back to Archive
          </Link>
        </div>

        <header className="mb-8">
          <h1 className="text-xl font-normal tracking-tight mb-2">
            Astronomy Picture for {date}
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Explore the cosmos, one day at a time
          </p>
        </header>

        <main>
          <Suspense fallback={<ApodCardSkeleton />}>
            <ApodCard apod={apod} />
          </Suspense>
        </main>
      </div>
    </div>
  );
}