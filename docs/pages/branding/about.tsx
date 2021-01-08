import * as React from 'react';
import BrandingRoot from 'docs/src/modules/branding/BrandingRoot';
import BrandingBeginToday from 'docs/src/modules/branding/BrandingBeginToday';

export default function Page() {
  return (
    <BrandingRoot>
      <BrandingBeginToday />
    </BrandingRoot>
  );
}

// import Box from '@material-ui/core/Box';
// import Typography from '@material-ui/core/Typography';
// import Grid from '@material-ui/core/Grid';
// import Button from '@material-ui/core/Button';
// import Link from '@material-ui/core/Link';
// import Card from '@material-ui/core/Card';
// import CardHeader from '@material-ui/core/CardHeader';
// import CardContent from '@material-ui/core/CardContent';
// import Avatar from '@material-ui/core/Avatar';
// import NavigateNextIcon from '@material-ui/icons/NavigateNext';
// import { experimentalStyled as styled } from '@material-ui/core/styles';
// import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
// import Quote from 'docs/src/modules/branding/Quote';
// import BulletItem from 'docs/src/modules/branding/BulletItem';
// import UnderlinedText from 'docs/src/modules/branding/UnderlinedText';
// import Persona from 'docs/src/modules/branding/Persona';
// import FeedbackIcon from 'docs/src/modules/branding/icons/Feedback';
// import ChangesIcon from 'docs/src/modules/branding/icons/Changes';
// import FinanceIcon from 'docs/src/modules/branding/icons/Finance';
// import HelpIcon from 'docs/src/modules/branding/icons/Help';
// import OpenCollectiveIcon from 'docs/src/modules/branding/icons/OpenCollective';
// import ArrowCirleIcon from 'docs/src/modules/branding/icons/ArrowCircle';

