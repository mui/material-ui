import React from 'https://esm.sh/react@18.2.0';
// eslint-disable-next-line import/extensions
import { ImageResponse } from 'https://deno.land/x/og_edge/mod.ts';

const MAX_AUTHORS = 5;
export default async function handler(req: Request) {
  const params = new URL(req.url).searchParams;
  const title = params.get('title');
  const authors = params.get('authors');
  const product = params.get('product');
  const description = params.get('description');

  const parsedAuthors =
    authors &&
    authors
      .split(',')
      .map((author) => {
        const [name, github] = author.split('@');
        return { name: name.trim(), github: github.trim() };
      })
      .filter(({ name, github }) => name && github);

  const withAuthors = parsedAuthors && parsedAuthors.length > 0;
  let starCount = 0;

  return new ImageResponse(
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
            marginTop: 100,
            marginLeft: 100,
            marginRight: 100,
            marginBottom: 100,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div
            style={{
              height: 40,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <svg width="45" height="40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M15.618 8.779 1.566.551a.625.625 0 0 0-.941.54v20.972c0 .659.346 1.27.91 1.608l4.393 2.636c.417.25.947-.05.947-.536V11.683a.25.25 0 0 1 .375-.217l8.376 4.826a1.25 1.25 0 0 0 1.248 0l8.376-4.829a.25.25 0 0 1 .375.217v7.62c0 .435-.226.838-.596 1.066l-7.856 4.82a.625.625 0 0 0-.298.533v7.046c0 .223.119.429.312.54l10.925 6.326c.394.228.88.224 1.27-.01l14.386-8.632a1.25 1.25 0 0 0 .607-1.072V16.104a.625.625 0 0 0-.947-.536l-4.696 2.818a1.25 1.25 0 0 0-.607 1.072v7.063c0 .22-.115.423-.303.536l-8.484 5.09a1.25 1.25 0 0 1-1.202.046L22.5 29.375l8.768-5.26a1.25 1.25 0 0 0 .607-1.073V1.09a.625.625 0 0 0-.94-.54L16.881 8.78a1.25 1.25 0 0 1-1.264 0Z"
                fill="#007FFF"
              />
              <path
                d="M44.375 1.104v6.938c0 .44-.23.846-.607 1.072l-4.696 2.818a.625.625 0 0 1-.947-.536V4.458c0-.44.23-.846.607-1.072L43.428.568c.417-.25.947.05.947.536Z"
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
                fontSize: '24px',
                fontWeight: 600,
                lineHeight: '40px',
                letterSpacing: 1,
                color: '#007FFF',
              }}
            >
              {product}
            </p>
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              textAlign: 'left',
            }}
          >
            {title &&
              title.split('\\n').map((line) => (
                <p
                  style={{
                    margin: 0,
                    flexWrap: 'wrap',
                    fontFamily: 'General Sans',
                    fontStyle: 'normal',
                    fontWeight: 600,
                    fontSize: '72px',
                    lineHeight: 1.2,
                    color: '#0B0D0E',
                  }}
                >
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
            {description && (
              <p
                style={{
                  fontFamily: 'IBM Plex Sans',
                  fontSize: '36px',
                  fontWeight: 500,
                  color: '#000',
                  lineHeight: 1.5,
                  marginTop: 8,
                  marginBottom: 0,
                  marginLeft: 0,
                  marginRight: 0,
                  width: '100%',
                }}
              >
                {description}
              </p>
            )}
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              maxHeight: 180, // Limit to 2 lines of authors
              overflow: 'hidden',
              paddingTop: -20,
            }}
          >
            {withAuthors &&
              parsedAuthors.slice(0, MAX_AUTHORS).map(({ name, github }) => {
                return (
                  <div
                    style={{
                      maxWidth: 1080,
                      display: 'flex',
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                      marginRight: 40,
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 70,
                        height: 70,
                        borderRadius: '50%',
                        background: '#CCE5FF',
                      }}
                    >
                      <img
                        src={`https://github.com/${github}.png`}
                        width={62}
                        height={62}
                        style={{ borderRadius: '50%' }}
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
                          fontFamily: 'IBM Plex Sans',
                          fontSize: '26px',
                          fontWeight: '500',
                          lineHeight: 1.5,
                          textAlign: 'left',
                          color: '#101418',
                        }}
                      >
                        {name}
                      </span>
                      <span
                        style={{
                          fontFamily: 'IBM Plex Sans',
                          fontSize: '20px',
                          fontWeight: '500',
                          lineHeight: 1.5,
                          textAlign: 'left',
                          color: '#007FFF',
                        }}
                      >
                        @{github}
                      </span>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    ),
    {
      width: 1280,
      height: 640,
      // debug: true,
      fonts: [
        {
          name: 'IBM Plex Sans',
          data: await fetch('https://fonts.cdnfonts.com/s/15449/IBMPlexSans-Medium.woff').then(
            (a) => a.arrayBuffer(),
          ),
          weight: 500,
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
      // Manage the caching
      headers: {
        // Cache control is already done by the package (https://github.com/ascorbic/og-edge/blob/d533ef878801d7f808eb004f254e782ec6ba1e3c/mod.ts#L233-L240)
        'Netlify-Vary': 'query',
      },
    },
  );
}
export const config = {
  cache: 'manual',
  path: '/edge-functions/og-image',
};
