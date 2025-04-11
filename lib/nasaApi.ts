import { ApodData } from './types';

export async function fetchApod(date?: string): Promise<ApodData> {
  const apiKey = process.env.NASA_API_KEY || 'DEMO_KEY';
  const url = date
    ? `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`
    : `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;

  const res = await fetch(url, {
    next: {
      // Only cache past dates for a year, don't cache today's date
      revalidate: date ? 31536000 : 0
    }
  });
  
  if (!res.ok) throw new Error('Failed to fetch APOD');
  return res.json();
}