import * as React from 'react';
import ProductCategories from './modules/views/ProductCategories';
import ProductSmokingHero from './modules/views/ProductSmokingHero';
import AppFooter from './modules/views/AppFooter';
import ProductHero from './modules/views/ProductHero';
import ProductValues from './modules/views/ProductValues';
import ProductHowItWorks from './modules/views/ProductHowItWorks';
import ProductCTA from './modules/views/ProductCTA';
import AppAppBar from './modules/views/AppAppBar';
import withRoot from './modules/withRoot';

export default {
  react: React,
  './modules/views/ProductCategories': ProductCategories,
  './modules/views/ProductSmokingHero': ProductSmokingHero,
  './modules/views/AppFooter': AppFooter,
  './modules/views/ProductHero': ProductHero,
  './modules/views/ProductValues': ProductValues,
  './modules/views/ProductHowItWorks': ProductHowItWorks,
  './modules/views/ProductCTA': ProductCTA,
  './modules/views/AppAppBar': AppAppBar,
  './modules/withRoot': withRoot,
};
