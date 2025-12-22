export type Industry =
  | 'All'
  | 'IT'
  | 'Fintech'
  | 'Health'
  | 'SaaS'
  | 'E-commerce'
  | 'Enterprise'
  | 'Media';

export interface Company {
  name: string;
  logo: string;
  industries: Industry[];
  caseStudySlug?: string;
  website?: string;
}

export const INDUSTRIES: Industry[] = [
  // just adding some as an example
  'All',
  'Fintech',
  'Health',
  'SaaS',
  'E-commerce',
  'Enterprise',
  'Media',
  'IT',
];

export const COMPANIES: Company[] = [
  {
    name: 'CGI',
    logo: '/static/branding/companies/cgi_spotlight.svg',
    industries: ['IT', 'Enterprise'],
    website: 'https://www.cgi.com/',
    caseStudySlug: 'cgi',
  },
];