// const AboutUsRoot = styled(Box)<{}>(({ theme }) => ({
//   '& .MuiGrid-relative': {
//     position: 'relative',
//   },
//   '& .MuiGrid-bottomGutter': {
//     marginBottom: theme.spacing(10),
//   },
//   '& .MuiGrid-centered': {
//     width: '100%',
//     marginLeft: 'auto',
//     marginRight: 'auto',
//     [theme.breakpoints.up('lg')]: {
//       paddingLeft: theme.spacing(30),
//       paddingRight: theme.spacing(30),
//     },
//   },
//   '& .MuiGrid-centered-content': {
//     [theme.breakpoints.up('lg')]: {
//       paddingLeft: theme.spacing(25),
//       paddingRight: theme.spacing(25),
//     },
//   },
//   '& .MuiGrid-imageWrapper': {
//     width: '100%',
//   },
//   '& .MuiGrid-statistics': {
//     [theme.breakpoints.up('xs')]: {
//       marginTop: theme.spacing(4),
//       marginLeft: theme.spacing(2),
//     },
//     [theme.breakpoints.up('md')]: {
//       marginTop: theme.spacing(6),
//       marginLeft: theme.spacing(12),
//     },
//     width: 370,
//   },
//   '& .MuiGrid-panel': {
//     [theme.breakpoints.up('xs')]: {
//       '&.MuiGrid-panel': {
//         padding: `${theme.spacing(3)} ${theme.spacing(1)}`,
//       },
//     },
//     [theme.breakpoints.up('md')]: {
//       '&.MuiGrid-panel': {
//         padding: `${theme.spacing(10)} ${theme.spacing(12)}`,
//       },
//     },
//   },
//   '& .MuiGrid-panelSmallPadding': {
//     [theme.breakpoints.up('xs')]: {
//       '&.MuiGrid-panelSmallPadding': {
//         padding: `${theme.spacing(6)} ${theme.spacing(2)}`,
//       },
//     },
//     [theme.breakpoints.up('md')]: {
//       '&.MuiGrid-panelSmallPadding': {
//         padding: `${theme.spacing(5)} ${theme.spacing(6)}`,
//       },
//     },
//   },
//   '& .MuiGrid-panelInverted': {
//     backgroundColor: theme.palette.secondary.main,
//     color: 'white',
//   },
//   '& .MuiGrid-smallLeftSpacing': {
//     [theme.breakpoints.up('md')]: {
//       '&.MuiGrid-smallLeftSpacing': {
//         paddingLeft: theme.spacing(8),
//       },
//     },
//   },
//   '& .MuiGrid-team': {
//     background: theme.palette.greyF3,
//     [theme.breakpoints.up('xs')]: {
//       '&.MuiGrid-team': {
//         paddingBottom: theme.spacing(15),
//       },
//     },
//   },
//   '& .MuiGrid-company': {
//     background: theme.palette.greyEA,
//     padding: '100px',
//     [theme.breakpoints.up('xs')]: {
//       '&.MuiGrid-company': {
//         paddingBottom: theme.spacing(17),
//       },
//     },
//   },
//   '& .MuiGrid-contributors': {
//     background: theme.palette.greyF3,
//     padding: '100px',
//     [theme.breakpoints.up('xs')]: {
//       '&.MuiGrid-contributors': {
//         paddingBottom: theme.spacing(12),
//       },
//     },
//   },
//   '& .MuiGrid-emeriti': {
//     background: theme.palette.greyEA,
//     padding: '100px',
//   },
//   '& .MuiGrid-joinOurTeam': {
//     [theme.breakpoints.up('xs')]: {
//       padding: `${theme.spacing(10)} ${theme.spacing(5)}`,
//     },
//     [theme.breakpoints.up('md')]: {
//       padding: `${theme.spacing(20)} ${theme.spacing(15)}`,
//     },
//     [theme.breakpoints.up('lg')]: {
//       padding: `${theme.spacing(30)} ${theme.spacing(35)}`,
//     },
//     position: 'relative',
//     overflow: 'hidden',
//     '& [class*="MuiButton-root"]': {
//       background: 'white',
//       color: theme.palette.secondary.main,
//       '&:hover': {
//         background: '#D2D2D2',
//       },
//       '&:active': {
//         background: 'white',
//       },
//     },
//   },
//   '& .MuiGrid-supportCardsWrapper': {
//     [theme.breakpoints.up('lg')]: {
//       padding: theme.spacing(6),
//     },
//   },
//   '& .MuiGrid-ourValues': {
//     '&.MuiGrid-ourValues': {
//       paddingTop: theme.spacing(8),
//       paddingBottom: theme.spacing(8),
//       [theme.breakpoints.up('xs')]: {
//         '&.MuiGrid-ourValues': {
//           paddingLeft: theme.spacing(5),
//           paddingRight: theme.spacing(5),
//         },
//       },
//       [theme.breakpoints.up('md')]: {
//         '&.MuiGrid-ourValues': {
//           paddingLeft: theme.spacing(10),
//           paddingRight: theme.spacing(10),
//         },
//       },
//     },
//   },
//   '& .MuiGrid-panel-horizontalSpacing-xs': {
//     [theme.breakpoints.up('xs')]: {
//       '&.MuiGrid-panel-horizontalSpacing-xs': {
//         paddingLeft: theme.spacing(5),
//         paddingRight: theme.spacing(5),
//       },
//     },
//     [theme.breakpoints.up('md')]: {
//       '&.MuiGrid-panel-horizontalSpacing-xs': {
//         padding: `${theme.spacing(10)} ${theme.spacing(12)}`,
//       },
//     },
//   },
//   '& .MuiGrid-beginWithMUIToday': {
//     [theme.breakpoints.up('xs')]: {
//       padding: `${theme.spacing(10)} ${theme.spacing(5)} ${theme.spacing(15)} ${theme.spacing(5)}`,
//     },
//     [theme.breakpoints.up('md')]: {
//       padding: `${theme.spacing(20)} ${theme.spacing(15)}`,
//     },
//     [theme.breakpoints.up('lg')]: {
//       padding: `${theme.spacing(30)} ${theme.spacing(35)}`,
//     },
//     overflow: 'hidden',
//   },
//   '& .MuiGrid-personasContainer': {
//     '& > *': {
//       marginTop: theme.spacing(1),
//     },
//   },
//   '& .MuiGrid-discoverMore': {
//     '& h2': {
//       [theme.breakpoints.up('lg')]: {
//         textAlign: 'left',
//       },
//     },
//   },
// }));

// const SupportCard = styled((props: any) => {
//   const { color, icon, title, children, ...other } = props;
//   return (
//     <Card elevation={0} {...other}>
//       <CardHeader avatar={<Avatar aria-label={title}>{icon}</Avatar>} />
//       <CardContent>
//         <Typography variant="h3">{title}</Typography>
//         <Typography component="div">{children}</Typography>
//       </CardContent>
//     </Card>
//   );
// })(({ color = 'primary', theme }) => ({
//   '& [class*="MuiAvatar-root"]': {
//     background: color === 'info' ? theme.palette.vividBlue : theme.palette.primary.main,
//     width: 80,
//     height: 80,
//   },
// }));

