export async function GET() {
  try {
    // This is a server-side API route
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/menu`);
    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    return Response.json({ error: 'Failed to fetch menu' }, { status: 500 });
  }
} 