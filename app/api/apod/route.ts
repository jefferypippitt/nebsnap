import { NextResponse } from 'next/server';
import { fetchApod } from '@/lib/nasaApi';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get('date') || undefined;

  try {
    const apod = await fetchApod(date);
    return NextResponse.json(apod);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch APOD' }, { status: 500 });
  }
}