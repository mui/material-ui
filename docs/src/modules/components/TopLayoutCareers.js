// @ts-check
import PropTypes from 'prop-types';
import { styled, alpha } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import Head from 'docs/src/modules/components/Head';
import AppContainer from 'docs/src/modules/components/AppContainer';
import AppFooter from 'docs/src/layouts/AppFooter';
import AppHeader from 'docs/src/layouts/AppHeader';
import BrandingCssVarsProvider from 'docs/src/BrandingCssVarsProvider';
import { MarkdownElement } from '@mui/docs/MarkdownElement';
import { Link } from '@mui/docs/Link';
import { useTranslate } from '@mui/docs/i18n';

const StyledDiv = styled('div')(({ theme }) => ({
  flex: '1 0 100%',
  background: `linear-gradient(180deg, ${(theme.vars || theme).palette.grey[50]} 0%, #FFFFFF 100%)`,
  backgroundSize: '100% 500px',
  backgroundRepeat: 'no-repeat',
  ...theme.applyDarkStyles({
    background: `linear-gradient(180deg, ${alpha(theme.palette.primary[900], 0.15)} 0%, ${(theme.vars || theme).palette.primaryDark[900]} 100%)`,
    backgroundSize: '100% 500px',
    backgroundRepeat: 'no-repeat',
  }),
}));

const StyledAppContainer = styled(AppContainer)(({ theme }) => ({
  '& .markdownElement': {
    [theme.breakpoints.up('md')]: {
      paddingRight: theme.spacing(4),
    },
  },
}));

/**
 * @param {object} props
 * @param {object} props.docs
 */
export default function TopLayoutCareers(props) {
  const { docs } = props;
  // @ts-expect-error docs structure is complex
  const { description, rendered, title } = docs.en;
  const t = useTranslate();

  return (
    <BrandingCssVarsProvider>
      <AppHeader />
      <Head
        title={`${title} - MUI`}
        description={description}
        card="/static/social-previews/careers-preview.jpg"
      >
        <meta name="robots" content="noindex,nofollow" />
      </Head>
      <StyledDiv>
        <StyledAppContainer component="main" sx={{ py: { xs: 3, sm: 4, md: 8 } }}>
          <Link
            href="/careers/#open-roles"
            rel="nofollow"
            variant="body2"
            sx={{ display: 'flex', gap: 0.5, alignItems: 'center', mb: 4 }}
          >
            <KeyboardArrowLeftIcon fontSize="small" />
            {t('backToOpenRoles')}
          </Link>
          {/* @ts-expect-error rendered map types are complex */}
          {rendered.map((chunk, index) => {
            return <MarkdownElement key={index} renderedMarkdown={chunk} />;
          })}
        </StyledAppContainer>
        <Divider />
        <AppFooter />
      </StyledDiv>
    </BrandingCssVarsProvider>
  );
}

TopLayoutCareers.propTypes = {
  docs: PropTypes.object.isRequired,
};
