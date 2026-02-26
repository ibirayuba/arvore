// api/ping.js
export default async function handler(req, res) {
  const response = await fetch(
    'https://svcwivctwogwpzhspboq.supabase.co/rest/v1/services?select=id&limit=1',
    {
      headers: {
        apikey: process.env.SUPABASE_KEY,
        Authorization: `Bearer ${process.env.SUPABASE_KEY}`
      }
    }
  );

  res.status(200).json({ ok: true });
}