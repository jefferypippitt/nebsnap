import ApodCard from "@/components/apod-card"
import ApodCardSkeleton from "@/components/apod-card-skeleton"
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
          <Suspense fallback={<ApodCardSkeleton />}>
            <ApodCard apod={apod} />
          </Suspense>
        </main>
      </div>
    </div>
  )
}