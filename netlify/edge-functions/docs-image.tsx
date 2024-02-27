import React from 'https://esm.sh/react@18.2.0';
import { ImageResponse } from 'https://deno.land/x/og_edge/mod.ts';

export default async function handler(req: Request) {
  const params = new URL(req.url).searchParams;

  const product = params.get('product');
  const folder = params.get('folder');
  const page = params.get('page');

  return new ImageResponse(
    (
      <div
        style={{
          width: 1280,
          height: 640,
          background: 'linear-gradient(180deg, #FFFFFF 0%, #F0F7FF 75.52%)',
          overflow: 'hidden',
          position: 'relative',
          display: 'flex',
        }}
      >
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
            marginLeft: 100,
            marginRight: 100,
            marginTop: 300,
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
          }}
        >
          <div style={{ width: '100%', textAlign: 'center', color: '#007FFF' }}>{folder}</div>
          <div
            style={{
              width: '100%',
              textAlign: 'center',

              fontFamily: 'General Sans',
              fontStyle: 'normal',
              fontWeight: 500,
            }}
          >
            {page}
          </div>
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
}
export const config = { path: '/og-docs' };
