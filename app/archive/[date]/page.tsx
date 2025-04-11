import ApodCard from '@/components/apod-card';
import { fetchApod } from '@/lib/nasaApi';
import { ArrowLeftIcon } from 'lucide-react';
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
            <ArrowLeftIcon className="w-4 h-4" /> Back to Archive
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
          <Suspense fallback={
            <div className="space-y-6">
              <div className="animate-pulse">
                <div className="aspect-[16/9] bg-gray-100 dark:bg-gray-800 rounded"></div>
              </div>
              <div className="animate-pulse space-y-4">
                <div className="h-4 bg-gray-100 dark:bg-gray-800 w-2/3 rounded"></div>
                <div className="h-4 bg-gray-100 dark:bg-gray-800 w-1/2 rounded"></div>
              </div>
            </div>
          }>
            <ApodCard apod={apod} />
          </Suspense>
        </main>
      </div>
    </div>
  );
}

export const revalidate = 86400;