// const DiscoverMoreCard = styled((props: any) => {
//   const { imagePosition, src, alt, title, children, href, ...other } = props;
//   return (
//     <Card elevation={0} {...other}>
//       <CardContent>
//         <Grid
//           className="DiscoverMoreCard-header"
//           component="a"
//           href={href}
//           container
//           direction="row"
//           spacing={1}
//         >
//           <Grid item>
//             <Typography variant="h4">{title}</Typography>
//           </Grid>
//           <Grid item>
//             <ArrowCirleIcon />
//           </Grid>
//         </Grid>
//         <Typography className="DiscoverMoreCard-content">{children}</Typography>
//         <Box
//           component="img"
//           alt={alt}
//           src={src}
//           sx={{
//             height: 243,
//             width: imagePosition === 'center' ? 290 : 330,
//             display: 'block',
//             marginTop: 'auto',
//           }}
//         />
//       </CardContent>
//     </Card>
//   );
// })(({ theme, ...props }) => ({
//   '&[class*="MuiCard-root"]': {
//     background: theme.palette.secondary.main,
//     color: 'white',
//   },
//   '& img': {
//     marginLeft: props.imagePosition === 'center' || props.imagePosition === 'end' ? 'auto' : 0,
//     marginRight: props.imagePosition === 'center' ? 'auto' : 0,
//   },
//   '& svg': {
//     marginTop: 4,
//   },
//   height: theme.spacing(50),
//   padding: 0,
//   '& .DiscoverMoreCard-header': {
//     textDecoration: 'none',
//     color: 'white',
//     padding: theme.spacing(2),
//   },
//   '& .DiscoverMoreCard-content': {
//     padding: theme.spacing(2),
//   },
//   '& [class*="MuiCardContent-root"]': {
//     display: 'flex',
//     flexDirection: 'column',
//     height: '100%',
//     padding: 0,
//     '&:last-child': {
//       paddingBottom: 0,
//     },
//   },
// }));

// function About() {
//   // export default function About() {
//   return (
//     <BrandingRoot>
//       <AboutUsRoot>
//         <Grid container className="MuiGrid-mission">
//           <Grid
//             container
//             className="MuiGrid-centered MuiGrid-bottomGutter"
//             alignItems="center"
//             justifyContent="center"
//           >
//             <Grid item>
//               <Typography variant="h1" align="center" gutterBottom>
//                 We&apos;re on a mission to make building UIs with{' '}
//                 <UnderlinedText>React</UnderlinedText> fun.
//               </Typography>
//             </Grid>
//             <Grid item className="MuiGrid-centered-content">
//               <Typography align="center" gutterBottom>
//                 Material-UI started back in 2014 to unify{' '}
//                 <Link href="https://reactjs.org/">React</Link> and{' '}
//                 <Link href="https://material.io/design">Material Design</Link>.
//               </Typography>
//               <Typography align="center">
//                 Today, Material-UI has grown to become one of the world&apos;s most popular React
//                 libraries – used by a vibrant community of more than <b>2M developers</b> in over{' '}
//                 <b>180 countries</b>.
//               </Typography>
//             </Grid>
//           </Grid>

//           <Grid container spacing={1} className="MuiGrid-bottomGutter MuiGrid-relative">
//             <Grid item lg={6} xs={12} className="MuiGrid-relative">
//               <Box
//                 component="img"
//                 src="/static/branding/about/top-left.jpg"
//                 alt="Person working on computer"
//                 sx={{ width: '100%' }}
//               />
//               <Box
//                 component="img"
//                 src="/static/branding/block3.svg"
//                 alt="Decorative blocks"
//                 sx={{
//                   width: { xs: 80, md: 120 },
//                   height: { xs: 80, md: 120 },
//                   position: 'absolute',
//                   display: { xs: 'block', lg: 'none' },
//                   left: '80%',
//                   top: { xs: 'calc(100% - 60px)', md: 'calc(100% - 80px)' },
//                 }}
//               />
//             </Grid>
//             <Grid item lg={6} xs={12}>
//               <Grid container direction="column">
//                 <Grid item className="MuiGrid-imageWrapper">
//                   <Box
//                     component="img"
//                     alt="Decorative blocks"
//                     src="/static/branding/about/top-right.png"
//                     sx={{ width: '100%' }}
//                   />
//                 </Grid>
//                 <Grid item>
//                   <Grid container className="MuiGrid-statistics">
//                     <Grid item xs={6}>
//                       <Typography variant="h2">2019</Typography>
//                       <Typography>company founded</Typography>
//                     </Grid>
//                     <Grid item xs={6}>
//                       <Typography variant="h2">2K</Typography>
//                       <Typography>contributors</Typography>
//                     </Grid>
//                     <Grid item xs={6}>
//                       <Typography variant="h2">2m</Typography>
//                       <Typography>users</Typography>
//                     </Grid>
//                     <Grid item xs={6}>
//                       <Typography variant="h2">60k+</Typography>
//                       <Typography>github stars</Typography>
//                     </Grid>
//                   </Grid>
//                 </Grid>
//               </Grid>
//             </Grid>
//             <Box
//               component="img"
//               src="/static/branding/block3.svg"
//               alt="Decorative blocks"
//               sx={{
//                 width: 120,
//                 height: 120,
//                 position: 'absolute',
//                 transform: (theme) => `translate(calc(-50% + ${theme.spacing(1)}), 0%)`,
//                 display: { xs: 'none', lg: 'block' },
//                 left: '50%',
//                 top: (theme) => `calc(100% - ${theme.spacing(10)})`,
//               }}
//             />
//           </Grid>
//         </Grid>

