export const dynamic = "force-dynamic";

import { DatePicker } from '@/components/date-picker';
import { fetchApod } from '@/lib/nasaApi';
import Link from 'next/link';
import { format, startOfMonth, eachDayOfInterval } from 'date-fns';

async function getCurrentMonthApods() {
  const today = new Date();
  const apods = [];
  
  // Get all days in the current month up to today
  const monthStart = startOfMonth(today);
  const monthEnd = today; // Only go up to today, not end of month
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });
  
  // Fetch APODs for each day in the current month up to today
  for (const date of daysInMonth) {
    const formattedDate = format(date, 'yyyy-MM-dd');
    try {
      const apod = await fetchApod(formattedDate);
      apods.push(apod);
    } catch (error) {
      console.error(`Failed to fetch APOD for ${formattedDate}`);
    }
  }
  
  return apods.reverse();
}

export default async function Archive() {
  const apods = await getCurrentMonthApods();
  const currentMonth = format(new Date(), 'MMMM yyyy');

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black text-black dark:text-white">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <header className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
            <div>
              <h1 className="text-xl font-normal tracking-tight mb-2">
                APOD Archive
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Browsing {currentMonth}
              </p>
            </div>
            <div className="w-full md:w-auto">
              <DatePicker />
            </div>
          </div>
        </header>

        <main>
          <div className="space-y-2">
            {apods.map((apod) => {
              const date = new Date(apod.date);
              return (
                <Link 
                  key={apod.date} 
                  href={`/archive/${apod.date}`}
                  className="block py-2 hover:bg-gray-100 dark:hover:bg-gray-800/50 rounded transition-colors"
                >
                  <div className="flex items-baseline gap-4">
                    <div className="w-28 shrink-0">
                      <time className="text-sm text-gray-500 dark:text-gray-400">
                        {format(date, 'yyyy MMMM dd')}:
                      </time>
                    </div>
                    <p className="text-sm text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300">
                      {apod.title}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </main>
      </div>
    </div>
  );
}