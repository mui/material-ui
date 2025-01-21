import qr from 'https://esm.sh/qr-image@3.2.0';

export default async function handler(req: Request) {
  const params = new URL(req.url).searchParams;
  const text = params.get('text');

  if (!text) {
    return new Response('Missing text query parameter', { status: 400 });
  }

  if (text.length > 1000) {
    return new Response('Text query parameter is too long', { status: 400 });
  }

  const data = qr.imageSync(text, { type: 'png' });

  const v = params.get('v') || '';

  const cacheKey = new URLSearchParams();
  cacheKey.append('text', text);
  cacheKey.append('v', v);

  return new Response(data, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable', // Cache for 1 year
    },
  });
}
export const config = {
  cache: 'manual',
  path: '/edge-functions/qr-code',
};
