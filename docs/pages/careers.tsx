import * as React from 'react';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Badge from '@mui/material/Badge';
import Typography from '@mui/material/Typography';
import { Link } from '@mui/internal-core-docs/Link';
import OurValues from 'docs/src/components/about/OurValues';
import PerksBenefits from 'docs/src/components/careers/PerksBenefits';
import CareersFaq from 'docs/src/components/careers/CareersFaq';
import RoleEntry from 'docs/src/components/careers/RoleEntry';
import rolesData from 'docs/data/careers/roles.json';
import AppHeader from 'docs/src/layouts/AppHeader';
import AppFooter from 'docs/src/layouts/AppFooter';
import GradientText from 'docs/src/components/typography/GradientText';
import { BrandingCssVarsProvider } from '@mui/internal-core-docs/branding';
import Section from 'docs/src/layouts/Section';
import SectionHeadline from '@mui/internal-core-docs/SectionHeadline';

import { AppHeaderBanner, AppLayoutHead as Head } from '@mui/internal-core-docs/AppLayout';

interface CareerRole {
  id: string;
  title: string;
  category: string;
  summary: string;
}

// Synced from the careers API with `pnpm docs:sync-careers`.
const roles: CareerRole[] = rolesData;
const rolesByCategory = new Map<string, CareerRole[]>();
for (const role of roles) {
  const category = rolesByCategory.get(role.category) ?? [];
  category.push(role);
  rolesByCategory.set(role.category, category);
}
const openRolesData = Array.from(rolesByCategory, ([title, categoryRoles]) => ({
  title,
  roles: categoryRoles,
}));
const openRolesCount = roles.length;

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
      <main id="main-content" tabIndex={-1}>
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
                  badgeContent={openRolesCount}
                  color="success"
                  sx={{ ml: 3, '& .MuiBadge-badge': { fontWeight: 'bold' } }}
                />
              </Typography>
            }
            description={
              openRolesCount > 0
                ? 'We are actively hiring for the following roles:'
                : `We don't have any open roles at the moment. Consider applying to the Next roles below.`
            }
          />
          {openRolesCount > 0 ? (
            <React.Fragment>
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
                            key={role.id}
                            title={role.title}
                            description={role.summary}
                            url={`/careers/roles/${role.id}/`}
                          />
                        ))}
                      </React.Fragment>
                    );
                  })}
              </Stack>
            </React.Fragment>
          ) : null}
        </Section>
        <Divider />
        {/* Next roles */}
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
                  You&apos;re welcome to apply for future consideration. You can apply to{' '}
                  <Link href="https://jobs.ashbyhq.com/MUI/4715d81f-d00f-42d4-a0d0-221f40f73e19/application?utm_source=ZNRrPGBkqO">
                    the dream job
                  </Link>{' '}
                  and tell us more about what you bring to the table.
                </React.Fragment>
              }
            />
          </Section>
        </Box>
        <Divider />
        <CareersFaq />
      </main>
      <Divider />
      <AppFooter />
    </BrandingCssVarsProvider>
  );
}
