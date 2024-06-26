import * as React from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Badge from '@mui/material/Badge';
import Typography from '@mui/material/Typography';
import { Link } from '@mui/docs/Link';
import OurValues from 'docs/src/components/about/OurValues';
import PerksBenefits from 'docs/src/components/careers/PerksBenefits';
import CareersFaq from 'docs/src/components/careers/CareersFaq';
import RoleEntry from 'docs/src/components/careers/RoleEntry';
import AppHeader from 'docs/src/layouts/AppHeader';
import AppFooter from 'docs/src/layouts/AppFooter';
import GradientText from 'docs/src/components/typography/GradientText';
import BrandingCssVarsProvider from 'docs/src/BrandingCssVarsProvider';
import Section from 'docs/src/layouts/Section';
import SectionHeadline from 'docs/src/components/typography/SectionHeadline';
import Head from 'docs/src/modules/components/Head';
import AppHeaderBanner from 'docs/src/components/banner/AppHeaderBanner';

const openRolesData = [
  {
    title: 'Engineering',
    roles: [
      {
        title: 'React Engineer — Docs-infra',
        description:
          'You will drive the development and maintenance of the documentation platform that powers all MUI products.',
        url: '/careers/react-engineer-docs-infra/',
      },
      {
        title: 'Staff Engineer — Pigment CSS',
        description:
          'Research, build, document, and help ship a next-gen zero-runtime CSS-in-JS library with a focus on performance and great developer experience.',
        url: '/careers/staff-engineer-pigment-css/',
      },
    ],
  },
  {
    title: 'Design',
    roles: [],
  },
  {
    title: 'Developer Experience',
    roles: [],
  },
];

const nextRolesData = [
  {
    title: 'Engineering',
    roles: [
      {
        title: 'React Tech Lead — Core',
        description:
          'You will lead the development of MUI Core, positioning the library as the industry standard for design teams while doubling its adoption.',
        url: '/careers/react-tech-lead-core/',
      },
      {
        title: 'React Engineer — X',
        description:
          'You will strengthen the MUI X product, build ambitious and complex new features, work on strategic problems, and help grow adoption.',
        url: '/careers/react-engineer-x/',
      },
      {
        title: 'React Engineer — xCharts',
        description:
          'You will help form the xCharts team, build ambitious and complex new features, work on strategic problems, and help grow adoption.',
        url: '/careers/react-engineer-x-charts/',
      },
      {
        title: 'React Community Engineer — X',
        description:
          'You will provide guidance to the community and solve their struggle, working primarily in the advanced components team.',
        url: '/careers/react-community-engineer/',
      },
      {
        title: 'Accessibility Engineer',
        description:
          'You will become our go-to expert for accessibility, to ensure all products meet or exceed WCAG 2.1 level AA guidelines.',
        url: '/careers/accessibility-engineer/',
      },
      {
        title: 'Full-stack Engineer — Toolpad',
        description:
          'You will join the Toolpad team, to explore the role of MUI in the low code space and help bring the early prototype to a usable product.',
        url: '/careers/fullstack-engineer/',
      },
    ],
  },
  {
    title: 'People',
    roles: [
      {
        title: 'Technical Recruiter',
        description: 'You will hire the next engineers, among other roles, joining the team.',
        url: '/careers/technical-recruiter/',
      },
    ],
  },
  {
    title: 'Sales',
    roles: [
      {
        title: 'Account Executive',
        description:
          'You will build client relationships and manage the sales process from start to finish.',
      },
    ],
  },
  {
    title: 'Marketing',
    roles: [],
  },
] as typeof openRolesData;

export default function Careers() {
  return (
    <BrandingCssVarsProvider>
      <Head
        title="Careers - MUI"
        description="Interested in joining MUI? Learn about the roles we're hiring for."
        card="/static/social-previews/careers-preview.jpg"
      />
      <AppHeaderBanner />
      <AppHeader />
      <main id="main-content">
        <Section cozy bg="gradient">
          <SectionHeadline
            alwaysCenter
            overline="Join us"
            title={
              <Typography variant="h2" component="h1">
                Build <GradientText>the next generation</GradientText>
                <br /> of tools for UI development
              </Typography>
            }
            description="Together, we are enabling developers & designers to bring stunning UIs to life with unrivalled speed and ease."
          />
        </Section>
        <Divider />
        <OurValues />
        <Divider />
        <PerksBenefits />
        <Divider />
        {/* Open roles */}
        <Section cozy>
          <SectionHeadline
            title={
              <Typography variant="h2" id="open-roles" gutterBottom>
                Open roles
                <Badge
                  badgeContent={openRolesData.reduce((acc, item) => acc + item.roles.length, 0)}
                  color="success"
                  showZero
                  sx={{ ml: 3, '& .MuiBadge-badge': { fontWeight: 'bold' } }}
                />
              </Typography>
            }
            description="The company was incorporated in mid-2019 and has been bootstrapped so far. We're growing fast—2× YoY—and have kept a steady pace of increasing the team: in 2020, we were 6; 15 in 2021, 25 in 2022, and 32 in 2023. We plan to grow the team to 60 people in 2024 in the following areas:"
          />
          <Divider sx={{ borderStyle: 'dashed', my: { xs: 2, sm: 6 } }} />
          <Stack spacing={2} divider={<Divider />}>
            {openRolesData
              .filter((category) => category.roles.length > 0)
              .map((category) => {
                return (
                  <React.Fragment key={category.title}>
                    <Typography component="h3" variant="h5" sx={{ fontWeight: 'semiBold' }}>
                      {category.title}
                    </Typography>
                    {category.roles.map((role) => (
                      <RoleEntry
                        key={role.title}
                        title={role.title}
                        description={role.description}
                        url={role.url}
                      />
                    ))}
                  </React.Fragment>
                );
              })}
          </Stack>
        </Section>
        <Divider />
        {/* Next roles */}
        {nextRolesData.length > 0 && (
          <Box data-mui-color-scheme="dark" sx={{ bgcolor: 'common.black' }}>
            <Section bg="transparent" cozy>
              <SectionHeadline
                alwaysCenter
                title={
                  <Typography variant="h2" id="next-roles" gutterBottom>
                    Next roles
                  </Typography>
                }
                description={
                  <React.Fragment>
                    If none of the roles below fit with what you are looking for, apply to{' '}
                    <Link href="https://jobs.ashbyhq.com/MUI/4715d81f-d00f-42d4-a0d0-221f40f73e19/application?utm_source=ZNRrPGBkqO">
                      the Dream job role
                    </Link>
                    !
                  </React.Fragment>
                }
              />
              <Divider sx={{ borderStyle: 'dashed', my: { xs: 2, sm: 6 } }} />
              <Stack spacing={2} divider={<Divider />}>
                {nextRolesData
                  .filter((category) => category.roles.length > 0)
                  .map((category) => {
                    return (
                      <React.Fragment key={category.title}>
                        <Typography component="h3" variant="h5" sx={{ fontWeight: 'extraBold' }}>
                          {category.title}
                        </Typography>
                        {category.roles.map((role) => (
                          <RoleEntry
                            key={role.title}
                            title={role.title}
                            description={role.description}
                            url={role.url}
                          />
                        ))}
                      </React.Fragment>
                    );
                  })}
              </Stack>
            </Section>
          </Box>
        )}
        <Divider />
        <CareersFaq />
      </main>
      <Divider />
      <AppFooter />
    </BrandingCssVarsProvider>
  );
}
