import { ImageResponse } from '@vercel/og';
import { createElement as h } from 'react';
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_SITE_LABEL,
  OG_IMAGE_DIMENSIONS,
} from '../lib/og';

export const prerender = false;

const TITLE_MAX = 80;
const DESCRIPTION_MAX = 180;

const truncate = (value: string, maxLength: number): string => {
  if (value.length <= maxLength) {
    return value;
  }
  return `${value.slice(0, Math.max(0, maxLength - 1)).trim()}…`;
};

const sanitize = (value: string): string => value.replace(/\s+/g, ' ').trim();

export async function GET({ request }: { request: Request }) {
  const url = new URL(request.url);
  const rawTitle = url.searchParams.get('title') ?? DEFAULT_SITE_LABEL;
  const rawDescription =
    url.searchParams.get('description') ?? DEFAULT_DESCRIPTION;

  const title = truncate(sanitize(rawTitle), TITLE_MAX);
  const description = truncate(sanitize(rawDescription), DESCRIPTION_MAX);

  const logoUrl = new URL('/og-image.png', url).toString();

  return new ImageResponse(
    h(
      'div',
      {
        style: {
          width: '100%',
          height: '100%',
          backgroundColor: '#ffffff',
          display: 'flex',
          padding: '56px',
          boxSizing: 'border-box',
          fontFamily: 'Noto Sans',
          color: '#0b1d39',
        },
      },
      h(
        'div',
        {
          style: {
            width: '32%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            paddingRight: '24px',
            boxSizing: 'border-box',
          },
        },
        h('img', {
          src: logoUrl,
          width: 260,
          height: 260,
          style: { objectFit: 'contain' },
        })
      ),
      h(
        'div',
        {
          style: {
            width: '68%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: '18px',
            boxSizing: 'border-box',
          },
        },
        h(
          'div',
          {
            style: {
              fontSize: '58px',
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
            },
          },
          title
        ),
        description
          ? h(
              'div',
              {
                style: {
                  fontSize: '30px',
                  lineHeight: 1.4,
                  color: '#3a4456',
                },
              },
              description
            )
          : null,
        h(
          'div',
          {
            style: {
              fontSize: '22px',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#7a8599',
              marginTop: '6px',
            },
          },
          DEFAULT_SITE_LABEL
        )
      )
    ),
    {
      width: OG_IMAGE_DIMENSIONS.width,
      height: OG_IMAGE_DIMENSIONS.height,
    }
  );
}