//         <Grid container spacing={1} className="MuiGrid-bottomGutter">
//           <Grid item lg={6} xs={12} className="MuiGrid-panel MuiGrid-panel-horizontalSpacing-xs">
//             <Grid container spacing={1}>
//               <Grid item>
//                 <Typography variant="h2" gutterBottom>
//                   Our mission
//                 </Typography>
//               </Grid>
//               <Grid item>
//                 <Typography gutterBottom>
//                   Our company is focused on making React UI development faster, simpler, and
//                   accessible to more people. We build open source and commercial tools used by over
//                   two millions developers in production.
//                 </Typography>
//                 <Typography gutterBottom>
//                   We&apos;re proud not only of the products we make, but also the community and
//                   partnerships we&apos;ve cultivated with other developers and companies.
//                 </Typography>
//               </Grid>
//               <Grid item>
//                 <Button color="secondary" variant="contained" endIcon={<NavigateNextIcon />}>
//                   Join us
//                 </Button>
//               </Grid>
//             </Grid>
//           </Grid>
//           <Grid
//             item
//             lg={6}
//             xs={12}
//             className="MuiGrid-panel MuiGrid-panelInverted MuiGrid-ourValues MuiGrid-relative"
//           >
//             <Box
//               component="img"
//               src="/static/branding/block1-blue.svg"
//               alt="Decorative blocks"
//               sx={{
//                 width: 290,
//                 height: 120,
//                 position: 'absolute',
//                 right: '10%',
//                 top: { xs: 'calc(100% - 60px)', md: 'calc(100% - 80px)' },
//               }}
//             />
//             <Typography variant="h2" gutterBottom>
//               Our values
//             </Typography>
//             <BulletItem>Transparency, most of our work is public</BulletItem>
//             <BulletItem>Creating a safe, high-trust team</BulletItem>
//             <BulletItem>Building incredible developer experiences</BulletItem>
//             <BulletItem>Maintaining a healthy working environment</BulletItem>
//             <BulletItem>Deliver web experiences that feel amazing</BulletItem>
//           </Grid>
//         </Grid>

//         <Grid container className="MuiGrid-centered" alignItems="center">
//           <Grid item>
//             <Typography variant="h3" align="center" gutterBottom>
//               <UnderlinedText>Our vision is</UnderlinedText> to provide material to build UIs. We
//               have an elegant React implementation of the Material Design guidelines that can be
//               customized to fully match your brand.
//             </Typography>
//           </Grid>
//         </Grid>

//         <Grid container spacing={1} alignItems="center">
//           <Grid item md={6} xs={12} className="MuiGrid-panel">
//             <Box
//               component="img"
//               alt="Dozen UI elements and blocks"
//               src="/static/branding/about/vision.png"
//               sx={{ width: '100%' }}
//             />
//           </Grid>
//           <Grid item md={6} xs={12} className="MuiGrid-panel MuiGrid-smallLeftSpacing">
//             <Typography gutterBottom>
//               The Material Design guidelines are an incredible starting point, but they do not
//               provide guidance on all aspects or needs of an application. In addition to the
//               guidelines-specific implementation,{' '}
//               <b>
//                 we want Material-UI to be whatever is generally useful for application development
//               </b>
//               , all in the spirit of the Material Design guidelines.
//             </Typography>
//             <Typography>
//               Therefore, Material-UI does not only implement the Material Design guidelines, but is
//               also a general use UI library of components. It also means we offer components or
//               combinations that are simply not addressed in the design guidelines.
//             </Typography>
//           </Grid>
//         </Grid>

//         <Grid container spacing={1} alignItems="center">
//           <Grid item md={6} xs={12} className="MuiGrid-panel MuiGrid-smallLeftSpacing">
//             <Typography gutterBottom>
//               <b>
//                 We focus on providing all the low-level tools needed to build a rich user-interface
//                 with React.
//               </b>{' '}
//               We implement the Material Design specification (which is a bar set quite high), you
//               are able to take advantage of it for your own business with any style customization
//               needed.
//             </Typography>
//             <Typography>
//               We want to see companies succeeding using Material-UI in a way that matches their
//               brand, close to the Material Design philosophy or not. We don&apos;t want them to feel
//               that their UI simply looks like another Google product.
//             </Typography>
//           </Grid>
//           <Grid item md={6} xs={12} className="MuiGrid-panel">
//             <Box
//               component="img"
//               alt="Bunch of legos"
//               src="/static/branding/about/focus.jpg"
//               sx={{ width: '100%' }}
//             />
//           </Grid>
//         </Grid>

