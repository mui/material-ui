import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import GitHubIcon from '@material-ui/icons/GitHub';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import Header from './Header';
import MainFeaturedPost from './MainFeaturedPost';
import FeaturedPost from './FeaturedPost';
import Main from './Main';
import Sidebar from './Sidebar';
import Footer from './Footer';
import post1 from './blog-post.1.md';
import post2 from './blog-post.2.md';
import post3 from './blog-post.3.md';

export default {
  react: React,
  '@material-ui/core/styles': { makeStyles },
  '@material-ui/core/CssBaseline': CssBaseline,
  '@material-ui/core/Grid': Grid,
  '@material-ui/core/Container': Container,
  '@material-ui/icons/GitHub': GitHubIcon,
  '@material-ui/icons/Facebook': FacebookIcon,
  '@material-ui/icons/Twitter': TwitterIcon,
  './Header': Header,
  './MainFeaturedPost': MainFeaturedPost,
  './FeaturedPost': FeaturedPost,
  './Main': Main,
  './Sidebar': Sidebar,
  './Footer': Footer,
  './blog-post.1.md': post1,
  './blog-post.2.md': post2,
  './blog-post.3.md': post3,
};
