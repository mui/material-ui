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
        title: 'React Engineer — Material UI Maintainer',
        description:
          'You will provide guidance to the community and solve their struggle, working on one of the most popular React UI library.',
        url: '/careers/react-engineer-material-ui-maintainer/',
      },
      {
        title: 'React Engineer — Docs-infra',
        description:
          'You will drive the development and maintenance of the documentation platform that powers all MUI products.',
        url: '/careers/react-engineer-docs-infra/',
      },
      {
        title: 'Frontend Engineer — Code-infra',
        description:
          'You will drive the development and maintenance of the infrastructure that powers all MUI products.',
        url: '/careers/code-infra-engineer/',
      },
      // {
      //   title: 'React Engineer — xCharts',
      //   description:
      //     'You will help form the xCharts team, build ambitious and complex new features, work on strategic problems, and help grow adoption.',
      //   url: '/careers/react-engineer-x-charts/',
      // },
      // {
      //   title: 'React Engineer — eXplore',
      //   description:
      //     'You will help eXplore, the team behind the Pickers and Tree View components, build the most comprehensive UI library the world has ever seen.',
      //   url: '/careers/react-engineer-explore/',
      // },
      // {
      //   title: 'React Engineer — X',
      //   description:
      //     'You will strengthen the MUI X product, build ambitious and complex new features, work on strategic problems, and help grow adoption.',
      //   url: '/careers/react-engineer-x/',
      // },
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
          'You will lead the development of the core libraries, helping to position them as the industry standard for design system teams.',
        url: '/careers/react-tech-lead-core/',
      },
      {
        title: 'React Community Engineer — X',
        description:
          'You will work with the advanced components team to provide guidance to the community and help resolve user issues.',
        url: '/careers/react-community-engineer/',
      },
      {
        title: 'Accessibility Engineer',
        description:
          'You will become our go-to accessibility expert to ensure all products meet or exceed WCAG 2.1 level AA guidelines.',
        url: '/careers/accessibility-engineer/',
      },
    ],
  },
  {
    title: 'People',
    roles: [
      // {
      //   title: 'Technical Recruiter',
      //   description: 'You will hire the next engineers, among other roles, joining the team.',
      //   url: '/careers/technical-recruiter/',
      // },
    ],
  },
  {
    title: 'Sales',
    roles: [
      // {
      //   title: 'Account Executive',
      //   description:
      //     'You will build client relationships and manage the sales process from start to finish.',
      // },
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
            description="We give developers and designers the tools to bring stunning user interfaces to life with unrivaled speed and ease."
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
            description="We are actively hiring for the following roles:"
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
                title={
                  <Typography variant="h2" id="next-roles" gutterBottom>
                    Next roles
                  </Typography>
                }
                description={
                  <React.Fragment>
                    We&apos;re not actively hiring for these roles yet, but you&apos;re welcome to
                    apply for future consideration. If none of these roles match your profile, you
                    can apply to{' '}
                    <Link href="https://jobs.ashbyhq.com/MUI/4715d81f-d00f-42d4-a0d0-221f40f73e19/application?utm_source=ZNRrPGBkqO">
                      the dream job
                    </Link>{' '}
                    and tell us more about what you bring to the table.
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