//         <Grid container spacing={1}>
//           <Grid item lg={6} md={12} className="">
//             <Quote
//               author={{
//                 avatar: '/static/about/olivier.jpg',
//                 name: 'Olivier Tassinari',
//                 title: 'Co-founder',
//               }}
//             >
//               We believe that React is set on a course to dominate the way UIs are built on the web
//               for a very long time. We also believe that the next major iteration is coming with
//               low-code. Material-UI is at the forefront of this transformation.
//             </Quote>
//           </Grid>
//           <Grid item lg={6} md={12} className="MuiGrid-panel MuiGrid-panel-horizontalSpacing-xs">
//             <Typography variant="h4" gutterBottom>
//               From a developer&apos;s point of view, we want Material-UI to:
//             </Typography>
//             <BulletItem>Deliver on fully encapsulated/composable React components,</BulletItem>
//             <BulletItem>Be themeable/customizable,</BulletItem>
//             <BulletItem>Be cross browser compatible and accessible,</BulletItem>
//             <BulletItem>
//               Promote developer joy, a sense of community, and an environment where new and
//               experienced developers can learn from each other.
//             </BulletItem>
//           </Grid>
//         </Grid>

//         <Grid container className="MuiGrid-team MuiGrid-panel MuiGrid-relative" spacing={1}>
//           <Box
//             component="img"
//             src="/static/branding/block4.svg"
//             alt="Decorative blocks"
//             sx={{
//               width: 210,
//               height: 170,
//               position: 'absolute',
//               right: { xs: '5%', md: '10%' },
//               top: 'calc(100% - 120px)',
//             }}
//           />
//           <Grid item xs={12}>
//             <Typography variant="h2" gutterBottom>
//               Team
//             </Typography>
//           </Grid>
//           <Grid item lg={7} xs={12}>
//             <Typography>
//               Material-UI is maintained by a group of invaluable core contributors, with the massive
//               support and involvement of the community.
//             </Typography>
//           </Grid>
//         </Grid>

//         <Grid container className="MuiGrid-company MuiGrid-panel MuiGrid-relative" spacing={1}>
//           <Box
//             component="img"
//             src="/static/branding/block1-white.svg"
//             alt="Decorative blocks"
//             sx={{
//               width: 293,
//               height: 120,
//               position: 'absolute',
//               right: { xs: '5%', md: '10%' },
//               top: 'calc(100% - 90px)',
//             }}
//           />
//           <Grid item xs={12}>
//             <Typography variant="h2" gutterBottom>
//               <UnderlinedText>Company</UnderlinedText>
//             </Typography>
//           </Grid>
//           <Grid item lg={7} xs={12}>
//             <Typography gutterBottom>
//               The development of the project and its ecosystem is guided by an international team.
//             </Typography>
//           </Grid>

//           <Grid item xs={12}>
//             <Grid container className="MuiGrid-personasContainer">
//               <Grid item lg={4} md={6} xs={12}>
//                 <Persona
//                   name="Olivier Tassinari"
//                   src="/static/branding/about/olivier.jpg"
//                   title="Co-founder"
//                   location="Paris, France"
//                   twitter="https://twitter.com/olivtassinari"
//                   github="https://github.com/oliviertassinari"
//                 />
//               </Grid>
//               <Grid item lg={4} md={6} xs={12}>
//                 <Persona
//                   name="Matt Brookes"
//                   src="/static/branding/about/matt.jpg"
//                   title="Co-founder"
//                   location="London, UK"
//                   twitter="https://twitter.com/randomtechdude"
//                   github="https://github.com/mbrookes"
//                 />
//               </Grid>
//               <Grid item lg={4} md={6} xs={12}>
//                 <Persona
//                   name="Sebastian Silbermann"
//                   src="/static/branding/about/sebastian.jpg"
//                   title="Community focus"
//                   location="Dresden, Germany"
//                   twitter="https://twitter.com/sebsilbermann"
//                   github="https://github.com/eps1lon"
//                 />
//               </Grid>
//               <Grid item lg={4} md={6} xs={12}>
//                 <Persona
//                   name="Damien Tassone"
//                   src="/static/branding/about/damien.jpg"
//                   title="Enterprise focus"
//                   location="Lodon, UK"
//                   twitter="https://twitter.com/madKakoO"
//                   github="https://github.com/dtassone"
//                 />
//               </Grid>
//               <Grid item lg={4} md={6} xs={12}>
//                 <Persona
//                   name="Marija Najdova"
//                   src="/static/branding/about/marija.jpg"
//                   title="Community focus"
//                   location="Skopje, North Macedonia"
//                   twitter="https://twitter.com/marijanajdova"
//                   github="https://github.com/mnajdova"
//                 />
//               </Grid>
//               <Grid item lg={4} md={6} xs={12}>
//                 <Persona
//                   name="Danail Hadjiatanasov"
//                   src="/static/branding/about/danail.jpg"
//                   title="Enterprise focus"
//                   location="Amsterdam, Netherlands"
//                   twitter="https://twitter.com/danail_h"
//                   github="https://github.com/DanailH"
//                 />
//               </Grid>
//             </Grid>
//           </Grid>
//         </Grid>

