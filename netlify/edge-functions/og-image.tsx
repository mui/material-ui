import React from 'https://esm.sh/react@18.2.0';

import type { ReactElement } from 'https://esm.sh/react@18.2.0';

import type { SatoriOptions } from 'https://esm.sh/satori@0.10.13';

import satori, { init as initSatori } from 'https://esm.sh/satori@0.10.13/wasm';
import { initStreaming } from 'https://esm.sh/yoga-wasm-web@0.3.0';

import { initWasm, Resvg } from 'https://esm.sh/@resvg/resvg-wasm@2.0.0-alpha.4';

const resvg_wasm = fetch(
  'https://cdn.jsdelivr.net/npm/@vercel/og@0.1.0/vendor/resvg.simd.wasm',
).then((res) => res.arrayBuffer());

const yoga_wasm = fetch('https://cdn.jsdelivr.net/npm/@vercel/og@0.1.0/vendor/yoga.wasm');

const fallbackFont = fetch(
  'https://cdn.jsdelivr.net/npm/@vercel/og@0.1.0/vendor/noto-sans-v27-latin-regular.ttf',
).then((a) => a.arrayBuffer());

const apis = {
  twemoji: (code: string) =>
    `https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/${code.toLowerCase()}.svg`,
  openmoji: 'https://cdn.jsdelivr.net/npm/@svgmoji/openmoji@2.0.0/svg/',
  blobmoji: 'https://cdn.jsdelivr.net/npm/@svgmoji/blob@2.0.0/svg/',
  noto: 'https://cdn.jsdelivr.net/gh/svgmoji/svgmoji/packages/svgmoji__noto/svg/',
  fluent: (code: string) =>
    `https://cdn.jsdelivr.net/gh/shuding/fluentui-emoji-unicode/assets/${code.toLowerCase()}_color.svg`,
  fluentFlat: (code: string) =>
    `https://cdn.jsdelivr.net/gh/shuding/fluentui-emoji-unicode/assets/${code.toLowerCase()}_flat.svg`,
};

export type EmojiType = keyof typeof apis;

const n = String.fromCharCode(8205);
const O = /\uFE0F/g;

export function loadEmoji(code: string, type?: EmojiType): Promise<Response> {
  (!type || !apis[type]) && (type = 'twemoji');
  const A = apis[type];
  return fetch(typeof A === 'function' ? A(code) : `${A}${code.toUpperCase()}.svg`);
}

export function getIconCode(char: string): string {
  return d(char.indexOf(n) < 0 ? char.replace(O, '') : char);
}

function d(j: string) {
  const t = [];
  let A = 0;
  let k = 0;
  for (let E = 0; E < j.length; ) {
    (A = j.charCodeAt(E++)),
      k
        ? (t.push((65536 + ((k - 55296) << 10) + (A - 56320)).toString(16)), (k = 0))
        : A >= 55296 && A <= 56319
          ? (k = A)
          : t.push(A.toString(16));
  }
  return t.join('-');
}

const initializedResvg = initWasm(resvg_wasm);
const initializedYoga = initStreaming(yoga_wasm).then((yoga: unknown) => initSatori(yoga));

type ImageResponseOptions = ConstructorParameters<typeof Response>[1] & {
  /**
   * The width of the image.
   *
   * @type {number}
   * @default 1200
   */
  width?: number;
  /**
   * The height of the image.
   *
   * @type {number}
   * @default 630
   */
  height?: number;
  /**
   * Display debug information on the image.
   *
   * @type {boolean}
   * @default false
   */
  debug?: boolean;
  /**
   * A list of fonts to use.
   *
   * @type {{ data: ArrayBuffer; name: string; weight?: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900; style?: 'normal' | 'italic' }[]}
   * @default Noto Sans Latin Regular.
   */
  fonts?: SatoriOptions['fonts'];
  /**
   * Using a specific Emoji style. Defaults to `twemoji`.
   *
   * @link https://github.com/vercel/og#emoji
   * @type {EmojiType}
   * @default 'twemoji'
   */
  emoji?: EmojiType;
};

