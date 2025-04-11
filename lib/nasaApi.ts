import { ApodData } from './types';

export async function fetchApod(date?: string): Promise<ApodData> {
  const apiKey = process.env.NASA_API_KEY || 'DEMO_KEY';
  const url = date
    ? `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`
    : `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;

  const res = await fetch(url, {
    next: {
      revalidate: date ? 31536000 : 86400 // Cache past dates for a year, today's date for 24 hours
    }
  });
  
  if (!res.ok) throw new Error('Failed to fetch APOD');
  return res.json();
}