//         <Grid container className="MuiGrid-contributors MuiGrid-panel MuiGrid-relative" spacing={1}>
//           <Box
//             component="img"
//             src="/static/branding/block2.svg"
//             alt="Decorative blocks"
//             sx={{
//               width: 196,
//               height: 139,
//               position: 'absolute',
//               right: { xs: '5%', md: '10%' },
//               top: 'calc(100% - 90px)',
//             }}
//           />
//           <Grid item xs={12}>
//             <Typography variant="h2" gutterBottom>
//               <UnderlinedText>Community contributors</UnderlinedText>
//             </Typography>
//           </Grid>
//           <Grid item xs={7}>
//             <Typography gutterBottom>
//               Some members of the community have so enriched it, that they deserve special mention.
//             </Typography>
//           </Grid>

//           <Grid item xs={12}>
//             <Grid container className="MuiGrid-personasContainer">
//               <Grid item lg={3} md={6} xs={12}>
//                 <Persona
//                   name="Josh Wooding"
//                   src="https://github.com/joshwooding.png"
//                   title="Core contributions, J.P. Morgan"
//                   location="London, UK"
//                   twitter="https://twitter.com/JoshWooding_"
//                   github="https://github.com/joshwooding"
//                   size="small"
//                 />
//               </Grid>
//               <Grid item lg={3} md={6} xs={12}>
//                 <Persona
//                   name="Dmitriy Kovalenko"
//                   src="https://github.com/dmtrKovalenko.png"
//                   title="Date pickers"
//                   location="Kharkiv, Ukraine"
//                   twitter="https://twitter.com/dmtrKovalenko"
//                   github="https://github.com/dmtrKovalenko"
//                   size="small"
//                 />
//               </Grid>
//               <Grid item lg={3} md={6} xs={12}>
//                 <Persona
//                   name="Danica Shen"
//                   src="https://github.com/DDDDDanica.png"
//                   title="CN Chinese docs"
//                   location="Ireland"
//                   github="https://github.com/DDDDDanica"
//                   size="small"
//                 />
//               </Grid>
//               <Grid item lg={3} md={6} xs={12}>
//                 <Persona
//                   name="Yan Lee"
//                   src="https://github.com/AGDholo.png"
//                   title="CN Chinese docs"
//                   location="China"
//                   github="https://github.com/AGDholo"
//                   size="small"
//                 />
//               </Grid>
//               <Grid item lg={3} md={6} xs={12}>
//                 <Persona
//                   name="Jairon Alves Lima"
//                   src="https://github.com/jaironalves.png"
//                   title="BR Brazilian docs"
//                   location="Barcelona, Spain"
//                   github="https://github.com/jaironalves"
//                   size="small"
//                 />
//               </Grid>
//             </Grid>
//           </Grid>
//         </Grid>