// @TODO: Support font style and weights, and make this option extensible rather
// than built-in.
// @TODO: Cover most languages with Noto Sans.
const languageFontMap = {
  'ja-JP': 'Noto+Sans+JP',
  'ko-KR': 'Noto+Sans+KR',
  'zh-CN': 'Noto+Sans+SC',
  'zh-TW': 'Noto+Sans+TC',
  'zh-HK': 'Noto+Sans+HK',
  'th-TH': 'Noto+Sans+Thai',
  'bn-IN': 'Noto+Sans+Bengali',
  'ar-AR': 'Noto+Sans+Arabic',
  'ta-IN': 'Noto+Sans+Tamil',
  'ml-IN': 'Noto+Sans+Malayalam',
  'he-IL': 'Noto+Sans+Hebrew',
  'te-IN': 'Noto+Sans+Telugu',
  devanagari: 'Noto+Sans+Devanagari',
  kannada: 'Noto+Sans+Kannada',
  symbol: ['Noto+Sans+Symbols', 'Noto+Sans+Symbols+2'],
  math: 'Noto+Sans+Math',
  unknown: 'Noto+Sans',
};

async function loadGoogleFont(fonts: string | string[], text: string) {
  // @TODO: Support multiple fonts.
  const font = Array.isArray(fonts) ? fonts.at(-1) : fonts;
  if (!font || !text) {
    return;
  }

  const API = `https://fonts.googleapis.com/css2?family=${font}&text=${encodeURIComponent(text)}`;

  const css = await (
    await fetch(API, {
      headers: {
        // Make sure it returns TTF.
        'User-Agent':
          'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_8; de-at) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1',
      },
    })
  ).text();

  const resource = css.match(/src: url\((.+)\) format\('(opentype|truetype)'\)/);
  if (!resource) {
    throw new Error('Failed to load font');
  }

  // eslint-disable-next-line consistent-return
  return fetch(resource[1]).then((res) => res.arrayBuffer());
}

type Asset = SatoriOptions['fonts'][0] | string;

const assetCache = new Map<string, Asset | undefined>();
const loadDynamicAsset = ({ emoji }: { emoji?: EmojiType }) => {
  const fn = async (
    code: keyof typeof languageFontMap | 'emoji',
    text: string,
  ): Promise<Asset | undefined> => {
    if (code === 'emoji') {
      // It's an emoji, load the image.
      return `data:image/svg+xml;base64,${btoa(
        await (await loadEmoji(getIconCode(text), emoji)).text(),
      )}`;
    }
    // Try to load from Google Fonts.
    if (!languageFontMap[code]) {
      code = 'unknown';
    }

    try {
      const data = await loadGoogleFont(languageFontMap[code], text);

      if (data) {
        return {
          name: `satori_${code}_fallback_${text}`,
          data,
          weight: 400,
          style: 'normal',
        };
      }
    } catch (e) {
      console.error('Failed to load dynamic font for', text, '. Error:', e);
    }
  };

  return async (...args: Parameters<typeof fn>) => {
    const key = JSON.stringify(args);
    const cache = assetCache.get(key);
    if (cache) {
      return cache;
    }

    const asset = await fn(...args);
    assetCache.set(key, asset);
    return asset;
  };
};

class ImageResponse extends Response {
  constructor(element: ReactElement, options: ImageResponseOptions = {}) {
    const extendedOptions = {
      width: 1200,
      height: 630,
      debug: false,
      ...options,
    };

    const result = new ReadableStream({
      async start(controller) {
        await initializedYoga;
        await initializedResvg;
        const fontData = await fallbackFont;

        const svg = await satori(element, {
          width: extendedOptions.width,
          height: extendedOptions.height,
          debug: extendedOptions.debug,
          fonts: extendedOptions.fonts || [
            {
              name: 'sans serif',
              data: fontData,
              weight: 700,
              style: 'normal',
            },
          ],
          loadAdditionalAsset: loadDynamicAsset({
            emoji: 'twemoji',
          }),
        });

        const resvgJS = new Resvg(svg, {
          fitTo: {
            mode: 'width',
            value: extendedOptions.width,
          },
        });

        controller.enqueue(resvgJS.render());
        controller.close();
      },
    });

    super(result, {
      headers: {
        'content-type': 'image/png',
        'cache-control': 'no-cache, no-store',
        ...extendedOptions.headers,
      },
      status: extendedOptions.status,
      statusText: extendedOptions.statusText,
    });
  }
}

export default async function handler(req: Request) {
  const params = new URL(req.url).searchParams;

  try {
    return new ImageResponse(
      (
        <div
          style={{
            fontSize: 40,
            color: 'black',
            background: 'white',
            width: '100%',
            height: '100%',
            padding: '50px 200px',
            textAlign: 'center',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {params.get('title')}
        </div>
      ),
      {
        width: 1200,
        height: 630,
      },
    );
    // eslint-disable-next-line no-empty
  } catch {}
  return null;
}
export const config = { path: '/api/og-image' };
