import ApodCard from "@/components/apod-card"
import { Suspense } from "react"
import { fetchApod } from "@/lib/nasaApi"

export default async function Home() {
  const apod = await fetchApod();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-black text-black dark:text-white">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-xl font-normal tracking-tight mb-2">
            Today's Astronomy Picture
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
  )
}
export const revalidate = 86400;