//         <Grid container className="MuiGrid-emeriti MuiGrid-panel" spacing={1}>
//           <Grid item xs={12}>
//             <Typography variant="h2" gutterBottom>
//               Community <UnderlinedText>Emeriti</UnderlinedText>
//             </Typography>
//           </Grid>
//           <Grid item xs={7}>
//             <Typography gutterBottom>
//               We honor some no-longer-active core team members who have made valuable contributons
//               in the past. They advise us from time-to-time.
//             </Typography>
//           </Grid>
//           <Grid item xs={12}>
//             <Grid container className="MuiGrid-personasContainer">
//               <Grid item lg={3} md={6} xs={12}>
//                 <Persona
//                   name="Hai Nguyen"
//                   src="https://github.com/hai-cea.png"
//                   title="v0.x co-creator"
//                   location="Dallas, UK"
//                   twitter="https://twitter.com/haicea"
//                   github="https://github.com/hai-cea"
//                   size="small"
//                 />
//               </Grid>
//               <Grid item lg={3} md={6} xs={12}>
//                 <Persona
//                   name="Nathan Marks"
//                   src="https://github.com/nathanmarks.png"
//                   title="v1.x co-creator"
//                   location="Toronto, Canada"
//                   github="https://github.com/nathanmarks"
//                   size="small"
//                 />
//               </Grid>
//               <Grid item lg={3} md={6} xs={12}>
//                 <Persona
//                   name="Kevin Ross"
//                   src="https://github.com/rosskevin.png"
//                   title="Open source focus"
//                   location="Franklin, US"
//                   twitter="https://twitter.com/rosskevin"
//                   github="https://github.com/rosskevin"
//                   size="small"
//                 />
//               </Grid>
//               <Grid item lg={3} md={6} xs={12}>
//                 <Persona
//                   name="Sebastian Sebald"
//                   src="https://github.com/sebald.png"
//                   title="Enterprice product designer"
//                   location="Freiburg, Germany"
//                   twitter="https://twitter.com/sebastiansebald"
//                   github="https://github.com/sebald"
//                   size="small"
//                 />
//               </Grid>
//               <Grid item lg={3} md={6} xs={12}>
//                 <Persona
//                   name="Ken Gregory"
//                   src="https://github.com/kgregory.png"
//                   title="Open source focus"
//                   location="New Jersey, US"
//                   github="https://github.com/kgregory"
//                   size="small"
//                 />
//               </Grid>
//               <Grid item lg={3} md={6} xs={12}>
//                 <Persona
//                   name="Tom Crockett"
//                   src="https://github.com/pelotom.png"
//                   title="Community member, J.P. Morgan"
//                   location="Los Angeles, US"
//                   twitter="https://twitter.com/pelotom"
//                   github="https://github.com/pelotom"
//                   size="small"
//                 />
//               </Grid>
//               <Grid item lg={3} md={6} xs={12}>
//                 <Persona
//                   name="Maik Marschner"
//                   src="https://github.com/leMaik.png"
//                   title="Core focus"
//                   location="Hannover, Germany"
//                   twitter="https://twitter.com/leMaikOfficial"
//                   github="https://github.com/leMaik"
//                   size="small"
//                 />
//               </Grid>
//               <Grid item lg={3} md={6} xs={12}>
//                 <Persona
//                   name="Oleg Slobodskoi"
//                   src="https://github.com/kof.png"
//                   title="JSS"
//                   location="Berlin, Germany"
//                   twitter="https://twitter.com/oleg008"
//                   github="https://github.com/kof"
//                   size="small"
//                 />
//               </Grid>
//             </Grid>
//           </Grid>
//         </Grid>

//         <Grid container className="MuiGrid-panelInverted MuiGrid-joinOurTeam" spacing={1}>
//           <Box
//             component="img"
//             src="/static/branding/block6.svg"
//             alt="Decorative blocks"
//             sx={{
//               width: 370,
//               height: 326,
//               position: 'absolute',
//               right: { xs: -200, md: -180, lg: -150 },
//               bottom: { xs: -200, md: -100, lg: 0 },
//             }}
//           />
//           <Grid item xs={12}>
//             <Typography variant="h2" align="center" gutterBottom>
//               Join our team of creators &amp; innovators
//             </Typography>
//           </Grid>

//           <Grid item xs={12}>
//             <Typography align="center" gutterBottom>
//               If you love the challenge of doing things differently, empowering creativity, and
//               making real connections along the way–then this may be the place for you.
//             </Typography>
//           </Grid>

//           <Grid item xs={12}>
//             <Grid container justifyContent="center">
//               <Button href="/company/jobs/" variant="contained" endIcon={<NavigateNextIcon />}>
//                 See Open Positions
//               </Button>
//             </Grid>
//           </Grid>
//         </Grid>

