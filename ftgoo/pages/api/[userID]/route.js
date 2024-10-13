import { NextResponse } from 'next/server';

export async function GET(request) {
  // Process GET request
  const data = await fetchData(); // ...fetch data...
  return NextResponse.json({ data });
}

export async function POST(request) {
  // Process POST request
  const data = await request.json(); 
  // ... do something with the data ...
  return NextResponse.json({ message: 'Data received', data });
}