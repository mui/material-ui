/* eslint-disable no-console */
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
  const font = Array.isArray(fonts) ? fonts[fonts.length - 1] : fonts;
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
        try {
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
        } catch (error) {
          console.log('satori error');
          console.log(error);
        }
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

/**
 * The matching from github user to their full name
 */
const fullName = {
  mikailaread: 'Mikaila Read',
  joserodolfofreitas: 'José Freitas',
  samuelsycamore: 'Sam Sycamore',
  flaviendelangle: 'Flavien Delangle',
  richbustos: 'Rich Bustos',
  prakhargupta1: 'Prakhar Gupta',
  alexfauquette: 'Alexandre Fauquette',
  siriwatknp: 'Siriwat Kunaporn',
  cherniavskii: 'Andrew Cherniavskyi',
  'danilo-leal': 'Danilo Leal',
  mnajdova: 'Marija Najdova',
  oliviertassinari: 'Olivier Tassinari',
  m4theushw: 'Matheus Wichman',
  DanailH: 'Danail Hadjiatanasov',
  mbrookes: 'Matt Brookes',
  eps1lon: 'Sebastian Silbermann',
  michaldudak: 'Michał Dudak',
  colmtuite: 'Colm Tuite',
};

export default async function handler(req: Request) {
  const params = new URL(req.url).searchParams;
  const title = params.get('title');
  const authors = params.get('authors');

  let starCount = 0;
  const R = new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: 'linear-gradient(180deg, #FFFFFF 0%, #F0F7FF 75.52%)',
          overflow: 'hidden',
          position: 'relative',
          display: 'flex',
        }}
      >
        <div
          style={{
            position: 'absolute',
            width: 1512,
            height: 270,
            right: -163,
            top: -150,
            background: '#007FFF',
            opacity: '0.4',
            filter: 'blur(210px)',
            transform: 'skew(70deg, 20deg)',
            borderRadius: '50%',
            // transform: 'matrix(1, 0, -0.05, 1, 0, 0)',
          }}
        />
        <div
          style={{
            height: 40,
            position: 'absolute',
            left: 100,
            top: 100,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <svg
            width="43.75"
            height="40"
            viewBox="0 0 36 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M30.3428 21.9762C30.6524 21.7985 30.8437 21.4692 30.8448 21.1122L30.8632 15.3247C30.8643 14.9678 31.0556 14.6385 31.365 14.4607L34.5019 12.6587C35.1685 12.2757 36 12.7569 36 13.5258V24.0472C36 24.4052 35.8086 24.736 35.4981 24.9143L23.659 31.7145C23.3512 31.8913 22.9726 31.8917 22.6645 31.7154L13.3735 26.401C13.0621 26.2229 12.87 25.8917 12.87 25.533V20.2283C12.87 20.2219 12.8769 20.2179 12.8825 20.221C12.8881 20.2241 12.895 20.2201 12.895 20.2137V20.2078C12.895 20.2036 12.8973 20.1997 12.9009 20.1976L20.5527 15.8015C20.5596 15.7976 20.5568 15.787 20.5488 15.787C20.5445 15.787 20.541 15.7835 20.541 15.7792L20.556 10.578C20.5582 9.80731 19.7246 9.32389 19.0568 9.70861L13.3692 12.9854C13.0602 13.1634 12.6798 13.1634 12.3708 12.9854L6.66621 9.69876C5.99955 9.31466 5.167 9.79584 5.167 10.5652V19.9657C5.167 20.7335 4.33746 21.2149 3.67081 20.8339L0.504798 19.0245C0.192724 18.8461 0.000379125 18.514 0.000993035 18.1546L0.0290552 1.72421C0.0303669 0.956158 0.86112 0.476237 1.52713 0.858783L12.3719 7.08791C12.6803 7.26507 13.0597 7.26507 13.3681 7.08791L24.2099 0.860475C24.8766 0.477551 25.708 0.958799 25.708 1.72761V18.1619C25.708 18.5196 25.517 18.85 25.207 19.0285L19.5286 22.2984C18.8587 22.6842 18.8611 23.6516 19.5329 24.0341L22.6651 25.8171C22.973 25.9924 23.3506 25.9917 23.6578 25.8153L30.3428 21.9762ZM31 7.23381C31 8.0111 31.848 8.49122 32.5145 8.0913L35.5145 6.2913C35.8157 6.11058 36 5.78507 36 5.43381V1.76619C36 0.988896 35.152 0.508783 34.4855 0.908698L31.4855 2.7087C31.1843 2.88942 31 3.21493 31 3.56619V7.23381Z"
              fill="#007FFF"
            />
          </svg>
          <div
            style={{
              height: 40,
              width: 2,
              backgroundColor: '#DAE2ED',
              margin: '0 24px',
            }}
          />
          <p
            style={{
              fontFamily: 'General Sans',
              fontSize: '20px',
              fontWeight: 700,
              lineHeight: '36px',
              letterSpacing: '0.14em',
              color: '#007FFF',
            }}
          >
            BLOG
          </p>
        </div>
        <div
          style={{
            fontFamily: 'General Sans',
            fontStyle: 'normal',
            fontWeight: 600,
            fontSize: '68px',
            lineHeight: '82px',
            color: '#0B0D0E',
            marginLeft: 100,
            marginRight: 100,
            marginTop: 200,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
          }}
        >
          {title &&
            title.split('\\n').map((line) => (
              <p style={{ margin: 0 }}>
                {line.split('*').flatMap((text, index) => {
                  if (index > 0) {
                    starCount += 1;
                  }

                  const isBlue = starCount % 2 === 1;
                  return text.split(' ').map((word) => (
                    <span
                      style={{
                        color: isBlue ? '#007FFF' : '#0B0D0E',
                        marginRight: word.length > 0 ? 15 : 0,
                      }}
                    >
                      {word}
                    </span>
                  ));
                })}
              </p>
            ))}
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            position: 'absolute',
            bottom: 100,
            left: 100,
            right: 100,
          }}
        >
          {authors &&
            authors.split(',').map((author) => {
              const githubUser = author.trim();
              return (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    marginTop: 40,
                    marginRight: 40,
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      width: 70,
                      height: 70,
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #007FFF 0%, #FFFFFF 50%, #007FFF 100%)',
                    }}
                  >
                    <img
                      src={`https://github.com/${githubUser}.png`}
                      width={64}
                      height={64}
                      style={{ borderRadius: '50%', margin: 3 }}
                      alt=""
                    />
                  </div>
                  <div
                    style={{
                      marginLeft: 20,
                      display: 'flex',
                      flexDirection: 'column',
                    }}
                  >
                    <span
                      style={{
                        fontSize: '28px',
                        fontWeight: '700',
                        lineHeight: '42px',
                        letterSpacing: '0em',
                        textAlign: 'left',
                        color: '#101418',
                      }}
                    >
                      {fullName[githubUser]}
                    </span>
                    <span
                      style={{
                        fontSize: '20px',
                        fontWeight: '500',
                        lineHeight: '30px',
                        letterSpacing: '0em',
                        textAlign: 'left',
                        color: '#007FFF',
                      }}
                    >
                      @{githubUser}
                    </span>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    ),
    {
      width: 1280,
      height: 640,
      fonts: [
        {
          name: 'General Sans',
          data: await fetch('https://fonts.cdnfonts.com/s/85793/GeneralSans-Medium.woff').then(
            (a) => a.arrayBuffer(),
          ),
          weight: 1000,
          style: 'normal',
        },
        {
          name: 'General Sans',
          data: await fetch('https://fonts.cdnfonts.com/s/85793/GeneralSans-Semibold.woff').then(
            (a) => a.arrayBuffer(),
          ),
          weight: 600,
          style: 'normal',
        },
        {
          name: 'General Sans',
          data: await fetch('https://fonts.cdnfonts.com/s/85793/GeneralSans-Bold.woff').then((a) =>
            a.arrayBuffer(),
          ),
          weight: 700,
          style: 'normal',
        },
      ],
    },
  );

  return R;
}
export const config = { path: '/api/og-image' };