//         <Grid container spacing={1} className="MuiGrid-support MuiGrid-panel">
//           <Grid item xs={12}>
//             <Typography variant="h2">Material-UI is awesome.</Typography>
//             <Typography variant="h2">
//               How can <UnderlinedText>I support the project?</UnderlinedText>
//             </Typography>
//           </Grid>
//           <Grid item xs={12}>
//             <Typography>There are many ways to support Material-UI:</Typography>
//           </Grid>
//           <Grid container className="MuiGrid-supportCardsWrapper">
//             <Grid item lg={6} md={12}>
//               <SupportCard icon={<QuestionAnswerIcon fontSize="large" />} title="Spread the word">
//                 Evangelize Material-UI by linking to{' '}
//                 <Link href="https://material-ui.com">material-ui.com</Link> on your website, every
//                 backlink matters! Follow us on{' '}
//                 <Link href="https://twitter.com/MaterialUI">Twitter</Link>, like and retweet the
//                 important news. Or just talk about us with your friends.
//               </SupportCard>
//             </Grid>
//             <Grid item lg={6} md={12}>
//               <SupportCard
//                 color="info"
//                 icon={<FeedbackIcon fontSize="large" />}
//                 title="Give us feedback"
//               >
//                 Tell us what we&apos;re doing well or where we can improve. Please upvote (
//                 <span role="img" aria-label="Thumbs up emoji">
//                   👍
//                 </span>
//                 ) the issues that you are the most interested in seeing solved.{' '}
//                 {/* TODO: add link */}
//                 <Link href={'/'}>Give us feedback</Link>
//               </SupportCard>
//             </Grid>
//             <Grid item lg={6} md={12}>
//               <SupportCard
//                 color="info"
//                 icon={<ChangesIcon fontSize="large" />}
//                 title="Make changes happen"
//               >
//                 <ul>
//                   <li>
//                     Edit the documentation. Every page has an &quot;EDIT THIS PAGE&quot; link in the
//                     top right.
//                   </li>
//                   <li>
//                     Report bugs or missing features by{' '}
//                     <Link href="https://github.com/mui-org/material-ui/issues">
//                       creating an issue
//                     </Link>
//                     .
//                   </li>
//                   <li>
//                     Review and comment on existing{' '}
//                     <Link href="https://github.com/mui-org/material-ui/pulls">pull requests</Link>{' '}
//                     and <Link href="https://github.com/mui-org/material-ui/issues">issues</Link>.
//                   </li>
//                   <li>
//                     {/* TODO: add link */}
//                     Help <Link href={'/'}>translate</Link> the documentation.
//                   </li>
//                   <li>
//                     {/* TODO: add link */}
//                     <Link href={'/'}>Improve our documentation</Link>, fix bugs, or add features by{' '}
//                     {/* TODO: add link */}
//                     <Link href={'/'}>submitting a pull request</Link>.
//                   </li>
//                 </ul>
//               </SupportCard>
//             </Grid>
//             <Grid item lg={6} md={12}>
//               <SupportCard icon={<FinanceIcon fontSize="large" />} title="Support us financially">
//                 <Typography gutterBottom>
//                   If you use Material-UI in a commercial project and would like to support its
//                   continued development by becoming a Sponsor, or in a side or hobby project and
//                   would like to become a Backer, you can do so through OpenCollective.
//                 </Typography>
//                 <Typography gutterBottom>
//                   All funds donated are managed transparently, and Sponsors receive recognition in
//                   the README and on the Material-UI home page.
//                 </Typography>
//                 <Button
//                   color="inherit"
//                   // TODO: check link
//                   href={'https://opencollective.com/'}
//                   endIcon={<OpenCollectiveIcon />}
//                   variant="contained"
//                 >
//                   Open collective
//                 </Button>
//               </SupportCard>
//             </Grid>
//             <Grid item lg={6} md={12}>
//               <SupportCard icon={<HelpIcon fontSize="large" />} title="Help new users">
//                 You can answer questions on{' '}
//                 <Link href="https://stackoverflow.com/questions/tagged/material-ui">
//                   StackOverflow
//                 </Link>
//                 .
//               </SupportCard>
//             </Grid>
//           </Grid>
//         </Grid>

//         <Grid container spacing={1} className="MuiGrid-panel MuiGrid-discoverMore">
//           <Grid item xs={12}>
//             <Typography variant="h2" align="center">
//               Discover more
//             </Typography>
//           </Grid>
//           <Grid item xs={12}>
//             <Grid container spacing={2} alignItems="center" justifyContent="center">
//               <Grid item lg={4} md={8} xs={12}>
//                 <DiscoverMoreCard
//                   title="Road map"
//                   src="/static/branding/about/roadmap.png"
//                   alt="Roadmap"
//                   href="/discover-more/roadmap/"
//                   imagePosition="end"
//                 >
//                   Living document, layout out future plans and updates.
//                 </DiscoverMoreCard>
//               </Grid>
//               <Grid item lg={4} md={8} xs={12}>
//                 <DiscoverMoreCard
//                   title="Sponsors and Backers"
//                   src="/static/branding/about/sponsors.png"
//                   alt="Sponsors"
//                   href="/discover-more/backers/"
//                   imagePosition="center"
//                 >
//                   Support Material-UI core development through crowdfunding.
//                 </DiscoverMoreCard>
//               </Grid>
//               <Grid item lg={4} md={8} xs={12}>
//                 <DiscoverMoreCard
//                   title="Contact Us"
//                   alt="Open chat"
//                   src="/static/branding/about/contact.png"
//                   href="/company/contact/"
//                   imagePosition="start"
//                 >
//                   Send us a message, we’re all ears!
//                 </DiscoverMoreCard>
//               </Grid>
//             </Grid>
//           </Grid>
//         </Grid>
//         <BrandingBeginToday />
//       </AboutUsRoot>
//     </BrandingRoot>
//   );
// }
