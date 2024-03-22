import React from 'https://esm.sh/react@18.2.0';
// eslint-disable-next-line import/extensions
import { ImageResponse } from 'https://deno.land/x/og_edge/mod.ts';

const MAX_AUTHORS = 5;
export default async function handler(req: Request) {
  const params = new URL(req.url).searchParams;
  const title = params.get('title');
  const authors = params.get('authors');
  const product = params.get('product');

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
                fontSize: '24px',
                fontWeight: 600,
                lineHeight: '40px',
                color: '#007FFF',
              }}
            >
              {product}
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
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
            }}
          >
            {title &&
              title.split('\\n').map((line) => (
                <p style={{ margin: 0, flexWrap: 'wrap' }}>
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
                      marginBottom: 20,
                      marginRight: 40,
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        width: 70,
                        height: 70,
                        borderRadius: '50%',
                        background:
                          'linear-gradient(135deg, #007FFF 0%, #FFFFFF 50%, #007FFF 100%)',
                      }}
                    >
                      <img
                        src={`https://github.com/${github}.png`}
                        width={64}
                        height={64}
                        style={{ borderRadius: '50%', margin: 4 }}
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
                          fontWeight: '600',
                          lineHeight: '42px',
                          textAlign: 'left',
                          color: '#101418',
                        }}
                      >
                        {name}
                      </span>
                      <span
                        style={{
                          fontSize: '20px',
                          fontWeight: '500',
                          lineHeight: '30px',
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
      debug: true,
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
      // Manage the caching
      headers: {
        // Cach control is already done by the package (https://github.com/ascorbic/og-edge/blob/d533ef878801d7f808eb004f254e782ec6ba1e3c/mod.ts#L233-L240)
        'Netlify-Vary': 'query',
      },
    },
  );
}
export const config = {
  cache: 'manual',
  path: '/edge-functions/og-image',
};
