import {
  createBreakpoints,
  unstable_createGetCssVar as systemCreateGetCssVar,
  unstable_styleFunctionSx as styleFunctionSx,
  createSpacing,
} from '@mui/system';
import extendTheme from './extendTheme';
import defaultShouldSkipGeneratingVar from './shouldSkipGeneratingVar';
import defaultSxConfig from './sxConfig';

// @ts-ignore
const defaultTheme = {
  colorSchemes: {
    light: {
      palette: {
        mode: 'light',
        primary: {
          '50': '#F4FAFF',
          '100': '#DDF1FF',
          '200': '#ADDBFF',
          '300': '#6FB6FF',
          '400': '#3990FF',
          '500': '#096BDE',
          '600': '#054DA7',
          '700': '#02367D',
          '800': '#072859',
          '900': '#00153C',
          plainColor: 'var(--joy-palette-primary-600, #054DA7)',
          plainHoverBg: 'var(--joy-palette-primary-100, #DDF1FF)',
          plainActiveBg: 'var(--joy-palette-primary-200, #ADDBFF)',
          plainDisabledColor: 'var(--joy-palette-primary-200, #ADDBFF)',
          outlinedColor: 'var(--joy-palette-primary-500, #096BDE)',
          outlinedBorder: 'var(--joy-palette-primary-200, #ADDBFF)',
          outlinedHoverBg: 'var(--joy-palette-primary-100, #DDF1FF)',
          outlinedHoverBorder: 'var(--joy-palette-primary-300, #6FB6FF)',
          outlinedActiveBg: 'var(--joy-palette-primary-200, #ADDBFF)',
          outlinedDisabledColor: 'var(--joy-palette-primary-100, #DDF1FF)',
          outlinedDisabledBorder: 'var(--joy-palette-primary-100, #DDF1FF)',
          softColor: 'var(--joy-palette-primary-600, #054DA7)',
          softBg: 'var(--joy-palette-primary-100, #DDF1FF)',
          softHoverBg: 'var(--joy-palette-primary-200, #ADDBFF)',
          softActiveBg: 'var(--joy-palette-primary-300, #6FB6FF)',
          softDisabledColor: 'var(--joy-palette-primary-300, #6FB6FF)',
          softDisabledBg: 'var(--joy-palette-primary-50, #F4FAFF)',
          solidColor: '#fff',
          solidBg: 'var(--palette-primary-500, #096BDE)',
          solidHoverBg: 'var(--palette-primary-600, #054DA7)',
          solidActiveBg: 'var(--palette-primary-700, #02367D)',
          solidDisabledColor: '#fff',
          solidDisabledBg: 'var(--palette-primary-200, #ADDBFF)',
          mainChannel: '9 107 222',
          lightChannel: '173 219 255',
          darkChannel: '7 40 89',
        },
        neutral: {
          '50': '#F7F7F8',
          '100': '#EBEBEF',
          '200': '#D8D8DF',
          '300': '#B9B9C6',
          '400': '#8F8FA3',
          '500': '#73738C',
          '600': '#5A5A72',
          '700': '#434356',
          '800': '#25252D',
          '900': '#131318',
          plainColor: 'var(--joy-palette-neutral-800, #25252D)',
          plainHoverColor: 'var(--joy-palette-neutral-900, #131318)',
          plainHoverBg: 'var(--joy-palette-neutral-100, #EBEBEF)',
          plainActiveBg: 'var(--joy-palette-neutral-200, #D8D8DF)',
          plainDisabledColor: 'var(--joy-palette-neutral-300, #B9B9C6)',
          outlinedColor: 'var(--joy-palette-neutral-800, #25252D)',
          outlinedBorder: 'var(--joy-palette-neutral-200, #D8D8DF)',
          outlinedHoverColor: 'var(--joy-palette-neutral-900, #131318)',
          outlinedHoverBg: 'var(--joy-palette-neutral-100, #EBEBEF)',
          outlinedHoverBorder: 'var(--joy-palette-neutral-300, #B9B9C6)',
          outlinedActiveBg: 'var(--joy-palette-neutral-200, #D8D8DF)',
          outlinedDisabledColor: 'var(--joy-palette-neutral-300, #B9B9C6)',
          outlinedDisabledBorder: 'var(--joy-palette-neutral-100, #EBEBEF)',
          softColor: 'var(--joy-palette-neutral-800, #25252D)',
          softBg: 'var(--joy-palette-neutral-100, #EBEBEF)',
          softHoverColor: 'var(--joy-palette-neutral-900, #131318)',
          softHoverBg: 'var(--joy-palette-neutral-200, #D8D8DF)',
          softActiveBg: 'var(--joy-palette-neutral-300, #B9B9C6)',
          softDisabledColor: 'var(--joy-palette-neutral-300, #B9B9C6)',
          softDisabledBg: 'var(--joy-palette-neutral-50, #F7F7F8)',
          solidColor: 'var(--joy-palette-common-white, #fff)',
          solidBg: 'var(--joy-palette-neutral-600, #5A5A72)',
          solidHoverBg: 'var(--joy-palette-neutral-700, #434356)',
          solidActiveBg: 'var(--joy-palette-neutral-800, #25252D)',
          solidDisabledColor: 'var(--joy-palette-neutral-300, #B9B9C6)',
          solidDisabledBg: 'var(--joy-palette-neutral-50, #F7F7F8)',
          mainChannel: '115 115 140',
          lightChannel: '216 216 223',
          darkChannel: '37 37 45',
        },
        danger: {
          '50': '#FFF8F6',
          '100': '#FFE9E8',
          '200': '#FFC7C5',
          '300': '#FF9192',
          '400': '#FA5255',
          '500': '#D3232F',
          '600': '#A10E25',
          '700': '#77061B',
          '800': '#580013',
          '900': '#39000D',
          plainColor: 'var(--joy-palette-danger-600, #A10E25)',
          plainHoverBg: 'var(--joy-palette-danger-100, #FFE9E8)',
          plainActiveBg: 'var(--joy-palette-danger-200, #FFC7C5)',
          plainDisabledColor: 'var(--joy-palette-danger-200, #FFC7C5)',
          outlinedColor: 'var(--joy-palette-danger-500, #D3232F)',
          outlinedBorder: 'var(--joy-palette-danger-200, #FFC7C5)',
          outlinedHoverBg: 'var(--joy-palette-danger-100, #FFE9E8)',
          outlinedHoverBorder: 'var(--joy-palette-danger-300, #FF9192)',
          outlinedActiveBg: 'var(--joy-palette-danger-200, #FFC7C5)',
          outlinedDisabledColor: 'var(--joy-palette-danger-100, #FFE9E8)',
          outlinedDisabledBorder: 'var(--joy-palette-danger-100, #FFE9E8)',
          softColor: 'var(--joy-palette-danger-600, #A10E25)',
          softBg: 'var(--joy-palette-danger-100, #FFE9E8)',
          softHoverBg: 'var(--joy-palette-danger-200, #FFC7C5)',
          softActiveBg: 'var(--joy-palette-danger-300, #FF9192)',
          softDisabledColor: 'var(--joy-palette-danger-300, #FF9192)',
          softDisabledBg: 'var(--joy-palette-danger-50, #FFF8F6)',
          solidColor: '#fff',
          solidBg: 'var(--palette-danger-500, #D3232F)',
          solidHoverBg: 'var(--palette-danger-600, #A10E25)',
          solidActiveBg: 'var(--palette-danger-700, #77061B)',
          solidDisabledColor: '#fff',
          solidDisabledBg: 'var(--palette-danger-200, #FFC7C5)',
          mainChannel: '211 35 47',
          lightChannel: '255 199 197',
          darkChannel: '88 0 19',
        },
        info: {
          '50': '#FDF7FF',
          '100': '#F4EAFF',
          '200': '#E1CBFF',
          '300': '#C69EFF',
          '400': '#A374F9',
          '500': '#814DDE',
          '600': '#5F35AE',
          '700': '#452382',
          '800': '#301761',
          '900': '#1D0A42',
          plainColor: 'var(--joy-palette-info-600, #5F35AE)',
          plainHoverBg: 'var(--joy-palette-info-100, #F4EAFF)',
          plainActiveBg: 'var(--joy-palette-info-200, #E1CBFF)',
          plainDisabledColor: 'var(--joy-palette-info-200, #E1CBFF)',
          outlinedColor: 'var(--joy-palette-info-500, #814DDE)',
          outlinedBorder: 'var(--joy-palette-info-200, #E1CBFF)',
          outlinedHoverBg: 'var(--joy-palette-info-100, #F4EAFF)',
          outlinedHoverBorder: 'var(--joy-palette-info-300, #C69EFF)',
          outlinedActiveBg: 'var(--joy-palette-info-200, #E1CBFF)',
          outlinedDisabledColor: 'var(--joy-palette-info-100, #F4EAFF)',
          outlinedDisabledBorder: 'var(--joy-palette-info-100, #F4EAFF)',
          softColor: 'var(--joy-palette-info-600, #5F35AE)',
          softBg: 'var(--joy-palette-info-100, #F4EAFF)',
          softHoverBg: 'var(--joy-palette-info-200, #E1CBFF)',
          softActiveBg: 'var(--joy-palette-info-300, #C69EFF)',
          softDisabledColor: 'var(--joy-palette-info-300, #C69EFF)',
          softDisabledBg: 'var(--joy-palette-info-50, #FDF7FF)',
          solidColor: '#fff',
          solidBg: 'var(--palette-info-500, #814DDE)',
          solidHoverBg: 'var(--palette-info-600, #5F35AE)',
          solidActiveBg: 'var(--palette-info-700, #452382)',
          solidDisabledColor: '#fff',
          solidDisabledBg: 'var(--palette-info-200, #E1CBFF)',
          mainChannel: '129 77 222',
          lightChannel: '225 203 255',
          darkChannel: '48 23 97',
        },
        success: {
          '50': '#F3FEF5',
          '100': '#D7F5DD',
          '200': '#77EC95',
          '300': '#4CC76E',
          '400': '#2CA24D',
          '500': '#1A7D36',
          '600': '#0F5D26',
          '700': '#034318',
          '800': '#002F0F',
          '900': '#001D09',
          plainColor: 'var(--joy-palette-success-600, #0F5D26)',
          plainHoverBg: 'var(--joy-palette-success-100, #D7F5DD)',
          plainActiveBg: 'var(--joy-palette-success-200, #77EC95)',
          plainDisabledColor: 'var(--joy-palette-success-200, #77EC95)',
          outlinedColor: 'var(--joy-palette-success-500, #1A7D36)',
          outlinedBorder: 'var(--joy-palette-success-200, #77EC95)',
          outlinedHoverBg: 'var(--joy-palette-success-100, #D7F5DD)',
          outlinedHoverBorder: 'var(--joy-palette-success-300, #4CC76E)',
          outlinedActiveBg: 'var(--joy-palette-success-200, #77EC95)',
          outlinedDisabledColor: 'var(--joy-palette-success-100, #D7F5DD)',
          outlinedDisabledBorder: 'var(--joy-palette-success-100, #D7F5DD)',
          softColor: 'var(--joy-palette-success-600, #0F5D26)',
          softBg: 'var(--joy-palette-success-100, #D7F5DD)',
          softHoverBg: 'var(--joy-palette-success-200, #77EC95)',
          softActiveBg: 'var(--joy-palette-success-300, #4CC76E)',
          softDisabledColor: 'var(--joy-palette-success-300, #4CC76E)',
          softDisabledBg: 'var(--joy-palette-success-50, #F3FEF5)',
          solidColor: '#fff',
          solidBg: 'var(--palette-success-500, #1A7D36)',
          solidHoverBg: 'var(--palette-success-600, #0F5D26)',
          solidActiveBg: 'var(--palette-success-700, #034318)',
          solidDisabledColor: '#fff',
          solidDisabledBg: 'var(--palette-success-200, #77EC95)',
          mainChannel: '26 125 54',
          lightChannel: '119 236 149',
          darkChannel: '0 47 15',
        },
        warning: {
          '50': '#FFF8C5',
          '100': '#FAE17D',
          '200': '#EAC54F',
          '300': '#D4A72C',
          '400': '#BF8700',
          '500': '#9A6700',
          '600': '#7D4E00',
          '700': '#633C01',
          '800': '#4D2D00',
          '900': '#3B2300',
          plainColor: 'var(--joy-palette-warning-800, #4D2D00)',
          plainHoverBg: 'var(--joy-palette-warning-50, #FFF8C5)',
          plainActiveBg: 'var(--joy-palette-warning-200, #EAC54F)',
          plainDisabledColor: 'var(--joy-palette-warning-200, #EAC54F)',
          outlinedColor: 'var(--joy-palette-warning-800, #4D2D00)',
          outlinedBorder: 'var(--joy-palette-warning-200, #EAC54F)',
          outlinedHoverBg: 'var(--joy-palette-warning-50, #FFF8C5)',
          outlinedHoverBorder: 'var(--joy-palette-warning-300, #D4A72C)',
          outlinedActiveBg: 'var(--joy-palette-warning-200, #EAC54F)',
          outlinedDisabledColor: 'var(--joy-palette-warning-100, #FAE17D)',
          outlinedDisabledBorder: 'var(--joy-palette-warning-100, #FAE17D)',
          softColor: 'var(--joy-palette-warning-800, #4D2D00)',
          softBg: 'var(--joy-palette-warning-50, #FFF8C5)',
          softHoverBg: 'var(--joy-palette-warning-100, #FAE17D)',
          softActiveBg: 'var(--joy-palette-warning-200, #EAC54F)',
          softDisabledColor: 'var(--joy-palette-warning-200, #EAC54F)',
          softDisabledBg: 'var(--joy-palette-warning-50, #FFF8C5)',
          solidColor: 'var(--joy-palette-warning-800, #4D2D00)',
          solidBg: 'var(--joy-palette-warning-200, #EAC54F)',
          solidHoverBg: 'var(--joy-palette-warning-300, #D4A72C)',
          solidActiveBg: 'var(--joy-palette-warning-400, #BF8700)',
          solidDisabledColor: 'var(--joy-palette-warning-200, #EAC54F)',
          solidDisabledBg: 'var(--joy-palette-warning-50, #FFF8C5)',
          mainChannel: '154 103 0',
          lightChannel: '234 197 79',
          darkChannel: '77 45 0',
        },
        common: {
          white: '#FFF',
          black: '#09090D',
        },
        text: {
          primary: 'var(--joy-palette-neutral-800, #25252D)',
          secondary: 'var(--joy-palette-neutral-600, #5A5A72)',
          tertiary: 'var(--joy-palette-neutral-500, #73738C)',
        },
        background: {
          body: 'var(--joy-palette-common-white, #fff)',
          surface: 'var(--joy-palette-common-white, #fff)',
          popup: 'var(--joy-palette-common-white, #fff)',
          level1: 'var(--joy-palette-neutral-50, #F7F7F8)',
          level2: 'var(--joy-palette-neutral-100, #EBEBEF)',
          level3: 'var(--joy-palette-neutral-200, #D8D8DF)',
          tooltip: 'var(--joy-palette-neutral-800, #25252D)',
          backdrop: 'rgba(255 255 255 / 0.5)',
        },
        divider: 'rgba(var(--joy-palette-neutral-mainChannel, 115 115 140) / 0.28)',
        focusVisible: 'var(--joy-palette-primary-500, #73738C)',
      },
      shadowRing: '0 0 #000',
      shadowChannel: '187 187 187',
    },
    dark: {
      palette: {
        mode: 'dark',
        primary: {
          '50': '#F4FAFF',
          '100': '#DDF1FF',
          '200': '#ADDBFF',
          '300': '#6FB6FF',
          '400': '#3990FF',
          '500': '#096BDE',
          '600': '#054DA7',
          '700': '#02367D',
          '800': '#072859',
          '900': '#00153C',
          plainColor: 'var(--joy-palette-primary-300, #6FB6FF)',
          plainHoverBg: 'var(--joy-palette-primary-800, #6FB6FF)',
          plainActiveBg: 'var(--joy-palette-primary-700, #02367D)',
          plainDisabledColor: 'var(--joy-palette-primary-800, #072859)',
          outlinedColor: 'var(--joy-palette-primary-200, #ADDBFF)',
          outlinedBorder: 'var(--joy-palette-primary-700, #02367D)',
          outlinedHoverBg: 'var(--joy-palette-primary-800, #072859)',
          outlinedHoverBorder: 'var(--joy-palette-primary-600, #054DA7)',
          outlinedActiveBg: 'var(--joy-palette-primary-900, #00153C)',
          outlinedDisabledColor: 'var(--joy-palette-primary-800, #072859)',
          outlinedDisabledBorder: 'var(--joy-palette-primary-800, #072859)',
          softColor: 'var(--joy-palette-primary-200, #ADDBFF)',
          softBg: 'var(--joy-palette-primary-900, #00153C)',
          softHoverBg: 'var(--joy-palette-primary-800, #072859)',
          softActiveBg: 'var(--joy-palette-primary-700, #02367D)',
          softDisabledColor: 'var(--joy-palette-primary-800, #072859)',
          softDisabledBg: 'var(--joy-palette-primary-900, #00153C)',
          solidColor: '#fff',
          solidBg: 'var(--joy-palette-primary-600, #054DA7)',
          solidHoverBg: 'var(--joy-palette-primary-700, #02367D)',
          solidActiveBg: 'var(--joy-palette-primary-800, #072859)',
          solidDisabledColor: 'var(--joy-palette-primary-700, #02367D)',
          solidDisabledBg: 'var(--joy-palette-primary-900, #00153C)',
          mainChannel: '57 144 255',
          lightChannel: '173 219 255',
          darkChannel: '7 40 89',
        },
        neutral: {
          '50': '#F7F7F8',
          '100': '#EBEBEF',
          '200': '#D8D8DF',
          '300': '#B9B9C6',
          '400': '#8F8FA3',
          '500': '#73738C',
          '600': '#5A5A72',
          '700': '#434356',
          '800': '#25252D',
          '900': '#131318',
          plainColor: 'var(--joy-palette-neutral-200, #D8D8DF)',
          plainHoverColor: 'var(--joy-palette-neutral-50, #F7F7F8)',
          plainHoverBg: 'var(--joy-palette-neutral-800, #25252D)',
          plainActiveBg: 'var(--joy-palette-neutral-700, #434356)',
          plainDisabledColor: 'var(--joy-palette-neutral-700, #434356)',
          outlinedColor: 'var(--joy-palette-neutral-200, #D8D8DF)',
          outlinedBorder: 'var(--joy-palette-neutral-800, #25252D)',
          outlinedHoverColor: 'var(--joy-palette-neutral-50, #F7F7F8)',
          outlinedHoverBg: 'var(--joy-palette-neutral-800, #25252D)',
          outlinedHoverBorder: 'var(--joy-palette-neutral-700, #434356)',
          outlinedActiveBg: 'var(--joy-palette-neutral-800, #25252D)',
          outlinedDisabledColor: 'var(--joy-palette-neutral-800, #25252D)',
          outlinedDisabledBorder: 'var(--joy-palette-neutral-800, #25252D)',
          softColor: 'var(--joy-palette-neutral-200, #D8D8DF)',
          softBg: 'var(--joy-palette-neutral-800, #25252D)',
          softHoverColor: 'var(--joy-palette-neutral-50, #F7F7F8)',
          softHoverBg: 'var(--joy-palette-neutral-700, #434356)',
          softActiveBg: 'var(--joy-palette-neutral-600, #5A5A72)',
          softDisabledColor: 'var(--joy-palette-neutral-700, #434356)',
          softDisabledBg: 'var(--joy-palette-neutral-900, #131318)',
          solidColor: 'var(--joy-palette-common-white, #fff)',
          solidBg: 'var(--joy-palette-neutral-600, #5A5A72)',
          solidHoverBg: 'var(--joy-palette-neutral-700, #434356)',
          solidActiveBg: 'var(--joy-palette-neutral-800, #25252D)',
          solidDisabledColor: 'var(--joy-palette-neutral-700, #434356)',
          solidDisabledBg: 'var(--joy-palette-neutral-900, #131318)',
          mainChannel: '143 143 163',
          lightChannel: '216 216 223',
          darkChannel: '37 37 45',
        },
        danger: {
          '50': '#FFF8F6',
          '100': '#FFE9E8',
          '200': '#FFC7C5',
          '300': '#FF9192',
          '400': '#FA5255',
          '500': '#D3232F',
          '600': '#A10E25',
          '700': '#77061B',
          '800': '#580013',
          '900': '#39000D',
          plainColor: 'var(--joy-palette-danger-300, #FF9192)',
          plainHoverBg: 'var(--joy-palette-danger-800, #FF9192)',
          plainActiveBg: 'var(--joy-palette-danger-700, #77061B)',
          plainDisabledColor: 'var(--joy-palette-danger-800, #580013)',
          outlinedColor: 'var(--joy-palette-danger-200, #FFC7C5)',
          outlinedBorder: 'var(--joy-palette-danger-700, #77061B)',
          outlinedHoverBg: 'var(--joy-palette-danger-800, #580013)',
          outlinedHoverBorder: 'var(--joy-palette-danger-600, #A10E25)',
          outlinedActiveBg: 'var(--joy-palette-danger-900, #39000D)',
          outlinedDisabledColor: 'var(--joy-palette-danger-800, #580013)',
          outlinedDisabledBorder: 'var(--joy-palette-danger-800, #580013)',
          softColor: 'var(--joy-palette-danger-200, #FFC7C5)',
          softBg: 'var(--joy-palette-danger-900, #39000D)',
          softHoverBg: 'var(--joy-palette-danger-800, #580013)',
          softActiveBg: 'var(--joy-palette-danger-700, #77061B)',
          softDisabledColor: 'var(--joy-palette-danger-800, #580013)',
          softDisabledBg: 'var(--joy-palette-danger-900, #39000D)',
          solidColor: '#fff',
          solidBg: 'var(--joy-palette-danger-600, #A10E25)',
          solidHoverBg: 'var(--joy-palette-danger-700, #77061B)',
          solidActiveBg: 'var(--joy-palette-danger-800, #580013)',
          solidDisabledColor: 'var(--joy-palette-danger-700, #77061B)',
          solidDisabledBg: 'var(--joy-palette-danger-900, #39000D)',
          mainChannel: '250 82 85',
          lightChannel: '255 199 197',
          darkChannel: '88 0 19',
        },
        info: {
          '50': '#FDF7FF',
          '100': '#F4EAFF',
          '200': '#E1CBFF',
          '300': '#C69EFF',
          '400': '#A374F9',
          '500': '#814DDE',
          '600': '#5F35AE',
          '700': '#452382',
          '800': '#301761',
          '900': '#1D0A42',
          plainColor: 'var(--joy-palette-info-300, #C69EFF)',
          plainHoverBg: 'var(--joy-palette-info-800, #C69EFF)',
          plainActiveBg: 'var(--joy-palette-info-700, #452382)',
          plainDisabledColor: 'var(--joy-palette-info-800, #301761)',
          outlinedColor: 'var(--joy-palette-info-200, #E1CBFF)',
          outlinedBorder: 'var(--joy-palette-info-700, #452382)',
          outlinedHoverBg: 'var(--joy-palette-info-800, #301761)',
          outlinedHoverBorder: 'var(--joy-palette-info-600, #5F35AE)',
          outlinedActiveBg: 'var(--joy-palette-info-900, #1D0A42)',
          outlinedDisabledColor: 'var(--joy-palette-info-800, #301761)',
          outlinedDisabledBorder: 'var(--joy-palette-info-800, #301761)',
          softColor: 'var(--joy-palette-info-200, #E1CBFF)',
          softBg: 'var(--joy-palette-info-900, #1D0A42)',
          softHoverBg: 'var(--joy-palette-info-800, #301761)',
          softActiveBg: 'var(--joy-palette-info-700, #452382)',
          softDisabledColor: 'var(--joy-palette-info-800, #301761)',
          softDisabledBg: 'var(--joy-palette-info-900, #1D0A42)',
          solidColor: '#fff',
          solidBg: 'var(--joy-palette-info-600, #5F35AE)',
          solidHoverBg: 'var(--joy-palette-info-700, #452382)',
          solidActiveBg: 'var(--joy-palette-info-800, #301761)',
          solidDisabledColor: 'var(--joy-palette-info-700, #452382)',
          solidDisabledBg: 'var(--joy-palette-info-900, #1D0A42)',
          mainChannel: '163 116 249',
          lightChannel: '225 203 255',
          darkChannel: '48 23 97',
        },
        success: {
          '50': '#F3FEF5',
          '100': '#D7F5DD',
          '200': '#77EC95',
          '300': '#4CC76E',
          '400': '#2CA24D',
          '500': '#1A7D36',
          '600': '#0F5D26',
          '700': '#034318',
          '800': '#002F0F',
          '900': '#001D09',
          plainColor: 'var(--joy-palette-success-300, #4CC76E)',
          plainHoverBg: 'var(--joy-palette-success-800, #4CC76E)',
          plainActiveBg: 'var(--joy-palette-success-700, #034318)',
          plainDisabledColor: 'var(--joy-palette-success-800, #002F0F)',
          outlinedColor: 'var(--joy-palette-success-200, #77EC95)',
          outlinedBorder: 'var(--joy-palette-success-700, #034318)',
          outlinedHoverBg: 'var(--joy-palette-success-800, #002F0F)',
          outlinedHoverBorder: 'var(--joy-palette-success-600, #0F5D26)',
          outlinedActiveBg: 'var(--joy-palette-success-900, #001D09)',
          outlinedDisabledColor: 'var(--joy-palette-success-800, #002F0F)',
          outlinedDisabledBorder: 'var(--joy-palette-success-800, #002F0F)',
          softColor: 'var(--joy-palette-success-200, #77EC95)',
          softBg: 'var(--joy-palette-success-900, #001D09)',
          softHoverBg: 'var(--joy-palette-success-800, #002F0F)',
          softActiveBg: 'var(--joy-palette-success-700, #034318)',
          softDisabledColor: 'var(--joy-palette-success-800, #002F0F)',
          softDisabledBg: 'var(--joy-palette-success-900, #001D09)',
          solidColor: '#fff',
          solidBg: 'var(--joy-palette-success-600, #0F5D26)',
          solidHoverBg: 'var(--joy-palette-success-700, #034318)',
          solidActiveBg: 'var(--joy-palette-success-800, #002F0F)',
          solidDisabledColor: 'var(--joy-palette-success-700, #034318)',
          solidDisabledBg: 'var(--joy-palette-success-900, #001D09)',
          mainChannel: '44 162 77',
          lightChannel: '119 236 149',
          darkChannel: '0 47 15',
        },
        warning: {
          '50': '#FFF8C5',
          '100': '#FAE17D',
          '200': '#EAC54F',
          '300': '#D4A72C',
          '400': '#BF8700',
          '500': '#9A6700',
          '600': '#7D4E00',
          '700': '#633C01',
          '800': '#4D2D00',
          '900': '#3B2300',
          plainColor: 'var(--joy-palette-warning-300, #D4A72C)',
          plainHoverBg: 'var(--joy-palette-warning-800, #D4A72C)',
          plainActiveBg: 'var(--joy-palette-warning-700, #633C01)',
          plainDisabledColor: 'var(--joy-palette-warning-800, #4D2D00)',
          outlinedColor: 'var(--joy-palette-warning-200, #EAC54F)',
          outlinedBorder: 'var(--joy-palette-warning-700, #633C01)',
          outlinedHoverBg: 'var(--joy-palette-warning-800, #4D2D00)',
          outlinedHoverBorder: 'var(--joy-palette-warning-600, #7D4E00)',
          outlinedActiveBg: 'var(--joy-palette-warning-900, #3B2300)',
          outlinedDisabledColor: 'var(--joy-palette-warning-800, #4D2D00)',
          outlinedDisabledBorder: 'var(--joy-palette-warning-800, #4D2D00)',
          softColor: 'var(--joy-palette-warning-200, #EAC54F)',
          softBg: 'var(--joy-palette-warning-900, #3B2300)',
          softHoverBg: 'var(--joy-palette-warning-800, #4D2D00)',
          softActiveBg: 'var(--joy-palette-warning-700, #633C01)',
          softDisabledColor: 'var(--joy-palette-warning-800, #4D2D00)',
          softDisabledBg: 'var(--joy-palette-warning-900, #3B2300)',
          solidColor: 'var(--joy-palette-common-black, #09090D)',
          solidBg: 'var(--joy-palette-warning-300, #D4A72C)',
          solidHoverBg: 'var(--joy-palette-warning-400, #BF8700)',
          solidActiveBg: 'var(--joy-palette-warning-500, #9A6700)',
          solidDisabledColor: 'var(--joy-palette-warning-700, #633C01)',
          solidDisabledBg: 'var(--joy-palette-warning-900, #3B2300)',
          mainChannel: '191 135 0',
          lightChannel: '234 197 79',
          darkChannel: '77 45 0',
        },
        common: {
          white: '#FFF',
          black: '#09090D',
        },
        text: {
          primary: 'var(--joy-palette-neutral-100, #EBEBEF)',
          secondary: 'var(--joy-palette-neutral-300, #B9B9C6)',
          tertiary: 'var(--joy-palette-neutral-400, #8F8FA3)',
        },
        background: {
          body: 'var(--joy-palette-neutral-900, #131318)',
          surface: 'var(--joy-palette-common-black, #09090D)',
          popup: 'var(--joy-palette-neutral-800, #131318)',
          level1: 'var(--joy-palette-neutral-800, #25252D)',
          level2: 'var(--joy-palette-neutral-700, #434356)',
          level3: 'var(--joy-palette-neutral-600, #5A5A72)',
          tooltip: 'var(--joy-palette-neutral-600, #5A5A72)',
          backdrop: 'rgba(var(--joy-palette-neutral-darkChannel, 37 37 45) / 0.5)',
        },
        divider: 'rgba(var(--joy-palette-neutral-mainChannel, 115 115 140) / 0.24)',
        focusVisible: 'var(--joy-palette-primary-500)',
      },
      shadowRing: '0 0 #000',
      shadowChannel: '0 0 0',
    },
  },
  fontSize: {
    xs3: '0.5rem',
    xs2: '0.625rem',
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    xl2: '1.5rem',
    xl3: '1.875rem',
    xl4: '2.25rem',
    xl5: '3rem',
    xl6: '3.75rem',
    xl7: '4.5rem',
  },
  fontFamily: {
    body: '"Public Sans", var(--joy-fontFamily-fallback, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol")',
    display:
      '"Public Sans", var(--joy-fontFamily-fallback, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol")',
    code: 'Source Code Pro,ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace',
    fallback:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
  },
  fontWeight: {
    xs: 200,
    sm: 300,
    md: 500,
    lg: 600,
    xl: 700,
    xl2: 800,
    xl3: 900,
  },
  focus: {
    thickness: '2px',
    selector: '&.Joy-focusVisible, &:focus-visible',
    default: {
      outlineOffset: 'var(--focus-outline-offset, var(--joy-focus-thickness, 2px))',
      outline: 'var(--focus-thickness, 2px) solid var(--joy-palette-focusVisible, #096BDE)',
    },
  },
  lineHeight: {
    sm: 1.25,
    md: 1.5,
    lg: 1.7,
  },
  letterSpacing: {
    sm: '-0.01em',
    md: '0.083em',
    lg: '0.125em',
  },
  radius: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '20px',
  },
  shadow: {
    xs: 'var(--joy-shadowRing, 0 0 #000), 0 1px 2px 0 rgba(var(--joy-shadowChannel, 187 187 187) / 0.12)',
    sm: 'var(--joy-shadowRing, 0 0 #000), 0.3px 0.8px 1.1px rgba(var(--joy-shadowChannel, 187 187 187) / 0.11), 0.5px 1.3px 1.8px -0.6px rgba(var(--joy-shadowChannel, 187 187 187) / 0.18), 1.1px 2.7px 3.8px -1.2px rgba(var(--joy-shadowChannel, 187 187 187) / 0.26)',
    md: 'var(--joy-shadowRing, 0 0 #000), 0.3px 0.8px 1.1px rgba(var(--joy-shadowChannel, 187 187 187) / 0.12), 1.1px 2.8px 3.9px -0.4px rgba(var(--joy-shadowChannel, 187 187 187) / 0.17), 2.4px 6.1px 8.6px -0.8px rgba(var(--joy-shadowChannel, 187 187 187) / 0.23), 5.3px 13.3px 18.8px -1.2px rgba(var(--joy-shadowChannel, 187 187 187) / 0.29)',
    lg: 'var(--joy-shadowRing, 0 0 #000), 0.3px 0.8px 1.1px rgba(var(--joy-shadowChannel, 187 187 187) / 0.11), 1.8px 4.5px 6.4px -0.2px rgba(var(--joy-shadowChannel, 187 187 187) / 0.13), 3.2px 7.9px 11.2px -0.4px rgba(var(--joy-shadowChannel, 187 187 187) / 0.16), 4.8px 12px 17px -0.5px rgba(var(--joy-shadowChannel, 187 187 187) / 0.19), 7px 17.5px 24.7px -0.7px rgba(var(--joy-shadowChannel, 187 187 187) / 0.21)',
    xl: 'var(--joy-shadowRing, 0 0 #000), 0.3px 0.8px 1.1px rgba(var(--joy-shadowChannel, 187 187 187) / 0.11), 1.8px 4.5px 6.4px -0.2px rgba(var(--joy-shadowChannel, 187 187 187) / 0.13), 3.2px 7.9px 11.2px -0.4px rgba(var(--joy-shadowChannel, 187 187 187) / 0.16), 4.8px 12px 17px -0.5px rgba(var(--joy-shadowChannel, 187 187 187) / 0.19), 7px 17.5px 24.7px -0.7px rgba(var(--joy-shadowChannel, 187 187 187) / 0.21), 10.2px 25.5px 36px -0.9px rgba(var(--joy-shadowChannel, 187 187 187) / 0.24), 14.8px 36.8px 52.1px -1.1px rgba(var(--joy-shadowChannel, 187 187 187) / 0.27), 21px 52.3px 74px -1.2px rgba(var(--joy-shadowChannel, 187 187 187) / 0.29)',
  },
  zIndex: {
    badge: 1,
    table: 10,
    popup: 1000,
    modal: 1300,
    tooltip: 1500,
  },
  typography: {
    display1: {
      fontFamily:
        'var(--joy-fontFamily-display, "Public Sans", var(--joy-fontFamily-fallback, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"))',
      fontWeight: 'var(--joy-fontWeight-xl, 700)',
      fontSize: 'var(--joy-fontSize-xl7, 4.5rem)',
      lineHeight: 'var(--joy-lineHeight-sm, 1.25)',
      letterSpacing: 'var(--joy-letterSpacing-sm, -0.01em)',
      color: 'var(--joy-palette-text-primary, var(--joy-palette-neutral-800, #25252D))',
    },
    display2: {
      fontFamily:
        'var(--joy-fontFamily-display, "Public Sans", var(--joy-fontFamily-fallback, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"))',
      fontWeight: 'var(--joy-fontWeight-xl, 700)',
      fontSize: 'var(--joy-fontSize-xl6, 3.75rem)',
      lineHeight: 'var(--joy-lineHeight-sm, 1.25)',
      letterSpacing: 'var(--joy-letterSpacing-sm, -0.01em)',
      color: 'var(--joy-palette-text-primary, var(--joy-palette-neutral-800, #25252D))',
    },
    h1: {
      fontFamily:
        'var(--joy-fontFamily-display, "Public Sans", var(--joy-fontFamily-fallback, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"))',
      fontWeight: 'var(--joy-fontWeight-lg, 600)',
      fontSize: 'var(--joy-fontSize-xl5, 3rem)',
      lineHeight: 'var(--joy-lineHeight-sm, 1.25)',
      letterSpacing: 'var(--joy-letterSpacing-sm, -0.01em)',
      color: 'var(--joy-palette-text-primary, var(--joy-palette-neutral-800, #25252D))',
    },
    h2: {
      fontFamily:
        'var(--joy-fontFamily-display, "Public Sans", var(--joy-fontFamily-fallback, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"))',
      fontWeight: 'var(--joy-fontWeight-lg, 600)',
      fontSize: 'var(--joy-fontSize-xl4, 2.25rem)',
      lineHeight: 'var(--joy-lineHeight-sm, 1.25)',
      letterSpacing: 'var(--joy-letterSpacing-sm, -0.01em)',
      color: 'var(--joy-palette-text-primary, var(--joy-palette-neutral-800, #25252D))',
    },
    h3: {
      fontFamily:
        'var(--joy-fontFamily-body, "Public Sans", var(--joy-fontFamily-fallback, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"))',
      fontWeight: 'var(--joy-fontWeight-md, 500)',
      fontSize: 'var(--joy-fontSize-xl3, 1.875rem)',
      lineHeight: 'var(--joy-lineHeight-sm, 1.25)',
      color: 'var(--joy-palette-text-primary, var(--joy-palette-neutral-800, #25252D))',
    },
    h4: {
      fontFamily:
        'var(--joy-fontFamily-body, "Public Sans", var(--joy-fontFamily-fallback, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"))',
      fontWeight: 'var(--joy-fontWeight-md, 500)',
      fontSize: 'var(--joy-fontSize-xl2, 1.5rem)',
      lineHeight: 'var(--joy-lineHeight-md, 1.5)',
      color: 'var(--joy-palette-text-primary, var(--joy-palette-neutral-800, #25252D))',
    },
    h5: {
      fontFamily:
        'var(--joy-fontFamily-body, "Public Sans", var(--joy-fontFamily-fallback, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"))',
      fontWeight: 'var(--joy-fontWeight-md, 500)',
      fontSize: 'var(--joy-fontSize-xl, 1.25rem)',
      lineHeight: 'var(--joy-lineHeight-md, 1.5)',
      color: 'var(--joy-palette-text-primary, var(--joy-palette-neutral-800, #25252D))',
    },
    h6: {
      fontFamily:
        'var(--joy-fontFamily-body, "Public Sans", var(--joy-fontFamily-fallback, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"))',
      fontWeight: 'var(--joy-fontWeight-md, 500)',
      fontSize: 'var(--joy-fontSize-lg, 1.125rem)',
      lineHeight: 'var(--joy-lineHeight-md, 1.5)',
      color: 'var(--joy-palette-text-primary, var(--joy-palette-neutral-800, #25252D))',
    },
    body1: {
      fontFamily:
        'var(--joy-fontFamily-body, "Public Sans", var(--joy-fontFamily-fallback, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"))',
      fontSize: 'var(--joy-fontSize-md, 1rem)',
      lineHeight: 'var(--joy-lineHeight-md, 1.5)',
      color: 'var(--joy-palette-text-primary, var(--joy-palette-neutral-800, #25252D))',
    },
    body2: {
      fontFamily:
        'var(--joy-fontFamily-body, "Public Sans", var(--joy-fontFamily-fallback, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"))',
      fontSize: 'var(--joy-fontSize-sm, 0.875rem)',
      lineHeight: 'var(--joy-lineHeight-md, 1.5)',
      color: 'var(--joy-palette-text-secondary, var(--joy-palette-neutral-600, #5A5A72))',
    },
    body3: {
      fontFamily:
        'var(--joy-fontFamily-body, "Public Sans", var(--joy-fontFamily-fallback, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"))',
      fontSize: 'var(--joy-fontSize-xs, 0.75rem)',
      lineHeight: 'var(--joy-lineHeight-md, 1.5)',
      color: 'var(--joy-palette-text-tertiary, var(--joy-palette-neutral-500, #73738C))',
    },
    body4: {
      fontFamily:
        'var(--joy-fontFamily-body, "Public Sans", var(--joy-fontFamily-fallback, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"))',
      fontSize: 'var(--joy-fontSize-xs2, 0.625rem)',
      lineHeight: 'var(--joy-lineHeight-md, 1.5)',
      color: 'var(--joy-palette-text-tertiary, var(--joy-palette-neutral-500, #73738C))',
    },
    body5: {
      fontFamily:
        'var(--joy-fontFamily-body, "Public Sans", var(--joy-fontFamily-fallback, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"))',
      fontSize: 'var(--joy-fontSize-xs3, 0.5rem)',
      lineHeight: 'var(--joy-lineHeight-md, 1.5)',
      color: 'var(--joy-palette-text-tertiary, var(--joy-palette-neutral-500, #73738C))',
    },
  },
  components: {
    MuiSvgIcon: {
      defaultProps: {
        fontSize: 'xl',
      },
      styleOverrides: {
        // @ts-ignore internal integration with @mui/icons-material
        root: ({ ownerState, theme: themeProp }) => {
          const instanceFontSize = ownerState.instanceFontSize as 'inherit';
          return {
            color: 'var(--Icon-color)',
            margin: 'var(--Icon-margin)',
            ...(ownerState.fontSize &&
              ownerState.fontSize !== 'inherit' && {
                fontSize: `var(--Icon-fontSize, ${themeProp.vars.fontSize[ownerState.fontSize]})`,
              }),
            ...(ownerState.color &&
              ownerState.color !== 'inherit' &&
              ownerState.color !== 'context' &&
              themeProp.vars.palette[ownerState.color!] && {
                color: `rgba(${themeProp.vars.palette[ownerState.color]?.mainChannel} / 1)`,
              }),
            ...(ownerState.color === 'context' && {
              color: themeProp.vars.palette.text.secondary,
            }),
            ...(instanceFontSize &&
              instanceFontSize !== 'inherit' && {
                '--Icon-fontSize': themeProp.vars.fontSize[instanceFontSize],
              }),
          };
        },
      },
    },
  },
  cssVarPrefix: 'joy',
  colorInversionConfig: {
    soft: ['plain', 'outlined', 'soft', 'solid'],
    solid: ['plain', 'outlined', 'soft', 'solid'],
  },
  vars: {
    fontSize: {
      xs3: 'var(--joy-fontSize-xs3, 0.5rem)',
      xs2: 'var(--joy-fontSize-xs2, 0.625rem)',
      xs: 'var(--joy-fontSize-xs, 0.75rem)',
      sm: 'var(--joy-fontSize-sm, 0.875rem)',
      md: 'var(--joy-fontSize-md, 1rem)',
      lg: 'var(--joy-fontSize-lg, 1.125rem)',
      xl: 'var(--joy-fontSize-xl, 1.25rem)',
      xl2: 'var(--joy-fontSize-xl2, 1.5rem)',
      xl3: 'var(--joy-fontSize-xl3, 1.875rem)',
      xl4: 'var(--joy-fontSize-xl4, 2.25rem)',
      xl5: 'var(--joy-fontSize-xl5, 3rem)',
      xl6: 'var(--joy-fontSize-xl6, 3.75rem)',
      xl7: 'var(--joy-fontSize-xl7, 4.5rem)',
    },
    fontFamily: {
      body: 'var(--joy-fontFamily-body, "Public Sans", var(--joy-fontFamily-fallback, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"))',
      display:
        'var(--joy-fontFamily-display, "Public Sans", var(--joy-fontFamily-fallback, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"))',
      code: 'var(--joy-fontFamily-code, Source Code Pro,ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace)',
      fallback:
        'var(--joy-fontFamily-fallback, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol")',
    },
    fontWeight: {
      xs: 'var(--joy-fontWeight-xs, 200)',
      sm: 'var(--joy-fontWeight-sm, 300)',
      md: 'var(--joy-fontWeight-md, 500)',
      lg: 'var(--joy-fontWeight-lg, 600)',
      xl: 'var(--joy-fontWeight-xl, 700)',
      xl2: 'var(--joy-fontWeight-xl2, 800)',
      xl3: 'var(--joy-fontWeight-xl3, 900)',
    },
    focus: {
      thickness: 'var(--joy-focus-thickness, 2px)',
    },
    lineHeight: {
      sm: 'var(--joy-lineHeight-sm, 1.25)',
      md: 'var(--joy-lineHeight-md, 1.5)',
      lg: 'var(--joy-lineHeight-lg, 1.7)',
    },
    letterSpacing: {
      sm: 'var(--joy-letterSpacing-sm, -0.01em)',
      md: 'var(--joy-letterSpacing-md, 0.083em)',
      lg: 'var(--joy-letterSpacing-lg, 0.125em)',
    },
    radius: {
      xs: 'var(--joy-radius-xs, 4px)',
      sm: 'var(--joy-radius-sm, 8px)',
      md: 'var(--joy-radius-md, 12px)',
      lg: 'var(--joy-radius-lg, 16px)',
      xl: 'var(--joy-radius-xl, 20px)',
    },
    shadow: {
      xs: 'var(--joy-shadow-xs, var(--joy-shadowRing, 0 0 #000), 0 1px 2px 0 rgba(var(--joy-shadowChannel, 187 187 187) / 0.12))',
      sm: 'var(--joy-shadow-sm, var(--joy-shadowRing, 0 0 #000), 0.3px 0.8px 1.1px rgba(var(--joy-shadowChannel, 187 187 187) / 0.11), 0.5px 1.3px 1.8px -0.6px rgba(var(--joy-shadowChannel, 187 187 187) / 0.18), 1.1px 2.7px 3.8px -1.2px rgba(var(--joy-shadowChannel, 187 187 187) / 0.26))',
      md: 'var(--joy-shadow-md, var(--joy-shadowRing, 0 0 #000), 0.3px 0.8px 1.1px rgba(var(--joy-shadowChannel, 187 187 187) / 0.12), 1.1px 2.8px 3.9px -0.4px rgba(var(--joy-shadowChannel, 187 187 187) / 0.17), 2.4px 6.1px 8.6px -0.8px rgba(var(--joy-shadowChannel, 187 187 187) / 0.23), 5.3px 13.3px 18.8px -1.2px rgba(var(--joy-shadowChannel, 187 187 187) / 0.29))',
      lg: 'var(--joy-shadow-lg, var(--joy-shadowRing, 0 0 #000), 0.3px 0.8px 1.1px rgba(var(--joy-shadowChannel, 187 187 187) / 0.11), 1.8px 4.5px 6.4px -0.2px rgba(var(--joy-shadowChannel, 187 187 187) / 0.13), 3.2px 7.9px 11.2px -0.4px rgba(var(--joy-shadowChannel, 187 187 187) / 0.16), 4.8px 12px 17px -0.5px rgba(var(--joy-shadowChannel, 187 187 187) / 0.19), 7px 17.5px 24.7px -0.7px rgba(var(--joy-shadowChannel, 187 187 187) / 0.21))',
      xl: 'var(--joy-shadow-xl, var(--joy-shadowRing, 0 0 #000), 0.3px 0.8px 1.1px rgba(var(--joy-shadowChannel, 187 187 187) / 0.11), 1.8px 4.5px 6.4px -0.2px rgba(var(--joy-shadowChannel, 187 187 187) / 0.13), 3.2px 7.9px 11.2px -0.4px rgba(var(--joy-shadowChannel, 187 187 187) / 0.16), 4.8px 12px 17px -0.5px rgba(var(--joy-shadowChannel, 187 187 187) / 0.19), 7px 17.5px 24.7px -0.7px rgba(var(--joy-shadowChannel, 187 187 187) / 0.21), 10.2px 25.5px 36px -0.9px rgba(var(--joy-shadowChannel, 187 187 187) / 0.24), 14.8px 36.8px 52.1px -1.1px rgba(var(--joy-shadowChannel, 187 187 187) / 0.27), 21px 52.3px 74px -1.2px rgba(var(--joy-shadowChannel, 187 187 187) / 0.29))',
    },
    zIndex: {
      badge: 'var(--joy-zIndex-badge, 1)',
      table: 'var(--joy-zIndex-table, 10)',
      popup: 'var(--joy-zIndex-popup, 1000)',
      modal: 'var(--joy-zIndex-modal, 1300)',
      tooltip: 'var(--joy-zIndex-tooltip, 1500)',
    },
    palette: {
      primary: {
        '50': 'var(--joy-palette-primary-50, #F4FAFF)',
        '100': 'var(--joy-palette-primary-100, #DDF1FF)',
        '200': 'var(--joy-palette-primary-200, #ADDBFF)',
        '300': 'var(--joy-palette-primary-300, #6FB6FF)',
        '400': 'var(--joy-palette-primary-400, #3990FF)',
        '500': 'var(--joy-palette-primary-500, #096BDE)',
        '600': 'var(--joy-palette-primary-600, #054DA7)',
        '700': 'var(--joy-palette-primary-700, #02367D)',
        '800': 'var(--joy-palette-primary-800, #072859)',
        '900': 'var(--joy-palette-primary-900, #00153C)',
        plainColor:
          'var(--joy-palette-primary-plainColor, var(--joy-palette-primary-600, #054DA7))',
        plainHoverBg:
          'var(--joy-palette-primary-plainHoverBg, var(--joy-palette-primary-100, #DDF1FF))',
        plainActiveBg:
          'var(--joy-palette-primary-plainActiveBg, var(--joy-palette-primary-200, #ADDBFF))',
        plainDisabledColor:
          'var(--joy-palette-primary-plainDisabledColor, var(--joy-palette-primary-200, #ADDBFF))',
        outlinedColor:
          'var(--joy-palette-primary-outlinedColor, var(--joy-palette-primary-500, #096BDE))',
        outlinedBorder:
          'var(--joy-palette-primary-outlinedBorder, var(--joy-palette-primary-200, #ADDBFF))',
        outlinedHoverBg:
          'var(--joy-palette-primary-outlinedHoverBg, var(--joy-palette-primary-100, #DDF1FF))',
        outlinedHoverBorder:
          'var(--joy-palette-primary-outlinedHoverBorder, var(--joy-palette-primary-300, #6FB6FF))',
        outlinedActiveBg:
          'var(--joy-palette-primary-outlinedActiveBg, var(--joy-palette-primary-200, #ADDBFF))',
        outlinedDisabledColor:
          'var(--joy-palette-primary-outlinedDisabledColor, var(--joy-palette-primary-100, #DDF1FF))',
        outlinedDisabledBorder:
          'var(--joy-palette-primary-outlinedDisabledBorder, var(--joy-palette-primary-100, #DDF1FF))',
        softColor: 'var(--joy-palette-primary-softColor, var(--joy-palette-primary-600, #054DA7))',
        softBg: 'var(--joy-palette-primary-softBg, var(--joy-palette-primary-100, #DDF1FF))',
        softHoverBg:
          'var(--joy-palette-primary-softHoverBg, var(--joy-palette-primary-200, #ADDBFF))',
        softActiveBg:
          'var(--joy-palette-primary-softActiveBg, var(--joy-palette-primary-300, #6FB6FF))',
        softDisabledColor:
          'var(--joy-palette-primary-softDisabledColor, var(--joy-palette-primary-300, #6FB6FF))',
        softDisabledBg:
          'var(--joy-palette-primary-softDisabledBg, var(--joy-palette-primary-50, #F4FAFF))',
        solidColor: 'var(--joy-palette-primary-solidColor, #fff)',
        solidBg: 'var(--joy-palette-primary-solidBg, var(--palette-primary-500, #096BDE))',
        solidHoverBg:
          'var(--joy-palette-primary-solidHoverBg, var(--palette-primary-600, #054DA7))',
        solidActiveBg:
          'var(--joy-palette-primary-solidActiveBg, var(--palette-primary-700, #02367D))',
        solidDisabledColor: 'var(--joy-palette-primary-solidDisabledColor, #fff)',
        solidDisabledBg:
          'var(--joy-palette-primary-solidDisabledBg, var(--palette-primary-200, #ADDBFF))',
        mainChannel: 'var(--joy-palette-primary-mainChannel, 9 107 222)',
        lightChannel: 'var(--joy-palette-primary-lightChannel, 173 219 255)',
        darkChannel: 'var(--joy-palette-primary-darkChannel, 7 40 89)',
      },
      neutral: {
        '50': 'var(--joy-palette-neutral-50, #F7F7F8)',
        '100': 'var(--joy-palette-neutral-100, #EBEBEF)',
        '200': 'var(--joy-palette-neutral-200, #D8D8DF)',
        '300': 'var(--joy-palette-neutral-300, #B9B9C6)',
        '400': 'var(--joy-palette-neutral-400, #8F8FA3)',
        '500': 'var(--joy-palette-neutral-500, #73738C)',
        '600': 'var(--joy-palette-neutral-600, #5A5A72)',
        '700': 'var(--joy-palette-neutral-700, #434356)',
        '800': 'var(--joy-palette-neutral-800, #25252D)',
        '900': 'var(--joy-palette-neutral-900, #131318)',
        plainColor:
          'var(--joy-palette-neutral-plainColor, var(--joy-palette-neutral-800, #25252D))',
        plainHoverColor:
          'var(--joy-palette-neutral-plainHoverColor, var(--joy-palette-neutral-900, #131318))',
        plainHoverBg:
          'var(--joy-palette-neutral-plainHoverBg, var(--joy-palette-neutral-100, #EBEBEF))',
        plainActiveBg:
          'var(--joy-palette-neutral-plainActiveBg, var(--joy-palette-neutral-200, #D8D8DF))',
        plainDisabledColor:
          'var(--joy-palette-neutral-plainDisabledColor, var(--joy-palette-neutral-300, #B9B9C6))',
        outlinedColor:
          'var(--joy-palette-neutral-outlinedColor, var(--joy-palette-neutral-800, #25252D))',
        outlinedBorder:
          'var(--joy-palette-neutral-outlinedBorder, var(--joy-palette-neutral-200, #D8D8DF))',
        outlinedHoverColor:
          'var(--joy-palette-neutral-outlinedHoverColor, var(--joy-palette-neutral-900, #131318))',
        outlinedHoverBg:
          'var(--joy-palette-neutral-outlinedHoverBg, var(--joy-palette-neutral-100, #EBEBEF))',
        outlinedHoverBorder:
          'var(--joy-palette-neutral-outlinedHoverBorder, var(--joy-palette-neutral-300, #B9B9C6))',
        outlinedActiveBg:
          'var(--joy-palette-neutral-outlinedActiveBg, var(--joy-palette-neutral-200, #D8D8DF))',
        outlinedDisabledColor:
          'var(--joy-palette-neutral-outlinedDisabledColor, var(--joy-palette-neutral-300, #B9B9C6))',
        outlinedDisabledBorder:
          'var(--joy-palette-neutral-outlinedDisabledBorder, var(--joy-palette-neutral-100, #EBEBEF))',
        softColor: 'var(--joy-palette-neutral-softColor, var(--joy-palette-neutral-800, #25252D))',
        softBg: 'var(--joy-palette-neutral-softBg, var(--joy-palette-neutral-100, #EBEBEF))',
        softHoverColor:
          'var(--joy-palette-neutral-softHoverColor, var(--joy-palette-neutral-900, #131318))',
        softHoverBg:
          'var(--joy-palette-neutral-softHoverBg, var(--joy-palette-neutral-200, #D8D8DF))',
        softActiveBg:
          'var(--joy-palette-neutral-softActiveBg, var(--joy-palette-neutral-300, #B9B9C6))',
        softDisabledColor:
          'var(--joy-palette-neutral-softDisabledColor, var(--joy-palette-neutral-300, #B9B9C6))',
        softDisabledBg:
          'var(--joy-palette-neutral-softDisabledBg, var(--joy-palette-neutral-50, #F7F7F8))',
        solidColor: 'var(--joy-palette-neutral-solidColor, var(--joy-palette-common-white, #fff))',
        solidBg: 'var(--joy-palette-neutral-solidBg, var(--joy-palette-neutral-600, #5A5A72))',
        solidHoverBg:
          'var(--joy-palette-neutral-solidHoverBg, var(--joy-palette-neutral-700, #434356))',
        solidActiveBg:
          'var(--joy-palette-neutral-solidActiveBg, var(--joy-palette-neutral-800, #25252D))',
        solidDisabledColor:
          'var(--joy-palette-neutral-solidDisabledColor, var(--joy-palette-neutral-300, #B9B9C6))',
        solidDisabledBg:
          'var(--joy-palette-neutral-solidDisabledBg, var(--joy-palette-neutral-50, #F7F7F8))',
        mainChannel: 'var(--joy-palette-neutral-mainChannel, 115 115 140)',
        lightChannel: 'var(--joy-palette-neutral-lightChannel, 216 216 223)',
        darkChannel: 'var(--joy-palette-neutral-darkChannel, 37 37 45)',
      },
      danger: {
        '50': 'var(--joy-palette-danger-50, #FFF8F6)',
        '100': 'var(--joy-palette-danger-100, #FFE9E8)',
        '200': 'var(--joy-palette-danger-200, #FFC7C5)',
        '300': 'var(--joy-palette-danger-300, #FF9192)',
        '400': 'var(--joy-palette-danger-400, #FA5255)',
        '500': 'var(--joy-palette-danger-500, #D3232F)',
        '600': 'var(--joy-palette-danger-600, #A10E25)',
        '700': 'var(--joy-palette-danger-700, #77061B)',
        '800': 'var(--joy-palette-danger-800, #580013)',
        '900': 'var(--joy-palette-danger-900, #39000D)',
        plainColor: 'var(--joy-palette-danger-plainColor, var(--joy-palette-danger-600, #A10E25))',
        plainHoverBg:
          'var(--joy-palette-danger-plainHoverBg, var(--joy-palette-danger-100, #FFE9E8))',
        plainActiveBg:
          'var(--joy-palette-danger-plainActiveBg, var(--joy-palette-danger-200, #FFC7C5))',
        plainDisabledColor:
          'var(--joy-palette-danger-plainDisabledColor, var(--joy-palette-danger-200, #FFC7C5))',
        outlinedColor:
          'var(--joy-palette-danger-outlinedColor, var(--joy-palette-danger-500, #D3232F))',
        outlinedBorder:
          'var(--joy-palette-danger-outlinedBorder, var(--joy-palette-danger-200, #FFC7C5))',
        outlinedHoverBg:
          'var(--joy-palette-danger-outlinedHoverBg, var(--joy-palette-danger-100, #FFE9E8))',
        outlinedHoverBorder:
          'var(--joy-palette-danger-outlinedHoverBorder, var(--joy-palette-danger-300, #FF9192))',
        outlinedActiveBg:
          'var(--joy-palette-danger-outlinedActiveBg, var(--joy-palette-danger-200, #FFC7C5))',
        outlinedDisabledColor:
          'var(--joy-palette-danger-outlinedDisabledColor, var(--joy-palette-danger-100, #FFE9E8))',
        outlinedDisabledBorder:
          'var(--joy-palette-danger-outlinedDisabledBorder, var(--joy-palette-danger-100, #FFE9E8))',
        softColor: 'var(--joy-palette-danger-softColor, var(--joy-palette-danger-600, #A10E25))',
        softBg: 'var(--joy-palette-danger-softBg, var(--joy-palette-danger-100, #FFE9E8))',
        softHoverBg:
          'var(--joy-palette-danger-softHoverBg, var(--joy-palette-danger-200, #FFC7C5))',
        softActiveBg:
          'var(--joy-palette-danger-softActiveBg, var(--joy-palette-danger-300, #FF9192))',
        softDisabledColor:
          'var(--joy-palette-danger-softDisabledColor, var(--joy-palette-danger-300, #FF9192))',
        softDisabledBg:
          'var(--joy-palette-danger-softDisabledBg, var(--joy-palette-danger-50, #FFF8F6))',
        solidColor: 'var(--joy-palette-danger-solidColor, #fff)',
        solidBg: 'var(--joy-palette-danger-solidBg, var(--palette-danger-500, #D3232F))',
        solidHoverBg: 'var(--joy-palette-danger-solidHoverBg, var(--palette-danger-600, #A10E25))',
        solidActiveBg:
          'var(--joy-palette-danger-solidActiveBg, var(--palette-danger-700, #77061B))',
        solidDisabledColor: 'var(--joy-palette-danger-solidDisabledColor, #fff)',
        solidDisabledBg:
          'var(--joy-palette-danger-solidDisabledBg, var(--palette-danger-200, #FFC7C5))',
        mainChannel: 'var(--joy-palette-danger-mainChannel, 211 35 47)',
        lightChannel: 'var(--joy-palette-danger-lightChannel, 255 199 197)',
        darkChannel: 'var(--joy-palette-danger-darkChannel, 88 0 19)',
      },
      info: {
        '50': 'var(--joy-palette-info-50, #FDF7FF)',
        '100': 'var(--joy-palette-info-100, #F4EAFF)',
        '200': 'var(--joy-palette-info-200, #E1CBFF)',
        '300': 'var(--joy-palette-info-300, #C69EFF)',
        '400': 'var(--joy-palette-info-400, #A374F9)',
        '500': 'var(--joy-palette-info-500, #814DDE)',
        '600': 'var(--joy-palette-info-600, #5F35AE)',
        '700': 'var(--joy-palette-info-700, #452382)',
        '800': 'var(--joy-palette-info-800, #301761)',
        '900': 'var(--joy-palette-info-900, #1D0A42)',
        plainColor: 'var(--joy-palette-info-plainColor, var(--joy-palette-info-600, #5F35AE))',
        plainHoverBg: 'var(--joy-palette-info-plainHoverBg, var(--joy-palette-info-100, #F4EAFF))',
        plainActiveBg:
          'var(--joy-palette-info-plainActiveBg, var(--joy-palette-info-200, #E1CBFF))',
        plainDisabledColor:
          'var(--joy-palette-info-plainDisabledColor, var(--joy-palette-info-200, #E1CBFF))',
        outlinedColor:
          'var(--joy-palette-info-outlinedColor, var(--joy-palette-info-500, #814DDE))',
        outlinedBorder:
          'var(--joy-palette-info-outlinedBorder, var(--joy-palette-info-200, #E1CBFF))',
        outlinedHoverBg:
          'var(--joy-palette-info-outlinedHoverBg, var(--joy-palette-info-100, #F4EAFF))',
        outlinedHoverBorder:
          'var(--joy-palette-info-outlinedHoverBorder, var(--joy-palette-info-300, #C69EFF))',
        outlinedActiveBg:
          'var(--joy-palette-info-outlinedActiveBg, var(--joy-palette-info-200, #E1CBFF))',
        outlinedDisabledColor:
          'var(--joy-palette-info-outlinedDisabledColor, var(--joy-palette-info-100, #F4EAFF))',
        outlinedDisabledBorder:
          'var(--joy-palette-info-outlinedDisabledBorder, var(--joy-palette-info-100, #F4EAFF))',
        softColor: 'var(--joy-palette-info-softColor, var(--joy-palette-info-600, #5F35AE))',
        softBg: 'var(--joy-palette-info-softBg, var(--joy-palette-info-100, #F4EAFF))',
        softHoverBg: 'var(--joy-palette-info-softHoverBg, var(--joy-palette-info-200, #E1CBFF))',
        softActiveBg: 'var(--joy-palette-info-softActiveBg, var(--joy-palette-info-300, #C69EFF))',
        softDisabledColor:
          'var(--joy-palette-info-softDisabledColor, var(--joy-palette-info-300, #C69EFF))',
        softDisabledBg:
          'var(--joy-palette-info-softDisabledBg, var(--joy-palette-info-50, #FDF7FF))',
        solidColor: 'var(--joy-palette-info-solidColor, #fff)',
        solidBg: 'var(--joy-palette-info-solidBg, var(--palette-info-500, #814DDE))',
        solidHoverBg: 'var(--joy-palette-info-solidHoverBg, var(--palette-info-600, #5F35AE))',
        solidActiveBg: 'var(--joy-palette-info-solidActiveBg, var(--palette-info-700, #452382))',
        solidDisabledColor: 'var(--joy-palette-info-solidDisabledColor, #fff)',
        solidDisabledBg:
          'var(--joy-palette-info-solidDisabledBg, var(--palette-info-200, #E1CBFF))',
        mainChannel: 'var(--joy-palette-info-mainChannel, 129 77 222)',
        lightChannel: 'var(--joy-palette-info-lightChannel, 225 203 255)',
        darkChannel: 'var(--joy-palette-info-darkChannel, 48 23 97)',
      },
      success: {
        '50': 'var(--joy-palette-success-50, #F3FEF5)',
        '100': 'var(--joy-palette-success-100, #D7F5DD)',
        '200': 'var(--joy-palette-success-200, #77EC95)',
        '300': 'var(--joy-palette-success-300, #4CC76E)',
        '400': 'var(--joy-palette-success-400, #2CA24D)',
        '500': 'var(--joy-palette-success-500, #1A7D36)',
        '600': 'var(--joy-palette-success-600, #0F5D26)',
        '700': 'var(--joy-palette-success-700, #034318)',
        '800': 'var(--joy-palette-success-800, #002F0F)',
        '900': 'var(--joy-palette-success-900, #001D09)',
        plainColor:
          'var(--joy-palette-success-plainColor, var(--joy-palette-success-600, #0F5D26))',
        plainHoverBg:
          'var(--joy-palette-success-plainHoverBg, var(--joy-palette-success-100, #D7F5DD))',
        plainActiveBg:
          'var(--joy-palette-success-plainActiveBg, var(--joy-palette-success-200, #77EC95))',
        plainDisabledColor:
          'var(--joy-palette-success-plainDisabledColor, var(--joy-palette-success-200, #77EC95))',
        outlinedColor:
          'var(--joy-palette-success-outlinedColor, var(--joy-palette-success-500, #1A7D36))',
        outlinedBorder:
          'var(--joy-palette-success-outlinedBorder, var(--joy-palette-success-200, #77EC95))',
        outlinedHoverBg:
          'var(--joy-palette-success-outlinedHoverBg, var(--joy-palette-success-100, #D7F5DD))',
        outlinedHoverBorder:
          'var(--joy-palette-success-outlinedHoverBorder, var(--joy-palette-success-300, #4CC76E))',
        outlinedActiveBg:
          'var(--joy-palette-success-outlinedActiveBg, var(--joy-palette-success-200, #77EC95))',
        outlinedDisabledColor:
          'var(--joy-palette-success-outlinedDisabledColor, var(--joy-palette-success-100, #D7F5DD))',
        outlinedDisabledBorder:
          'var(--joy-palette-success-outlinedDisabledBorder, var(--joy-palette-success-100, #D7F5DD))',
        softColor: 'var(--joy-palette-success-softColor, var(--joy-palette-success-600, #0F5D26))',
        softBg: 'var(--joy-palette-success-softBg, var(--joy-palette-success-100, #D7F5DD))',
        softHoverBg:
          'var(--joy-palette-success-softHoverBg, var(--joy-palette-success-200, #77EC95))',
        softActiveBg:
          'var(--joy-palette-success-softActiveBg, var(--joy-palette-success-300, #4CC76E))',
        softDisabledColor:
          'var(--joy-palette-success-softDisabledColor, var(--joy-palette-success-300, #4CC76E))',
        softDisabledBg:
          'var(--joy-palette-success-softDisabledBg, var(--joy-palette-success-50, #F3FEF5))',
        solidColor: 'var(--joy-palette-success-solidColor, #fff)',
        solidBg: 'var(--joy-palette-success-solidBg, var(--palette-success-500, #1A7D36))',
        solidHoverBg:
          'var(--joy-palette-success-solidHoverBg, var(--palette-success-600, #0F5D26))',
        solidActiveBg:
          'var(--joy-palette-success-solidActiveBg, var(--palette-success-700, #034318))',
        solidDisabledColor: 'var(--joy-palette-success-solidDisabledColor, #fff)',
        solidDisabledBg:
          'var(--joy-palette-success-solidDisabledBg, var(--palette-success-200, #77EC95))',
        mainChannel: 'var(--joy-palette-success-mainChannel, 26 125 54)',
        lightChannel: 'var(--joy-palette-success-lightChannel, 119 236 149)',
        darkChannel: 'var(--joy-palette-success-darkChannel, 0 47 15)',
      },
      warning: {
        '50': 'var(--joy-palette-warning-50, #FFF8C5)',
        '100': 'var(--joy-palette-warning-100, #FAE17D)',
        '200': 'var(--joy-palette-warning-200, #EAC54F)',
        '300': 'var(--joy-palette-warning-300, #D4A72C)',
        '400': 'var(--joy-palette-warning-400, #BF8700)',
        '500': 'var(--joy-palette-warning-500, #9A6700)',
        '600': 'var(--joy-palette-warning-600, #7D4E00)',
        '700': 'var(--joy-palette-warning-700, #633C01)',
        '800': 'var(--joy-palette-warning-800, #4D2D00)',
        '900': 'var(--joy-palette-warning-900, #3B2300)',
        plainColor:
          'var(--joy-palette-warning-plainColor, var(--joy-palette-warning-800, #4D2D00))',
        plainHoverBg:
          'var(--joy-palette-warning-plainHoverBg, var(--joy-palette-warning-50, #FFF8C5))',
        plainActiveBg:
          'var(--joy-palette-warning-plainActiveBg, var(--joy-palette-warning-200, #EAC54F))',
        plainDisabledColor:
          'var(--joy-palette-warning-plainDisabledColor, var(--joy-palette-warning-200, #EAC54F))',
        outlinedColor:
          'var(--joy-palette-warning-outlinedColor, var(--joy-palette-warning-800, #4D2D00))',
        outlinedBorder:
          'var(--joy-palette-warning-outlinedBorder, var(--joy-palette-warning-200, #EAC54F))',
        outlinedHoverBg:
          'var(--joy-palette-warning-outlinedHoverBg, var(--joy-palette-warning-50, #FFF8C5))',
        outlinedHoverBorder:
          'var(--joy-palette-warning-outlinedHoverBorder, var(--joy-palette-warning-300, #D4A72C))',
        outlinedActiveBg:
          'var(--joy-palette-warning-outlinedActiveBg, var(--joy-palette-warning-200, #EAC54F))',
        outlinedDisabledColor:
          'var(--joy-palette-warning-outlinedDisabledColor, var(--joy-palette-warning-100, #FAE17D))',
        outlinedDisabledBorder:
          'var(--joy-palette-warning-outlinedDisabledBorder, var(--joy-palette-warning-100, #FAE17D))',
        softColor: 'var(--joy-palette-warning-softColor, var(--joy-palette-warning-800, #4D2D00))',
        softBg: 'var(--joy-palette-warning-softBg, var(--joy-palette-warning-50, #FFF8C5))',
        softHoverBg:
          'var(--joy-palette-warning-softHoverBg, var(--joy-palette-warning-100, #FAE17D))',
        softActiveBg:
          'var(--joy-palette-warning-softActiveBg, var(--joy-palette-warning-200, #EAC54F))',
        softDisabledColor:
          'var(--joy-palette-warning-softDisabledColor, var(--joy-palette-warning-200, #EAC54F))',
        softDisabledBg:
          'var(--joy-palette-warning-softDisabledBg, var(--joy-palette-warning-50, #FFF8C5))',
        solidColor:
          'var(--joy-palette-warning-solidColor, var(--joy-palette-warning-800, #4D2D00))',
        solidBg: 'var(--joy-palette-warning-solidBg, var(--joy-palette-warning-200, #EAC54F))',
        solidHoverBg:
          'var(--joy-palette-warning-solidHoverBg, var(--joy-palette-warning-300, #D4A72C))',
        solidActiveBg:
          'var(--joy-palette-warning-solidActiveBg, var(--joy-palette-warning-400, #BF8700))',
        solidDisabledColor:
          'var(--joy-palette-warning-solidDisabledColor, var(--joy-palette-warning-200, #EAC54F))',
        solidDisabledBg:
          'var(--joy-palette-warning-solidDisabledBg, var(--joy-palette-warning-50, #FFF8C5))',
        mainChannel: 'var(--joy-palette-warning-mainChannel, 154 103 0)',
        lightChannel: 'var(--joy-palette-warning-lightChannel, 234 197 79)',
        darkChannel: 'var(--joy-palette-warning-darkChannel, 77 45 0)',
      },
      common: {
        white: 'var(--joy-palette-common-white, #FFF)',
        black: 'var(--joy-palette-common-black, #09090D)',
      },
      text: {
        primary: 'var(--joy-palette-text-primary, var(--joy-palette-neutral-800, #25252D))',
        secondary: 'var(--joy-palette-text-secondary, var(--joy-palette-neutral-600, #5A5A72))',
        tertiary: 'var(--joy-palette-text-tertiary, var(--joy-palette-neutral-500, #73738C))',
      },
      background: {
        body: 'var(--joy-palette-background-body, var(--joy-palette-common-white, #fff))',
        surface: 'var(--joy-palette-background-surface, var(--joy-palette-common-white, #fff))',
        popup: 'var(--joy-palette-background-popup, var(--joy-palette-common-white, #fff))',
        level1: 'var(--joy-palette-background-level1, var(--joy-palette-neutral-50, #F7F7F8))',
        level2: 'var(--joy-palette-background-level2, var(--joy-palette-neutral-100, #EBEBEF))',
        level3: 'var(--joy-palette-background-level3, var(--joy-palette-neutral-200, #D8D8DF))',
        tooltip: 'var(--joy-palette-background-tooltip, var(--joy-palette-neutral-800, #25252D))',
        backdrop: 'var(--joy-palette-background-backdrop, rgba(255 255 255 / 0.5))',
      },
      divider:
        'var(--joy-palette-divider, rgba(var(--joy-palette-neutral-mainChannel, 115 115 140) / 0.28))',
      focusVisible: 'var(--joy-palette-focusVisible, var(--joy-palette-primary-500, #73738C))',
    },
    shadowRing: 'var(--joy-shadowRing, 0 0 #000)',
    shadowChannel: 'var(--joy-shadowChannel, 187 187 187)',
  },
  variants: {
    plain: {
      primary: {
        '--variant-borderWidth': '0px',
        color: 'var(--joy-palette-primary-plainColor, var(--joy-palette-primary-600, #054DA7))',
      },
      neutral: {
        '--variant-borderWidth': '0px',
        color: 'var(--joy-palette-neutral-plainColor, var(--joy-palette-neutral-800, #25252D))',
      },
      danger: {
        '--variant-borderWidth': '0px',
        color: 'var(--joy-palette-danger-plainColor, var(--joy-palette-danger-600, #A10E25))',
      },
      info: {
        '--variant-borderWidth': '0px',
        color: 'var(--joy-palette-info-plainColor, var(--joy-palette-info-600, #5F35AE))',
      },
      success: {
        '--variant-borderWidth': '0px',
        color: 'var(--joy-palette-success-plainColor, var(--joy-palette-success-600, #0F5D26))',
      },
      warning: {
        '--variant-borderWidth': '0px',
        color: 'var(--joy-palette-warning-plainColor, var(--joy-palette-warning-800, #4D2D00))',
      },
      context: {
        '--variant-borderWidth': '0px',
        color: 'var(--variant-plainColor)',
      },
    },
    plainHover: {
      primary: {
        backgroundColor:
          'var(--joy-palette-primary-plainHoverBg, var(--joy-palette-primary-100, #DDF1FF))',
      },
      neutral: {
        color:
          'var(--joy-palette-neutral-plainHoverColor, var(--joy-palette-neutral-900, #131318))',
        backgroundColor:
          'var(--joy-palette-neutral-plainHoverBg, var(--joy-palette-neutral-100, #EBEBEF))',
      },
      danger: {
        backgroundColor:
          'var(--joy-palette-danger-plainHoverBg, var(--joy-palette-danger-100, #FFE9E8))',
      },
      info: {
        backgroundColor:
          'var(--joy-palette-info-plainHoverBg, var(--joy-palette-info-100, #F4EAFF))',
      },
      success: {
        backgroundColor:
          'var(--joy-palette-success-plainHoverBg, var(--joy-palette-success-100, #D7F5DD))',
      },
      warning: {
        backgroundColor:
          'var(--joy-palette-warning-plainHoverBg, var(--joy-palette-warning-50, #FFF8C5))',
      },
      context: {
        color: 'var(--variant-plainHoverColor)',
        backgroundColor: 'var(--variant-plainHoverBg)',
      },
    },
    plainActive: {
      primary: {
        backgroundColor:
          'var(--joy-palette-primary-plainActiveBg, var(--joy-palette-primary-200, #ADDBFF))',
      },
      neutral: {
        backgroundColor:
          'var(--joy-palette-neutral-plainActiveBg, var(--joy-palette-neutral-200, #D8D8DF))',
      },
      danger: {
        backgroundColor:
          'var(--joy-palette-danger-plainActiveBg, var(--joy-palette-danger-200, #FFC7C5))',
      },
      info: {
        backgroundColor:
          'var(--joy-palette-info-plainActiveBg, var(--joy-palette-info-200, #E1CBFF))',
      },
      success: {
        backgroundColor:
          'var(--joy-palette-success-plainActiveBg, var(--joy-palette-success-200, #77EC95))',
      },
      warning: {
        backgroundColor:
          'var(--joy-palette-warning-plainActiveBg, var(--joy-palette-warning-200, #EAC54F))',
      },
      context: {
        backgroundColor: 'var(--variant-plainActiveBg)',
      },
    },
    plainDisabled: {
      primary: {
        pointerEvents: 'none',
        cursor: 'default',
        color:
          'var(--joy-palette-primary-plainDisabledColor, var(--joy-palette-primary-200, #ADDBFF))',
      },
      neutral: {
        pointerEvents: 'none',
        cursor: 'default',
        color:
          'var(--joy-palette-neutral-plainDisabledColor, var(--joy-palette-neutral-300, #B9B9C6))',
      },
      danger: {
        pointerEvents: 'none',
        cursor: 'default',
        color:
          'var(--joy-palette-danger-plainDisabledColor, var(--joy-palette-danger-200, #FFC7C5))',
      },
      info: {
        pointerEvents: 'none',
        cursor: 'default',
        color: 'var(--joy-palette-info-plainDisabledColor, var(--joy-palette-info-200, #E1CBFF))',
      },
      success: {
        pointerEvents: 'none',
        cursor: 'default',
        color:
          'var(--joy-palette-success-plainDisabledColor, var(--joy-palette-success-200, #77EC95))',
      },
      warning: {
        pointerEvents: 'none',
        cursor: 'default',
        color:
          'var(--joy-palette-warning-plainDisabledColor, var(--joy-palette-warning-200, #EAC54F))',
      },
      context: {
        pointerEvents: 'none',
        cursor: 'default',
        color: 'var(--variant-plainDisabledColor)',
      },
    },
    outlined: {
      primary: {
        '--variant-borderWidth': '1px',
        color: 'var(--joy-palette-primary-outlinedColor, var(--joy-palette-primary-500, #096BDE))',
        border: 'var(--variant-borderWidth) solid',
        borderColor:
          'var(--joy-palette-primary-outlinedBorder, var(--joy-palette-primary-200, #ADDBFF))',
      },
      neutral: {
        '--variant-borderWidth': '1px',
        color: 'var(--joy-palette-neutral-outlinedColor, var(--joy-palette-neutral-800, #25252D))',
        border: 'var(--variant-borderWidth) solid',
        borderColor:
          'var(--joy-palette-neutral-outlinedBorder, var(--joy-palette-neutral-200, #D8D8DF))',
      },
      danger: {
        '--variant-borderWidth': '1px',
        color: 'var(--joy-palette-danger-outlinedColor, var(--joy-palette-danger-500, #D3232F))',
        border: 'var(--variant-borderWidth) solid',
        borderColor:
          'var(--joy-palette-danger-outlinedBorder, var(--joy-palette-danger-200, #FFC7C5))',
      },
      info: {
        '--variant-borderWidth': '1px',
        color: 'var(--joy-palette-info-outlinedColor, var(--joy-palette-info-500, #814DDE))',
        border: 'var(--variant-borderWidth) solid',
        borderColor: 'var(--joy-palette-info-outlinedBorder, var(--joy-palette-info-200, #E1CBFF))',
      },
      success: {
        '--variant-borderWidth': '1px',
        color: 'var(--joy-palette-success-outlinedColor, var(--joy-palette-success-500, #1A7D36))',
        border: 'var(--variant-borderWidth) solid',
        borderColor:
          'var(--joy-palette-success-outlinedBorder, var(--joy-palette-success-200, #77EC95))',
      },
      warning: {
        '--variant-borderWidth': '1px',
        color: 'var(--joy-palette-warning-outlinedColor, var(--joy-palette-warning-800, #4D2D00))',
        border: 'var(--variant-borderWidth) solid',
        borderColor:
          'var(--joy-palette-warning-outlinedBorder, var(--joy-palette-warning-200, #EAC54F))',
      },
      context: {
        '--variant-borderWidth': '1px',
        color: 'var(--variant-outlinedColor)',
        border: 'var(--variant-borderWidth) solid',
        borderColor: 'var(--variant-outlinedBorder)',
      },
    },
    outlinedHover: {
      primary: {
        backgroundColor:
          'var(--joy-palette-primary-outlinedHoverBg, var(--joy-palette-primary-100, #DDF1FF))',
        borderColor:
          'var(--joy-palette-primary-outlinedHoverBorder, var(--joy-palette-primary-300, #6FB6FF))',
      },
      neutral: {
        color:
          'var(--joy-palette-neutral-outlinedHoverColor, var(--joy-palette-neutral-900, #131318))',
        backgroundColor:
          'var(--joy-palette-neutral-outlinedHoverBg, var(--joy-palette-neutral-100, #EBEBEF))',
        borderColor:
          'var(--joy-palette-neutral-outlinedHoverBorder, var(--joy-palette-neutral-300, #B9B9C6))',
      },
      danger: {
        backgroundColor:
          'var(--joy-palette-danger-outlinedHoverBg, var(--joy-palette-danger-100, #FFE9E8))',
        borderColor:
          'var(--joy-palette-danger-outlinedHoverBorder, var(--joy-palette-danger-300, #FF9192))',
      },
      info: {
        backgroundColor:
          'var(--joy-palette-info-outlinedHoverBg, var(--joy-palette-info-100, #F4EAFF))',
        borderColor:
          'var(--joy-palette-info-outlinedHoverBorder, var(--joy-palette-info-300, #C69EFF))',
      },
      success: {
        backgroundColor:
          'var(--joy-palette-success-outlinedHoverBg, var(--joy-palette-success-100, #D7F5DD))',
        borderColor:
          'var(--joy-palette-success-outlinedHoverBorder, var(--joy-palette-success-300, #4CC76E))',
      },
      warning: {
        backgroundColor:
          'var(--joy-palette-warning-outlinedHoverBg, var(--joy-palette-warning-50, #FFF8C5))',
        borderColor:
          'var(--joy-palette-warning-outlinedHoverBorder, var(--joy-palette-warning-300, #D4A72C))',
      },
      context: {
        color: 'var(--variant-outlinedHoverColor)',
        borderColor: 'var(--variant-outlinedHoverBorder)',
        backgroundColor: 'var(--variant-outlinedHoverBg)',
      },
    },
    outlinedActive: {
      primary: {
        backgroundColor:
          'var(--joy-palette-primary-outlinedActiveBg, var(--joy-palette-primary-200, #ADDBFF))',
      },
      neutral: {
        backgroundColor:
          'var(--joy-palette-neutral-outlinedActiveBg, var(--joy-palette-neutral-200, #D8D8DF))',
      },
      danger: {
        backgroundColor:
          'var(--joy-palette-danger-outlinedActiveBg, var(--joy-palette-danger-200, #FFC7C5))',
      },
      info: {
        backgroundColor:
          'var(--joy-palette-info-outlinedActiveBg, var(--joy-palette-info-200, #E1CBFF))',
      },
      success: {
        backgroundColor:
          'var(--joy-palette-success-outlinedActiveBg, var(--joy-palette-success-200, #77EC95))',
      },
      warning: {
        backgroundColor:
          'var(--joy-palette-warning-outlinedActiveBg, var(--joy-palette-warning-200, #EAC54F))',
      },
      context: {
        backgroundColor: 'var(--variant-outlinedActiveBg)',
      },
    },
    outlinedDisabled: {
      primary: {
        pointerEvents: 'none',
        cursor: 'default',
        color:
          'var(--joy-palette-primary-outlinedDisabledColor, var(--joy-palette-primary-100, #DDF1FF))',
        borderColor:
          'var(--joy-palette-primary-outlinedDisabledBorder, var(--joy-palette-primary-100, #DDF1FF))',
      },
      neutral: {
        pointerEvents: 'none',
        cursor: 'default',
        color:
          'var(--joy-palette-neutral-outlinedDisabledColor, var(--joy-palette-neutral-300, #B9B9C6))',
        borderColor:
          'var(--joy-palette-neutral-outlinedDisabledBorder, var(--joy-palette-neutral-100, #EBEBEF))',
      },
      danger: {
        pointerEvents: 'none',
        cursor: 'default',
        color:
          'var(--joy-palette-danger-outlinedDisabledColor, var(--joy-palette-danger-100, #FFE9E8))',
        borderColor:
          'var(--joy-palette-danger-outlinedDisabledBorder, var(--joy-palette-danger-100, #FFE9E8))',
      },
      info: {
        pointerEvents: 'none',
        cursor: 'default',
        color:
          'var(--joy-palette-info-outlinedDisabledColor, var(--joy-palette-info-100, #F4EAFF))',
        borderColor:
          'var(--joy-palette-info-outlinedDisabledBorder, var(--joy-palette-info-100, #F4EAFF))',
      },
      success: {
        pointerEvents: 'none',
        cursor: 'default',
        color:
          'var(--joy-palette-success-outlinedDisabledColor, var(--joy-palette-success-100, #D7F5DD))',
        borderColor:
          'var(--joy-palette-success-outlinedDisabledBorder, var(--joy-palette-success-100, #D7F5DD))',
      },
      warning: {
        pointerEvents: 'none',
        cursor: 'default',
        color:
          'var(--joy-palette-warning-outlinedDisabledColor, var(--joy-palette-warning-100, #FAE17D))',
        borderColor:
          'var(--joy-palette-warning-outlinedDisabledBorder, var(--joy-palette-warning-100, #FAE17D))',
      },
      context: {
        pointerEvents: 'none',
        cursor: 'default',
        color: 'var(--variant-outlinedDisabledColor)',
        borderColor: 'var(--variant-outlinedDisabledBorder)',
      },
    },
    soft: {
      primary: {
        '--variant-borderWidth': '0px',
        color: 'var(--joy-palette-primary-softColor, var(--joy-palette-primary-600, #054DA7))',
        backgroundColor:
          'var(--joy-palette-primary-softBg, var(--joy-palette-primary-100, #DDF1FF))',
      },
      neutral: {
        '--variant-borderWidth': '0px',
        color: 'var(--joy-palette-neutral-softColor, var(--joy-palette-neutral-800, #25252D))',
        backgroundColor:
          'var(--joy-palette-neutral-softBg, var(--joy-palette-neutral-100, #EBEBEF))',
      },
      danger: {
        '--variant-borderWidth': '0px',
        color: 'var(--joy-palette-danger-softColor, var(--joy-palette-danger-600, #A10E25))',
        backgroundColor: 'var(--joy-palette-danger-softBg, var(--joy-palette-danger-100, #FFE9E8))',
      },
      info: {
        '--variant-borderWidth': '0px',
        color: 'var(--joy-palette-info-softColor, var(--joy-palette-info-600, #5F35AE))',
        backgroundColor: 'var(--joy-palette-info-softBg, var(--joy-palette-info-100, #F4EAFF))',
      },
      success: {
        '--variant-borderWidth': '0px',
        color: 'var(--joy-palette-success-softColor, var(--joy-palette-success-600, #0F5D26))',
        backgroundColor:
          'var(--joy-palette-success-softBg, var(--joy-palette-success-100, #D7F5DD))',
      },
      warning: {
        '--variant-borderWidth': '0px',
        color: 'var(--joy-palette-warning-softColor, var(--joy-palette-warning-800, #4D2D00))',
        backgroundColor:
          'var(--joy-palette-warning-softBg, var(--joy-palette-warning-50, #FFF8C5))',
      },
      context: {
        '--variant-borderWidth': '0px',
        color: 'var(--variant-softColor)',
        backgroundColor: 'var(--variant-softBg)',
      },
    },
    softHover: {
      primary: {
        backgroundColor:
          'var(--joy-palette-primary-softHoverBg, var(--joy-palette-primary-200, #ADDBFF))',
      },
      neutral: {
        color: 'var(--joy-palette-neutral-softHoverColor, var(--joy-palette-neutral-900, #131318))',
        backgroundColor:
          'var(--joy-palette-neutral-softHoverBg, var(--joy-palette-neutral-200, #D8D8DF))',
      },
      danger: {
        backgroundColor:
          'var(--joy-palette-danger-softHoverBg, var(--joy-palette-danger-200, #FFC7C5))',
      },
      info: {
        backgroundColor:
          'var(--joy-palette-info-softHoverBg, var(--joy-palette-info-200, #E1CBFF))',
      },
      success: {
        backgroundColor:
          'var(--joy-palette-success-softHoverBg, var(--joy-palette-success-200, #77EC95))',
      },
      warning: {
        backgroundColor:
          'var(--joy-palette-warning-softHoverBg, var(--joy-palette-warning-100, #FAE17D))',
      },
      context: {
        color: 'var(--variant-softHoverColor)',
        backgroundColor: 'var(--variant-softHoverBg)',
      },
    },
    softActive: {
      primary: {
        backgroundColor:
          'var(--joy-palette-primary-softActiveBg, var(--joy-palette-primary-300, #6FB6FF))',
      },
      neutral: {
        backgroundColor:
          'var(--joy-palette-neutral-softActiveBg, var(--joy-palette-neutral-300, #B9B9C6))',
      },
      danger: {
        backgroundColor:
          'var(--joy-palette-danger-softActiveBg, var(--joy-palette-danger-300, #FF9192))',
      },
      info: {
        backgroundColor:
          'var(--joy-palette-info-softActiveBg, var(--joy-palette-info-300, #C69EFF))',
      },
      success: {
        backgroundColor:
          'var(--joy-palette-success-softActiveBg, var(--joy-palette-success-300, #4CC76E))',
      },
      warning: {
        backgroundColor:
          'var(--joy-palette-warning-softActiveBg, var(--joy-palette-warning-200, #EAC54F))',
      },
      context: {
        backgroundColor: 'var(--variant-softActiveBg)',
      },
    },
    softDisabled: {
      primary: {
        pointerEvents: 'none',
        cursor: 'default',
        color:
          'var(--joy-palette-primary-softDisabledColor, var(--joy-palette-primary-300, #6FB6FF))',
        backgroundColor:
          'var(--joy-palette-primary-softDisabledBg, var(--joy-palette-primary-50, #F4FAFF))',
      },
      neutral: {
        pointerEvents: 'none',
        cursor: 'default',
        color:
          'var(--joy-palette-neutral-softDisabledColor, var(--joy-palette-neutral-300, #B9B9C6))',
        backgroundColor:
          'var(--joy-palette-neutral-softDisabledBg, var(--joy-palette-neutral-50, #F7F7F8))',
      },
      danger: {
        pointerEvents: 'none',
        cursor: 'default',
        color:
          'var(--joy-palette-danger-softDisabledColor, var(--joy-palette-danger-300, #FF9192))',
        backgroundColor:
          'var(--joy-palette-danger-softDisabledBg, var(--joy-palette-danger-50, #FFF8F6))',
      },
      info: {
        pointerEvents: 'none',
        cursor: 'default',
        color: 'var(--joy-palette-info-softDisabledColor, var(--joy-palette-info-300, #C69EFF))',
        backgroundColor:
          'var(--joy-palette-info-softDisabledBg, var(--joy-palette-info-50, #FDF7FF))',
      },
      success: {
        pointerEvents: 'none',
        cursor: 'default',
        color:
          'var(--joy-palette-success-softDisabledColor, var(--joy-palette-success-300, #4CC76E))',
        backgroundColor:
          'var(--joy-palette-success-softDisabledBg, var(--joy-palette-success-50, #F3FEF5))',
      },
      warning: {
        pointerEvents: 'none',
        cursor: 'default',
        color:
          'var(--joy-palette-warning-softDisabledColor, var(--joy-palette-warning-200, #EAC54F))',
        backgroundColor:
          'var(--joy-palette-warning-softDisabledBg, var(--joy-palette-warning-50, #FFF8C5))',
      },
      context: {
        pointerEvents: 'none',
        cursor: 'default',
        color: 'var(--variant-softDisabledColor)',
        backgroundColor: 'var(--variant-softDisabledBg)',
      },
    },
    solid: {
      primary: {
        '--variant-borderWidth': '0px',
        color: 'var(--joy-palette-primary-solidColor, #fff)',
        backgroundColor: 'var(--joy-palette-primary-solidBg, var(--palette-primary-500, #096BDE))',
      },
      neutral: {
        '--variant-borderWidth': '0px',
        color: 'var(--joy-palette-neutral-solidColor, var(--joy-palette-common-white, #fff))',
        backgroundColor:
          'var(--joy-palette-neutral-solidBg, var(--joy-palette-neutral-600, #5A5A72))',
      },
      danger: {
        '--variant-borderWidth': '0px',
        color: 'var(--joy-palette-danger-solidColor, #fff)',
        backgroundColor: 'var(--joy-palette-danger-solidBg, var(--palette-danger-500, #D3232F))',
      },
      info: {
        '--variant-borderWidth': '0px',
        color: 'var(--joy-palette-info-solidColor, #fff)',
        backgroundColor: 'var(--joy-palette-info-solidBg, var(--palette-info-500, #814DDE))',
      },
      success: {
        '--variant-borderWidth': '0px',
        color: 'var(--joy-palette-success-solidColor, #fff)',
        backgroundColor: 'var(--joy-palette-success-solidBg, var(--palette-success-500, #1A7D36))',
      },
      warning: {
        '--variant-borderWidth': '0px',
        color: 'var(--joy-palette-warning-solidColor, var(--joy-palette-warning-800, #4D2D00))',
        backgroundColor:
          'var(--joy-palette-warning-solidBg, var(--joy-palette-warning-200, #EAC54F))',
      },
      context: {
        '--variant-borderWidth': '0px',
        color: 'var(--variant-solidColor)',
        backgroundColor: 'var(--variant-solidBg)',
      },
    },
    solidHover: {
      primary: {
        backgroundColor:
          'var(--joy-palette-primary-solidHoverBg, var(--palette-primary-600, #054DA7))',
      },
      neutral: {
        backgroundColor:
          'var(--joy-palette-neutral-solidHoverBg, var(--joy-palette-neutral-700, #434356))',
      },
      danger: {
        backgroundColor:
          'var(--joy-palette-danger-solidHoverBg, var(--palette-danger-600, #A10E25))',
      },
      info: {
        backgroundColor: 'var(--joy-palette-info-solidHoverBg, var(--palette-info-600, #5F35AE))',
      },
      success: {
        backgroundColor:
          'var(--joy-palette-success-solidHoverBg, var(--palette-success-600, #0F5D26))',
      },
      warning: {
        backgroundColor:
          'var(--joy-palette-warning-solidHoverBg, var(--joy-palette-warning-300, #D4A72C))',
      },
      context: {
        color: 'var(--variant-solidHoverColor)',
        backgroundColor: 'var(--variant-solidHoverBg)',
      },
    },
    solidActive: {
      primary: {
        backgroundColor:
          'var(--joy-palette-primary-solidActiveBg, var(--palette-primary-700, #02367D))',
      },
      neutral: {
        backgroundColor:
          'var(--joy-palette-neutral-solidActiveBg, var(--joy-palette-neutral-800, #25252D))',
      },
      danger: {
        backgroundColor:
          'var(--joy-palette-danger-solidActiveBg, var(--palette-danger-700, #77061B))',
      },
      info: {
        backgroundColor: 'var(--joy-palette-info-solidActiveBg, var(--palette-info-700, #452382))',
      },
      success: {
        backgroundColor:
          'var(--joy-palette-success-solidActiveBg, var(--palette-success-700, #034318))',
      },
      warning: {
        backgroundColor:
          'var(--joy-palette-warning-solidActiveBg, var(--joy-palette-warning-400, #BF8700))',
      },
      context: {
        backgroundColor: 'var(--variant-solidActiveBg)',
      },
    },
    solidDisabled: {
      primary: {
        pointerEvents: 'none',
        cursor: 'default',
        color: 'var(--joy-palette-primary-solidDisabledColor, #fff)',
        backgroundColor:
          'var(--joy-palette-primary-solidDisabledBg, var(--palette-primary-200, #ADDBFF))',
      },
      neutral: {
        pointerEvents: 'none',
        cursor: 'default',
        color:
          'var(--joy-palette-neutral-solidDisabledColor, var(--joy-palette-neutral-300, #B9B9C6))',
        backgroundColor:
          'var(--joy-palette-neutral-solidDisabledBg, var(--joy-palette-neutral-50, #F7F7F8))',
      },
      danger: {
        pointerEvents: 'none',
        cursor: 'default',
        color: 'var(--joy-palette-danger-solidDisabledColor, #fff)',
        backgroundColor:
          'var(--joy-palette-danger-solidDisabledBg, var(--palette-danger-200, #FFC7C5))',
      },
      info: {
        pointerEvents: 'none',
        cursor: 'default',
        color: 'var(--joy-palette-info-solidDisabledColor, #fff)',
        backgroundColor:
          'var(--joy-palette-info-solidDisabledBg, var(--palette-info-200, #E1CBFF))',
      },
      success: {
        pointerEvents: 'none',
        cursor: 'default',
        color: 'var(--joy-palette-success-solidDisabledColor, #fff)',
        backgroundColor:
          'var(--joy-palette-success-solidDisabledBg, var(--palette-success-200, #77EC95))',
      },
      warning: {
        pointerEvents: 'none',
        cursor: 'default',
        color:
          'var(--joy-palette-warning-solidDisabledColor, var(--joy-palette-warning-200, #EAC54F))',
        backgroundColor:
          'var(--joy-palette-warning-solidDisabledBg, var(--joy-palette-warning-50, #FFF8C5))',
      },
      context: {
        pointerEvents: 'none',
        cursor: 'default',
        color: 'var(--variant-solidDisabledColor)',
        backgroundColor: 'var(--variant-solidDisabledBg)',
      },
    },
  },
  palette: {
    mode: 'light',
    primary: {
      '50': '#F4FAFF',
      '100': '#DDF1FF',
      '200': '#ADDBFF',
      '300': '#6FB6FF',
      '400': '#3990FF',
      '500': '#096BDE',
      '600': '#054DA7',
      '700': '#02367D',
      '800': '#072859',
      '900': '#00153C',
      plainColor: 'var(--joy-palette-primary-600, #054DA7)',
      plainHoverBg: 'var(--joy-palette-primary-100, #DDF1FF)',
      plainActiveBg: 'var(--joy-palette-primary-200, #ADDBFF)',
      plainDisabledColor: 'var(--joy-palette-primary-200, #ADDBFF)',
      outlinedColor: 'var(--joy-palette-primary-500, #096BDE)',
      outlinedBorder: 'var(--joy-palette-primary-200, #ADDBFF)',
      outlinedHoverBg: 'var(--joy-palette-primary-100, #DDF1FF)',
      outlinedHoverBorder: 'var(--joy-palette-primary-300, #6FB6FF)',
      outlinedActiveBg: 'var(--joy-palette-primary-200, #ADDBFF)',
      outlinedDisabledColor: 'var(--joy-palette-primary-100, #DDF1FF)',
      outlinedDisabledBorder: 'var(--joy-palette-primary-100, #DDF1FF)',
      softColor: 'var(--joy-palette-primary-600, #054DA7)',
      softBg: 'var(--joy-palette-primary-100, #DDF1FF)',
      softHoverBg: 'var(--joy-palette-primary-200, #ADDBFF)',
      softActiveBg: 'var(--joy-palette-primary-300, #6FB6FF)',
      softDisabledColor: 'var(--joy-palette-primary-300, #6FB6FF)',
      softDisabledBg: 'var(--joy-palette-primary-50, #F4FAFF)',
      solidColor: '#fff',
      solidBg: 'var(--palette-primary-500, #096BDE)',
      solidHoverBg: 'var(--palette-primary-600, #054DA7)',
      solidActiveBg: 'var(--palette-primary-700, #02367D)',
      solidDisabledColor: '#fff',
      solidDisabledBg: 'var(--palette-primary-200, #ADDBFF)',
      mainChannel: '9 107 222',
      lightChannel: '173 219 255',
      darkChannel: '7 40 89',
    },
    neutral: {
      '50': '#F7F7F8',
      '100': '#EBEBEF',
      '200': '#D8D8DF',
      '300': '#B9B9C6',
      '400': '#8F8FA3',
      '500': '#73738C',
      '600': '#5A5A72',
      '700': '#434356',
      '800': '#25252D',
      '900': '#131318',
      plainColor: 'var(--joy-palette-neutral-800, #25252D)',
      plainHoverColor: 'var(--joy-palette-neutral-900, #131318)',
      plainHoverBg: 'var(--joy-palette-neutral-100, #EBEBEF)',
      plainActiveBg: 'var(--joy-palette-neutral-200, #D8D8DF)',
      plainDisabledColor: 'var(--joy-palette-neutral-300, #B9B9C6)',
      outlinedColor: 'var(--joy-palette-neutral-800, #25252D)',
      outlinedBorder: 'var(--joy-palette-neutral-200, #D8D8DF)',
      outlinedHoverColor: 'var(--joy-palette-neutral-900, #131318)',
      outlinedHoverBg: 'var(--joy-palette-neutral-100, #EBEBEF)',
      outlinedHoverBorder: 'var(--joy-palette-neutral-300, #B9B9C6)',
      outlinedActiveBg: 'var(--joy-palette-neutral-200, #D8D8DF)',
      outlinedDisabledColor: 'var(--joy-palette-neutral-300, #B9B9C6)',
      outlinedDisabledBorder: 'var(--joy-palette-neutral-100, #EBEBEF)',
      softColor: 'var(--joy-palette-neutral-800, #25252D)',
      softBg: 'var(--joy-palette-neutral-100, #EBEBEF)',
      softHoverColor: 'var(--joy-palette-neutral-900, #131318)',
      softHoverBg: 'var(--joy-palette-neutral-200, #D8D8DF)',
      softActiveBg: 'var(--joy-palette-neutral-300, #B9B9C6)',
      softDisabledColor: 'var(--joy-palette-neutral-300, #B9B9C6)',
      softDisabledBg: 'var(--joy-palette-neutral-50, #F7F7F8)',
      solidColor: 'var(--joy-palette-common-white, #fff)',
      solidBg: 'var(--joy-palette-neutral-600, #5A5A72)',
      solidHoverBg: 'var(--joy-palette-neutral-700, #434356)',
      solidActiveBg: 'var(--joy-palette-neutral-800, #25252D)',
      solidDisabledColor: 'var(--joy-palette-neutral-300, #B9B9C6)',
      solidDisabledBg: 'var(--joy-palette-neutral-50, #F7F7F8)',
      mainChannel: '115 115 140',
      lightChannel: '216 216 223',
      darkChannel: '37 37 45',
    },
    danger: {
      '50': '#FFF8F6',
      '100': '#FFE9E8',
      '200': '#FFC7C5',
      '300': '#FF9192',
      '400': '#FA5255',
      '500': '#D3232F',
      '600': '#A10E25',
      '700': '#77061B',
      '800': '#580013',
      '900': '#39000D',
      plainColor: 'var(--joy-palette-danger-600, #A10E25)',
      plainHoverBg: 'var(--joy-palette-danger-100, #FFE9E8)',
      plainActiveBg: 'var(--joy-palette-danger-200, #FFC7C5)',
      plainDisabledColor: 'var(--joy-palette-danger-200, #FFC7C5)',
      outlinedColor: 'var(--joy-palette-danger-500, #D3232F)',
      outlinedBorder: 'var(--joy-palette-danger-200, #FFC7C5)',
      outlinedHoverBg: 'var(--joy-palette-danger-100, #FFE9E8)',
      outlinedHoverBorder: 'var(--joy-palette-danger-300, #FF9192)',
      outlinedActiveBg: 'var(--joy-palette-danger-200, #FFC7C5)',
      outlinedDisabledColor: 'var(--joy-palette-danger-100, #FFE9E8)',
      outlinedDisabledBorder: 'var(--joy-palette-danger-100, #FFE9E8)',
      softColor: 'var(--joy-palette-danger-600, #A10E25)',
      softBg: 'var(--joy-palette-danger-100, #FFE9E8)',
      softHoverBg: 'var(--joy-palette-danger-200, #FFC7C5)',
      softActiveBg: 'var(--joy-palette-danger-300, #FF9192)',
      softDisabledColor: 'var(--joy-palette-danger-300, #FF9192)',
      softDisabledBg: 'var(--joy-palette-danger-50, #FFF8F6)',
      solidColor: '#fff',
      solidBg: 'var(--palette-danger-500, #D3232F)',
      solidHoverBg: 'var(--palette-danger-600, #A10E25)',
      solidActiveBg: 'var(--palette-danger-700, #77061B)',
      solidDisabledColor: '#fff',
      solidDisabledBg: 'var(--palette-danger-200, #FFC7C5)',
      mainChannel: '211 35 47',
      lightChannel: '255 199 197',
      darkChannel: '88 0 19',
    },
    info: {
      '50': '#FDF7FF',
      '100': '#F4EAFF',
      '200': '#E1CBFF',
      '300': '#C69EFF',
      '400': '#A374F9',
      '500': '#814DDE',
      '600': '#5F35AE',
      '700': '#452382',
      '800': '#301761',
      '900': '#1D0A42',
      plainColor: 'var(--joy-palette-info-600, #5F35AE)',
      plainHoverBg: 'var(--joy-palette-info-100, #F4EAFF)',
      plainActiveBg: 'var(--joy-palette-info-200, #E1CBFF)',
      plainDisabledColor: 'var(--joy-palette-info-200, #E1CBFF)',
      outlinedColor: 'var(--joy-palette-info-500, #814DDE)',
      outlinedBorder: 'var(--joy-palette-info-200, #E1CBFF)',
      outlinedHoverBg: 'var(--joy-palette-info-100, #F4EAFF)',
      outlinedHoverBorder: 'var(--joy-palette-info-300, #C69EFF)',
      outlinedActiveBg: 'var(--joy-palette-info-200, #E1CBFF)',
      outlinedDisabledColor: 'var(--joy-palette-info-100, #F4EAFF)',
      outlinedDisabledBorder: 'var(--joy-palette-info-100, #F4EAFF)',
      softColor: 'var(--joy-palette-info-600, #5F35AE)',
      softBg: 'var(--joy-palette-info-100, #F4EAFF)',
      softHoverBg: 'var(--joy-palette-info-200, #E1CBFF)',
      softActiveBg: 'var(--joy-palette-info-300, #C69EFF)',
      softDisabledColor: 'var(--joy-palette-info-300, #C69EFF)',
      softDisabledBg: 'var(--joy-palette-info-50, #FDF7FF)',
      solidColor: '#fff',
      solidBg: 'var(--palette-info-500, #814DDE)',
      solidHoverBg: 'var(--palette-info-600, #5F35AE)',
      solidActiveBg: 'var(--palette-info-700, #452382)',
      solidDisabledColor: '#fff',
      solidDisabledBg: 'var(--palette-info-200, #E1CBFF)',
      mainChannel: '129 77 222',
      lightChannel: '225 203 255',
      darkChannel: '48 23 97',
    },
    success: {
      '50': '#F3FEF5',
      '100': '#D7F5DD',
      '200': '#77EC95',
      '300': '#4CC76E',
      '400': '#2CA24D',
      '500': '#1A7D36',
      '600': '#0F5D26',
      '700': '#034318',
      '800': '#002F0F',
      '900': '#001D09',
      plainColor: 'var(--joy-palette-success-600, #0F5D26)',
      plainHoverBg: 'var(--joy-palette-success-100, #D7F5DD)',
      plainActiveBg: 'var(--joy-palette-success-200, #77EC95)',
      plainDisabledColor: 'var(--joy-palette-success-200, #77EC95)',
      outlinedColor: 'var(--joy-palette-success-500, #1A7D36)',
      outlinedBorder: 'var(--joy-palette-success-200, #77EC95)',
      outlinedHoverBg: 'var(--joy-palette-success-100, #D7F5DD)',
      outlinedHoverBorder: 'var(--joy-palette-success-300, #4CC76E)',
      outlinedActiveBg: 'var(--joy-palette-success-200, #77EC95)',
      outlinedDisabledColor: 'var(--joy-palette-success-100, #D7F5DD)',
      outlinedDisabledBorder: 'var(--joy-palette-success-100, #D7F5DD)',
      softColor: 'var(--joy-palette-success-600, #0F5D26)',
      softBg: 'var(--joy-palette-success-100, #D7F5DD)',
      softHoverBg: 'var(--joy-palette-success-200, #77EC95)',
      softActiveBg: 'var(--joy-palette-success-300, #4CC76E)',
      softDisabledColor: 'var(--joy-palette-success-300, #4CC76E)',
      softDisabledBg: 'var(--joy-palette-success-50, #F3FEF5)',
      solidColor: '#fff',
      solidBg: 'var(--palette-success-500, #1A7D36)',
      solidHoverBg: 'var(--palette-success-600, #0F5D26)',
      solidActiveBg: 'var(--palette-success-700, #034318)',
      solidDisabledColor: '#fff',
      solidDisabledBg: 'var(--palette-success-200, #77EC95)',
      mainChannel: '26 125 54',
      lightChannel: '119 236 149',
      darkChannel: '0 47 15',
    },
    warning: {
      '50': '#FFF8C5',
      '100': '#FAE17D',
      '200': '#EAC54F',
      '300': '#D4A72C',
      '400': '#BF8700',
      '500': '#9A6700',
      '600': '#7D4E00',
      '700': '#633C01',
      '800': '#4D2D00',
      '900': '#3B2300',
      plainColor: 'var(--joy-palette-warning-800, #4D2D00)',
      plainHoverBg: 'var(--joy-palette-warning-50, #FFF8C5)',
      plainActiveBg: 'var(--joy-palette-warning-200, #EAC54F)',
      plainDisabledColor: 'var(--joy-palette-warning-200, #EAC54F)',
      outlinedColor: 'var(--joy-palette-warning-800, #4D2D00)',
      outlinedBorder: 'var(--joy-palette-warning-200, #EAC54F)',
      outlinedHoverBg: 'var(--joy-palette-warning-50, #FFF8C5)',
      outlinedHoverBorder: 'var(--joy-palette-warning-300, #D4A72C)',
      outlinedActiveBg: 'var(--joy-palette-warning-200, #EAC54F)',
      outlinedDisabledColor: 'var(--joy-palette-warning-100, #FAE17D)',
      outlinedDisabledBorder: 'var(--joy-palette-warning-100, #FAE17D)',
      softColor: 'var(--joy-palette-warning-800, #4D2D00)',
      softBg: 'var(--joy-palette-warning-50, #FFF8C5)',
      softHoverBg: 'var(--joy-palette-warning-100, #FAE17D)',
      softActiveBg: 'var(--joy-palette-warning-200, #EAC54F)',
      softDisabledColor: 'var(--joy-palette-warning-200, #EAC54F)',
      softDisabledBg: 'var(--joy-palette-warning-50, #FFF8C5)',
      solidColor: 'var(--joy-palette-warning-800, #4D2D00)',
      solidBg: 'var(--joy-palette-warning-200, #EAC54F)',
      solidHoverBg: 'var(--joy-palette-warning-300, #D4A72C)',
      solidActiveBg: 'var(--joy-palette-warning-400, #BF8700)',
      solidDisabledColor: 'var(--joy-palette-warning-200, #EAC54F)',
      solidDisabledBg: 'var(--joy-palette-warning-50, #FFF8C5)',
      mainChannel: '154 103 0',
      lightChannel: '234 197 79',
      darkChannel: '77 45 0',
    },
    common: {
      white: '#FFF',
      black: '#09090D',
    },
    text: {
      primary: 'var(--joy-palette-neutral-800, #25252D)',
      secondary: 'var(--joy-palette-neutral-600, #5A5A72)',
      tertiary: 'var(--joy-palette-neutral-500, #73738C)',
    },
    background: {
      body: 'var(--joy-palette-common-white, #fff)',
      surface: 'var(--joy-palette-common-white, #fff)',
      popup: 'var(--joy-palette-common-white, #fff)',
      level1: 'var(--joy-palette-neutral-50, #F7F7F8)',
      level2: 'var(--joy-palette-neutral-100, #EBEBEF)',
      level3: 'var(--joy-palette-neutral-200, #D8D8DF)',
      tooltip: 'var(--joy-palette-neutral-800, #25252D)',
      backdrop: 'rgba(255 255 255 / 0.5)',
    },
    divider: 'rgba(var(--joy-palette-neutral-mainChannel, 115 115 140) / 0.28)',
    focusVisible: 'var(--joy-palette-primary-500, #73738C)',
    colorScheme: 'light',
  },
  colorInversion: {
    soft: {
      primary: {
        '--Badge-ringColor':
          'var(--joy-palette-primary-softBg, var(--joy-palette-primary-900, #00153C))',
        '--joy-shadowChannel': 'var(--joy-palette-primary-darkChannel, 7 40 89)',
        '&[data-joy-color-scheme="dark"], [data-joy-color-scheme="dark"] &': {
          '--joy-palette-focusVisible': 'var(--joy-palette-primary-300, #6FB6FF)',
          '--joy-palette-background-body':
            'rgba(var(--joy-palette-primary-mainChannel, 57 144 255) / 0.1)',
          '--joy-palette-background-surface':
            'rgba(var(--joy-palette-primary-mainChannel, 57 144 255) / 0.08)',
          '--joy-palette-background-level1':
            'rgba(var(--joy-palette-primary-mainChannel, 57 144 255) / 0.2)',
          '--joy-palette-background-level2':
            'rgba(var(--joy-palette-primary-mainChannel, 57 144 255) / 0.4)',
          '--joy-palette-background-level3':
            'rgba(var(--joy-palette-primary-mainChannel, 57 144 255) / 0.6)',
          '--joy-palette-text-primary': 'var(--joy-palette-primary-100, #DDF1FF)',
          '--joy-palette-text-secondary':
            'rgba(var(--joy-palette-primary-lightChannel, 173 219 255) / 0.72)',
          '--joy-palette-text-tertiary':
            'rgba(var(--joy-palette-primary-lightChannel, 173 219 255) / 0.6)',
          '--joy-palette-divider':
            'rgba(var(--joy-palette-primary-lightChannel, 173 219 255) / 0.2)',
          '--variant-plainColor': 'rgba(var(--joy-palette-primary-lightChannel, 173 219 255) / 1)',
          '--variant-plainHoverColor': 'var(--joy-palette-primary-50, #F4FAFF)',
          '--variant-plainHoverBg':
            'rgba(var(--joy-palette-primary-mainChannel, 57 144 255) / 0.16)',
          '--variant-plainActiveBg':
            'rgba(var(--joy-palette-primary-mainChannel, 57 144 255) / 0.32)',
          '--variant-plainDisabledColor':
            'rgba(var(--joy-palette-primary-mainChannel, 57 144 255) / 0.72)',
          '--variant-outlinedColor':
            'rgba(var(--joy-palette-primary-lightChannel, 173 219 255) / 1)',
          '--variant-outlinedHoverColor': 'var(--joy-palette-primary-50, #F4FAFF)',
          '--variant-outlinedBg': 'initial',
          '--variant-outlinedBorder':
            'rgba(var(--joy-palette-primary-mainChannel, 57 144 255) / 0.4)',
          '--variant-outlinedHoverBorder': 'var(--joy-palette-primary-600, #054DA7)',
          '--variant-outlinedHoverBg':
            'rgba(var(--joy-palette-primary-mainChannel, 57 144 255) / 0.16)',
          '--variant-outlinedActiveBg':
            'rgba(var(--joy-palette-primary-mainChannel, 57 144 255) / 0.32)',
          '--variant-outlinedDisabledColor':
            'rgba(var(--joy-palette-primary-mainChannel, 57 144 255) / 0.72)',
          '--variant-outlinedDisabledBorder':
            'rgba(var(--joy-palette-primary-mainChannel, 57 144 255) / 0.2)',
          '--variant-softColor': 'var(--joy-palette-primary-100, #DDF1FF)',
          '--variant-softBg': 'rgba(var(--joy-palette-primary-mainChannel, 57 144 255) / 0.24)',
          '--variant-softHoverColor': '#fff',
          '--variant-softHoverBg':
            'rgba(var(--joy-palette-primary-mainChannel, 57 144 255) / 0.32)',
          '--variant-softActiveBg':
            'rgba(var(--joy-palette-primary-mainChannel, 57 144 255) / 0.48)',
          '--variant-softDisabledColor':
            'rgba(var(--joy-palette-primary-mainChannel, 57 144 255) / 0.72)',
          '--variant-softDisabledBg':
            'rgba(var(--joy-palette-primary-mainChannel, 57 144 255) / 0.12)',
          '--variant-solidColor': '#fff',
          '--variant-solidBg': 'var(--joy-palette-primary-500, #096BDE)',
          '--variant-solidHoverColor': '#fff',
          '--variant-solidHoverBg': 'var(--joy-palette-primary-400, #3990FF)',
          '--variant-solidActiveBg': 'var(--joy-palette-primary-400, #3990FF)',
          '--variant-solidDisabledColor':
            'rgba(var(--joy-palette-primary-mainChannel, 57 144 255) / 0.72)',
          '--variant-solidDisabledBg':
            'rgba(var(--joy-palette-primary-mainChannel, 57 144 255) / 0.12)',
        },
        '&': {
          '--joy-palette-focusVisible': 'var(--joy-palette-primary-500, #096BDE)',
          '--joy-palette-background-body':
            'rgba(var(--joy-palette-primary-mainChannel, 9 107 222) / 0.1)',
          '--joy-palette-background-surface':
            'rgba(var(--joy-palette-primary-mainChannel, 9 107 222) / 0.08)',
          '--joy-palette-background-level1':
            'rgba(var(--joy-palette-primary-mainChannel, 9 107 222) / 0.2)',
          '--joy-palette-background-level2':
            'rgba(var(--joy-palette-primary-mainChannel, 9 107 222) / 0.32)',
          '--joy-palette-background-level3':
            'rgba(var(--joy-palette-primary-mainChannel, 9 107 222) / 0.48)',
          '--joy-palette-text-primary': 'var(--joy-palette-primary-700, #02367D)',
          '--joy-palette-text-secondary':
            'rgba(var(--joy-palette-primary-darkChannel, 7 40 89) / 0.8)',
          '--joy-palette-text-tertiary':
            'rgba(var(--joy-palette-primary-darkChannel, 7 40 89) / 0.68)',
          '--joy-palette-divider': 'rgba(var(--joy-palette-primary-mainChannel, 9 107 222) / 0.32)',
          '--variant-plainColor': 'rgba(var(--joy-palette-primary-darkChannel, 7 40 89) / 0.8)',
          '--variant-plainHoverColor': 'rgba(var(--joy-palette-primary-darkChannel, 7 40 89) / 1)',
          '--variant-plainHoverBg':
            'rgba(var(--joy-palette-primary-mainChannel, 9 107 222) / 0.12)',
          '--variant-plainActiveBg':
            'rgba(var(--joy-palette-primary-mainChannel, 9 107 222) / 0.24)',
          '--variant-plainDisabledColor':
            'rgba(var(--joy-palette-primary-mainChannel, 9 107 222) / 0.6)',
          '--variant-outlinedColor': 'rgba(var(--joy-palette-primary-mainChannel, 9 107 222) / 1)',
          '--variant-outlinedBorder':
            'rgba(var(--joy-palette-primary-mainChannel, 9 107 222) / 0.4)',
          '--variant-outlinedHoverColor': 'var(--joy-palette-primary-600, #054DA7)',
          '--variant-outlinedHoverBorder': 'var(--joy-palette-primary-300, #6FB6FF)',
          '--variant-outlinedHoverBg':
            'rgba(var(--joy-palette-primary-mainChannel, 9 107 222) / 0.12)',
          '--variant-outlinedActiveBg':
            'rgba(var(--joy-palette-primary-mainChannel, 9 107 222) / 0.24)',
          '--variant-outlinedDisabledColor':
            'rgba(var(--joy-palette-primary-mainChannel, 9 107 222) / 0.6)',
          '--variant-outlinedDisabledBorder':
            'rgba(var(--joy-palette-primary-mainChannel, 9 107 222) / 0.12)',
          '--variant-softColor': 'var(--joy-palette-primary-600, #054DA7)',
          '--variant-softBg': 'rgba(var(--joy-palette-primary-lightChannel, 173 219 255) / 0.72)',
          '--variant-softHoverColor': 'var(--joy-palette-primary-700, #02367D)',
          '--variant-softHoverBg': 'var(--joy-palette-primary-200, #ADDBFF)',
          '--variant-softActiveBg': 'var(--joy-palette-primary-300, #6FB6FF)',
          '--variant-softDisabledColor':
            'rgba(var(--joy-palette-primary-mainChannel, 9 107 222) / 0.6)',
          '--variant-softDisabledBg':
            'rgba(var(--joy-palette-primary-mainChannel, 9 107 222) / 0.08)',
          '--variant-solidColor': '#fff',
          '--variant-solidBg': 'var(--joy-palette-primary-600, #054DA7)',
          '--variant-solidHoverColor': '#fff',
          '--variant-solidHoverBg': 'var(--joy-palette-primary-500, #096BDE)',
          '--variant-solidActiveBg': 'var(--joy-palette-primary-500, #096BDE)',
          '--variant-solidDisabledColor': 'rgba(palette-primary-mainChannel, 9 107 222) / 6)',
          '--variant-solidDisabledBg':
            'rgba(var(--joy-palette-primary-mainChannel, 9 107 222) / 0.08)',
        },
      },
      neutral: {
        '--Badge-ringColor':
          'var(--joy-palette-neutral-softBg, var(--joy-palette-neutral-800, #25252D))',
        '--joy-shadowChannel': 'var(--joy-palette-neutral-darkChannel, 37 37 45)',
        '&[data-joy-color-scheme="dark"], [data-joy-color-scheme="dark"] &': {
          '--joy-palette-focusVisible': 'var(--joy-palette-neutral-300, #B9B9C6)',
          '--joy-palette-background-body':
            'rgba(var(--joy-palette-neutral-mainChannel, 143 143 163) / 0.1)',
          '--joy-palette-background-surface':
            'rgba(var(--joy-palette-neutral-mainChannel, 143 143 163) / 0.08)',
          '--joy-palette-background-level1':
            'rgba(var(--joy-palette-neutral-mainChannel, 143 143 163) / 0.2)',
          '--joy-palette-background-level2':
            'rgba(var(--joy-palette-neutral-mainChannel, 143 143 163) / 0.4)',
          '--joy-palette-background-level3':
            'rgba(var(--joy-palette-neutral-mainChannel, 143 143 163) / 0.6)',
          '--joy-palette-text-primary': 'var(--joy-palette-neutral-100, #EBEBEF)',
          '--joy-palette-text-secondary':
            'rgba(var(--joy-palette-neutral-lightChannel, 216 216 223) / 0.72)',
          '--joy-palette-text-tertiary':
            'rgba(var(--joy-palette-neutral-lightChannel, 216 216 223) / 0.6)',
          '--joy-palette-divider':
            'rgba(var(--joy-palette-neutral-lightChannel, 216 216 223) / 0.2)',
          '--variant-plainColor': 'rgba(var(--joy-palette-neutral-lightChannel, 216 216 223) / 1)',
          '--variant-plainHoverColor': 'var(--joy-palette-neutral-50, #F7F7F8)',
          '--variant-plainHoverBg':
            'rgba(var(--joy-palette-neutral-mainChannel, 143 143 163) / 0.16)',
          '--variant-plainActiveBg':
            'rgba(var(--joy-palette-neutral-mainChannel, 143 143 163) / 0.32)',
          '--variant-plainDisabledColor':
            'rgba(var(--joy-palette-neutral-mainChannel, 143 143 163) / 0.72)',
          '--variant-outlinedColor':
            'rgba(var(--joy-palette-neutral-lightChannel, 216 216 223) / 1)',
          '--variant-outlinedHoverColor': 'var(--joy-palette-neutral-50, #F7F7F8)',
          '--variant-outlinedBg': 'initial',
          '--variant-outlinedBorder':
            'rgba(var(--joy-palette-neutral-mainChannel, 143 143 163) / 0.4)',
          '--variant-outlinedHoverBorder': 'var(--joy-palette-neutral-600, #5A5A72)',
          '--variant-outlinedHoverBg':
            'rgba(var(--joy-palette-neutral-mainChannel, 143 143 163) / 0.16)',
          '--variant-outlinedActiveBg':
            'rgba(var(--joy-palette-neutral-mainChannel, 143 143 163) / 0.32)',
          '--variant-outlinedDisabledColor':
            'rgba(var(--joy-palette-neutral-mainChannel, 143 143 163) / 0.72)',
          '--variant-outlinedDisabledBorder':
            'rgba(var(--joy-palette-neutral-mainChannel, 143 143 163) / 0.2)',
          '--variant-softColor': 'var(--joy-palette-neutral-100, #EBEBEF)',
          '--variant-softBg': 'rgba(var(--joy-palette-neutral-mainChannel, 143 143 163) / 0.24)',
          '--variant-softHoverColor': '#fff',
          '--variant-softHoverBg':
            'rgba(var(--joy-palette-neutral-mainChannel, 143 143 163) / 0.32)',
          '--variant-softActiveBg':
            'rgba(var(--joy-palette-neutral-mainChannel, 143 143 163) / 0.48)',
          '--variant-softDisabledColor':
            'rgba(var(--joy-palette-neutral-mainChannel, 143 143 163) / 0.72)',
          '--variant-softDisabledBg':
            'rgba(var(--joy-palette-neutral-mainChannel, 143 143 163) / 0.12)',
          '--variant-solidColor': '#fff',
          '--variant-solidBg': 'var(--joy-palette-neutral-500, #73738C)',
          '--variant-solidHoverColor': '#fff',
          '--variant-solidHoverBg': 'var(--joy-palette-neutral-400, #8F8FA3)',
          '--variant-solidActiveBg': 'var(--joy-palette-neutral-400, #8F8FA3)',
          '--variant-solidDisabledColor':
            'rgba(var(--joy-palette-neutral-mainChannel, 143 143 163) / 0.72)',
          '--variant-solidDisabledBg':
            'rgba(var(--joy-palette-neutral-mainChannel, 143 143 163) / 0.12)',
        },
        '&': {
          '--joy-palette-focusVisible': 'var(--joy-palette-neutral-500, #73738C)',
          '--joy-palette-background-body':
            'rgba(var(--joy-palette-neutral-mainChannel, 115 115 140) / 0.1)',
          '--joy-palette-background-surface':
            'rgba(var(--joy-palette-neutral-mainChannel, 115 115 140) / 0.08)',
          '--joy-palette-background-level1':
            'rgba(var(--joy-palette-neutral-mainChannel, 115 115 140) / 0.2)',
          '--joy-palette-background-level2':
            'rgba(var(--joy-palette-neutral-mainChannel, 115 115 140) / 0.32)',
          '--joy-palette-background-level3':
            'rgba(var(--joy-palette-neutral-mainChannel, 115 115 140) / 0.48)',
          '--joy-palette-text-primary': 'var(--joy-palette-neutral-700, #434356)',
          '--joy-palette-text-secondary':
            'rgba(var(--joy-palette-neutral-darkChannel, 37 37 45) / 0.8)',
          '--joy-palette-text-tertiary':
            'rgba(var(--joy-palette-neutral-darkChannel, 37 37 45) / 0.68)',
          '--joy-palette-divider':
            'rgba(var(--joy-palette-neutral-mainChannel, 115 115 140) / 0.32)',
          '--variant-plainColor': 'rgba(var(--joy-palette-neutral-darkChannel, 37 37 45) / 0.8)',
          '--variant-plainHoverColor': 'rgba(var(--joy-palette-neutral-darkChannel, 37 37 45) / 1)',
          '--variant-plainHoverBg':
            'rgba(var(--joy-palette-neutral-mainChannel, 115 115 140) / 0.12)',
          '--variant-plainActiveBg':
            'rgba(var(--joy-palette-neutral-mainChannel, 115 115 140) / 0.24)',
          '--variant-plainDisabledColor':
            'rgba(var(--joy-palette-neutral-mainChannel, 115 115 140) / 0.6)',
          '--variant-outlinedColor':
            'rgba(var(--joy-palette-neutral-mainChannel, 115 115 140) / 1)',
          '--variant-outlinedBorder':
            'rgba(var(--joy-palette-neutral-mainChannel, 115 115 140) / 0.4)',
          '--variant-outlinedHoverColor': 'var(--joy-palette-neutral-600, #5A5A72)',
          '--variant-outlinedHoverBorder': 'var(--joy-palette-neutral-300, #B9B9C6)',
          '--variant-outlinedHoverBg':
            'rgba(var(--joy-palette-neutral-mainChannel, 115 115 140) / 0.12)',
          '--variant-outlinedActiveBg':
            'rgba(var(--joy-palette-neutral-mainChannel, 115 115 140) / 0.24)',
          '--variant-outlinedDisabledColor':
            'rgba(var(--joy-palette-neutral-mainChannel, 115 115 140) / 0.6)',
          '--variant-outlinedDisabledBorder':
            'rgba(var(--joy-palette-neutral-mainChannel, 115 115 140) / 0.12)',
          '--variant-softColor': 'var(--joy-palette-neutral-600, #5A5A72)',
          '--variant-softBg': 'rgba(var(--joy-palette-neutral-lightChannel, 216 216 223) / 0.72)',
          '--variant-softHoverColor': 'var(--joy-palette-neutral-700, #434356)',
          '--variant-softHoverBg': 'var(--joy-palette-neutral-200, #D8D8DF)',
          '--variant-softActiveBg': 'var(--joy-palette-neutral-300, #B9B9C6)',
          '--variant-softDisabledColor':
            'rgba(var(--joy-palette-neutral-mainChannel, 115 115 140) / 0.6)',
          '--variant-softDisabledBg':
            'rgba(var(--joy-palette-neutral-mainChannel, 115 115 140) / 0.08)',
          '--variant-solidColor': '#fff',
          '--variant-solidBg': 'var(--joy-palette-neutral-600, #5A5A72)',
          '--variant-solidHoverColor': '#fff',
          '--variant-solidHoverBg': 'var(--joy-palette-neutral-500, #73738C)',
          '--variant-solidActiveBg': 'var(--joy-palette-neutral-500, #73738C)',
          '--variant-solidDisabledColor': 'rgba(palette-neutral-mainChannel, 115 115 140) / 6)',
          '--variant-solidDisabledBg':
            'rgba(var(--joy-palette-neutral-mainChannel, 115 115 140) / 0.08)',
        },
      },
      danger: {
        '--Badge-ringColor':
          'var(--joy-palette-danger-softBg, var(--joy-palette-danger-900, #39000D))',
        '--joy-shadowChannel': 'var(--joy-palette-danger-darkChannel, 88 0 19)',
        '&[data-joy-color-scheme="dark"], [data-joy-color-scheme="dark"] &': {
          '--joy-palette-focusVisible': 'var(--joy-palette-danger-300, #FF9192)',
          '--joy-palette-background-body':
            'rgba(var(--joy-palette-danger-mainChannel, 250 82 85) / 0.1)',
          '--joy-palette-background-surface':
            'rgba(var(--joy-palette-danger-mainChannel, 250 82 85) / 0.08)',
          '--joy-palette-background-level1':
            'rgba(var(--joy-palette-danger-mainChannel, 250 82 85) / 0.2)',
          '--joy-palette-background-level2':
            'rgba(var(--joy-palette-danger-mainChannel, 250 82 85) / 0.4)',
          '--joy-palette-background-level3':
            'rgba(var(--joy-palette-danger-mainChannel, 250 82 85) / 0.6)',
          '--joy-palette-text-primary': 'var(--joy-palette-danger-100, #FFE9E8)',
          '--joy-palette-text-secondary':
            'rgba(var(--joy-palette-danger-lightChannel, 255 199 197) / 0.72)',
          '--joy-palette-text-tertiary':
            'rgba(var(--joy-palette-danger-lightChannel, 255 199 197) / 0.6)',
          '--joy-palette-divider':
            'rgba(var(--joy-palette-danger-lightChannel, 255 199 197) / 0.2)',
          '--variant-plainColor': 'rgba(var(--joy-palette-danger-lightChannel, 255 199 197) / 1)',
          '--variant-plainHoverColor': 'var(--joy-palette-danger-50, #FFF8F6)',
          '--variant-plainHoverBg': 'rgba(var(--joy-palette-danger-mainChannel, 250 82 85) / 0.16)',
          '--variant-plainActiveBg':
            'rgba(var(--joy-palette-danger-mainChannel, 250 82 85) / 0.32)',
          '--variant-plainDisabledColor':
            'rgba(var(--joy-palette-danger-mainChannel, 250 82 85) / 0.72)',
          '--variant-outlinedColor':
            'rgba(var(--joy-palette-danger-lightChannel, 255 199 197) / 1)',
          '--variant-outlinedHoverColor': 'var(--joy-palette-danger-50, #FFF8F6)',
          '--variant-outlinedBg': 'initial',
          '--variant-outlinedBorder':
            'rgba(var(--joy-palette-danger-mainChannel, 250 82 85) / 0.4)',
          '--variant-outlinedHoverBorder': 'var(--joy-palette-danger-600, #A10E25)',
          '--variant-outlinedHoverBg':
            'rgba(var(--joy-palette-danger-mainChannel, 250 82 85) / 0.16)',
          '--variant-outlinedActiveBg':
            'rgba(var(--joy-palette-danger-mainChannel, 250 82 85) / 0.32)',
          '--variant-outlinedDisabledColor':
            'rgba(var(--joy-palette-danger-mainChannel, 250 82 85) / 0.72)',
          '--variant-outlinedDisabledBorder':
            'rgba(var(--joy-palette-danger-mainChannel, 250 82 85) / 0.2)',
          '--variant-softColor': 'var(--joy-palette-danger-100, #FFE9E8)',
          '--variant-softBg': 'rgba(var(--joy-palette-danger-mainChannel, 250 82 85) / 0.24)',
          '--variant-softHoverColor': '#fff',
          '--variant-softHoverBg': 'rgba(var(--joy-palette-danger-mainChannel, 250 82 85) / 0.32)',
          '--variant-softActiveBg': 'rgba(var(--joy-palette-danger-mainChannel, 250 82 85) / 0.48)',
          '--variant-softDisabledColor':
            'rgba(var(--joy-palette-danger-mainChannel, 250 82 85) / 0.72)',
          '--variant-softDisabledBg':
            'rgba(var(--joy-palette-danger-mainChannel, 250 82 85) / 0.12)',
          '--variant-solidColor': '#fff',
          '--variant-solidBg': 'var(--joy-palette-danger-500, #D3232F)',
          '--variant-solidHoverColor': '#fff',
          '--variant-solidHoverBg': 'var(--joy-palette-danger-400, #FA5255)',
          '--variant-solidActiveBg': 'var(--joy-palette-danger-400, #FA5255)',
          '--variant-solidDisabledColor':
            'rgba(var(--joy-palette-danger-mainChannel, 250 82 85) / 0.72)',
          '--variant-solidDisabledBg':
            'rgba(var(--joy-palette-danger-mainChannel, 250 82 85) / 0.12)',
        },
        '&': {
          '--joy-palette-focusVisible': 'var(--joy-palette-danger-500, #D3232F)',
          '--joy-palette-background-body':
            'rgba(var(--joy-palette-danger-mainChannel, 211 35 47) / 0.1)',
          '--joy-palette-background-surface':
            'rgba(var(--joy-palette-danger-mainChannel, 211 35 47) / 0.08)',
          '--joy-palette-background-level1':
            'rgba(var(--joy-palette-danger-mainChannel, 211 35 47) / 0.2)',
          '--joy-palette-background-level2':
            'rgba(var(--joy-palette-danger-mainChannel, 211 35 47) / 0.32)',
          '--joy-palette-background-level3':
            'rgba(var(--joy-palette-danger-mainChannel, 211 35 47) / 0.48)',
          '--joy-palette-text-primary': 'var(--joy-palette-danger-700, #77061B)',
          '--joy-palette-text-secondary':
            'rgba(var(--joy-palette-danger-darkChannel, 88 0 19) / 0.8)',
          '--joy-palette-text-tertiary':
            'rgba(var(--joy-palette-danger-darkChannel, 88 0 19) / 0.68)',
          '--joy-palette-divider': 'rgba(var(--joy-palette-danger-mainChannel, 211 35 47) / 0.32)',
          '--variant-plainColor': 'rgba(var(--joy-palette-danger-darkChannel, 88 0 19) / 0.8)',
          '--variant-plainHoverColor': 'rgba(var(--joy-palette-danger-darkChannel, 88 0 19) / 1)',
          '--variant-plainHoverBg': 'rgba(var(--joy-palette-danger-mainChannel, 211 35 47) / 0.12)',
          '--variant-plainActiveBg':
            'rgba(var(--joy-palette-danger-mainChannel, 211 35 47) / 0.24)',
          '--variant-plainDisabledColor':
            'rgba(var(--joy-palette-danger-mainChannel, 211 35 47) / 0.6)',
          '--variant-outlinedColor': 'rgba(var(--joy-palette-danger-mainChannel, 211 35 47) / 1)',
          '--variant-outlinedBorder':
            'rgba(var(--joy-palette-danger-mainChannel, 211 35 47) / 0.4)',
          '--variant-outlinedHoverColor': 'var(--joy-palette-danger-600, #A10E25)',
          '--variant-outlinedHoverBorder': 'var(--joy-palette-danger-300, #FF9192)',
          '--variant-outlinedHoverBg':
            'rgba(var(--joy-palette-danger-mainChannel, 211 35 47) / 0.12)',
          '--variant-outlinedActiveBg':
            'rgba(var(--joy-palette-danger-mainChannel, 211 35 47) / 0.24)',
          '--variant-outlinedDisabledColor':
            'rgba(var(--joy-palette-danger-mainChannel, 211 35 47) / 0.6)',
          '--variant-outlinedDisabledBorder':
            'rgba(var(--joy-palette-danger-mainChannel, 211 35 47) / 0.12)',
          '--variant-softColor': 'var(--joy-palette-danger-600, #A10E25)',
          '--variant-softBg': 'rgba(var(--joy-palette-danger-lightChannel, 255 199 197) / 0.72)',
          '--variant-softHoverColor': 'var(--joy-palette-danger-700, #77061B)',
          '--variant-softHoverBg': 'var(--joy-palette-danger-200, #FFC7C5)',
          '--variant-softActiveBg': 'var(--joy-palette-danger-300, #FF9192)',
          '--variant-softDisabledColor':
            'rgba(var(--joy-palette-danger-mainChannel, 211 35 47) / 0.6)',
          '--variant-softDisabledBg':
            'rgba(var(--joy-palette-danger-mainChannel, 211 35 47) / 0.08)',
          '--variant-solidColor': '#fff',
          '--variant-solidBg': 'var(--joy-palette-danger-600, #A10E25)',
          '--variant-solidHoverColor': '#fff',
          '--variant-solidHoverBg': 'var(--joy-palette-danger-500, #D3232F)',
          '--variant-solidActiveBg': 'var(--joy-palette-danger-500, #D3232F)',
          '--variant-solidDisabledColor': 'rgba(palette-danger-mainChannel, 211 35 47) / 6)',
          '--variant-solidDisabledBg':
            'rgba(var(--joy-palette-danger-mainChannel, 211 35 47) / 0.08)',
        },
      },
      info: {
        '--Badge-ringColor': 'var(--joy-palette-info-softBg, var(--joy-palette-info-900, #1D0A42))',
        '--joy-shadowChannel': 'var(--joy-palette-info-darkChannel, 48 23 97)',
        '&[data-joy-color-scheme="dark"], [data-joy-color-scheme="dark"] &': {
          '--joy-palette-focusVisible': 'var(--joy-palette-info-300, #C69EFF)',
          '--joy-palette-background-body':
            'rgba(var(--joy-palette-info-mainChannel, 163 116 249) / 0.1)',
          '--joy-palette-background-surface':
            'rgba(var(--joy-palette-info-mainChannel, 163 116 249) / 0.08)',
          '--joy-palette-background-level1':
            'rgba(var(--joy-palette-info-mainChannel, 163 116 249) / 0.2)',
          '--joy-palette-background-level2':
            'rgba(var(--joy-palette-info-mainChannel, 163 116 249) / 0.4)',
          '--joy-palette-background-level3':
            'rgba(var(--joy-palette-info-mainChannel, 163 116 249) / 0.6)',
          '--joy-palette-text-primary': 'var(--joy-palette-info-100, #F4EAFF)',
          '--joy-palette-text-secondary':
            'rgba(var(--joy-palette-info-lightChannel, 225 203 255) / 0.72)',
          '--joy-palette-text-tertiary':
            'rgba(var(--joy-palette-info-lightChannel, 225 203 255) / 0.6)',
          '--joy-palette-divider': 'rgba(var(--joy-palette-info-lightChannel, 225 203 255) / 0.2)',
          '--variant-plainColor': 'rgba(var(--joy-palette-info-lightChannel, 225 203 255) / 1)',
          '--variant-plainHoverColor': 'var(--joy-palette-info-50, #FDF7FF)',
          '--variant-plainHoverBg': 'rgba(var(--joy-palette-info-mainChannel, 163 116 249) / 0.16)',
          '--variant-plainActiveBg':
            'rgba(var(--joy-palette-info-mainChannel, 163 116 249) / 0.32)',
          '--variant-plainDisabledColor':
            'rgba(var(--joy-palette-info-mainChannel, 163 116 249) / 0.72)',
          '--variant-outlinedColor': 'rgba(var(--joy-palette-info-lightChannel, 225 203 255) / 1)',
          '--variant-outlinedHoverColor': 'var(--joy-palette-info-50, #FDF7FF)',
          '--variant-outlinedBg': 'initial',
          '--variant-outlinedBorder':
            'rgba(var(--joy-palette-info-mainChannel, 163 116 249) / 0.4)',
          '--variant-outlinedHoverBorder': 'var(--joy-palette-info-600, #5F35AE)',
          '--variant-outlinedHoverBg':
            'rgba(var(--joy-palette-info-mainChannel, 163 116 249) / 0.16)',
          '--variant-outlinedActiveBg':
            'rgba(var(--joy-palette-info-mainChannel, 163 116 249) / 0.32)',
          '--variant-outlinedDisabledColor':
            'rgba(var(--joy-palette-info-mainChannel, 163 116 249) / 0.72)',
          '--variant-outlinedDisabledBorder':
            'rgba(var(--joy-palette-info-mainChannel, 163 116 249) / 0.2)',
          '--variant-softColor': 'var(--joy-palette-info-100, #F4EAFF)',
          '--variant-softBg': 'rgba(var(--joy-palette-info-mainChannel, 163 116 249) / 0.24)',
          '--variant-softHoverColor': '#fff',
          '--variant-softHoverBg': 'rgba(var(--joy-palette-info-mainChannel, 163 116 249) / 0.32)',
          '--variant-softActiveBg': 'rgba(var(--joy-palette-info-mainChannel, 163 116 249) / 0.48)',
          '--variant-softDisabledColor':
            'rgba(var(--joy-palette-info-mainChannel, 163 116 249) / 0.72)',
          '--variant-softDisabledBg':
            'rgba(var(--joy-palette-info-mainChannel, 163 116 249) / 0.12)',
          '--variant-solidColor': '#fff',
          '--variant-solidBg': 'var(--joy-palette-info-500, #814DDE)',
          '--variant-solidHoverColor': '#fff',
          '--variant-solidHoverBg': 'var(--joy-palette-info-400, #A374F9)',
          '--variant-solidActiveBg': 'var(--joy-palette-info-400, #A374F9)',
          '--variant-solidDisabledColor':
            'rgba(var(--joy-palette-info-mainChannel, 163 116 249) / 0.72)',
          '--variant-solidDisabledBg':
            'rgba(var(--joy-palette-info-mainChannel, 163 116 249) / 0.12)',
        },
        '&': {
          '--joy-palette-focusVisible': 'var(--joy-palette-info-500, #814DDE)',
          '--joy-palette-background-body':
            'rgba(var(--joy-palette-info-mainChannel, 129 77 222) / 0.1)',
          '--joy-palette-background-surface':
            'rgba(var(--joy-palette-info-mainChannel, 129 77 222) / 0.08)',
          '--joy-palette-background-level1':
            'rgba(var(--joy-palette-info-mainChannel, 129 77 222) / 0.2)',
          '--joy-palette-background-level2':
            'rgba(var(--joy-palette-info-mainChannel, 129 77 222) / 0.32)',
          '--joy-palette-background-level3':
            'rgba(var(--joy-palette-info-mainChannel, 129 77 222) / 0.48)',
          '--joy-palette-text-primary': 'var(--joy-palette-info-700, #452382)',
          '--joy-palette-text-secondary':
            'rgba(var(--joy-palette-info-darkChannel, 48 23 97) / 0.8)',
          '--joy-palette-text-tertiary':
            'rgba(var(--joy-palette-info-darkChannel, 48 23 97) / 0.68)',
          '--joy-palette-divider': 'rgba(var(--joy-palette-info-mainChannel, 129 77 222) / 0.32)',
          '--variant-plainColor': 'rgba(var(--joy-palette-info-darkChannel, 48 23 97) / 0.8)',
          '--variant-plainHoverColor': 'rgba(var(--joy-palette-info-darkChannel, 48 23 97) / 1)',
          '--variant-plainHoverBg': 'rgba(var(--joy-palette-info-mainChannel, 129 77 222) / 0.12)',
          '--variant-plainActiveBg': 'rgba(var(--joy-palette-info-mainChannel, 129 77 222) / 0.24)',
          '--variant-plainDisabledColor':
            'rgba(var(--joy-palette-info-mainChannel, 129 77 222) / 0.6)',
          '--variant-outlinedColor': 'rgba(var(--joy-palette-info-mainChannel, 129 77 222) / 1)',
          '--variant-outlinedBorder': 'rgba(var(--joy-palette-info-mainChannel, 129 77 222) / 0.4)',
          '--variant-outlinedHoverColor': 'var(--joy-palette-info-600, #5F35AE)',
          '--variant-outlinedHoverBorder': 'var(--joy-palette-info-300, #C69EFF)',
          '--variant-outlinedHoverBg':
            'rgba(var(--joy-palette-info-mainChannel, 129 77 222) / 0.12)',
          '--variant-outlinedActiveBg':
            'rgba(var(--joy-palette-info-mainChannel, 129 77 222) / 0.24)',
          '--variant-outlinedDisabledColor':
            'rgba(var(--joy-palette-info-mainChannel, 129 77 222) / 0.6)',
          '--variant-outlinedDisabledBorder':
            'rgba(var(--joy-palette-info-mainChannel, 129 77 222) / 0.12)',
          '--variant-softColor': 'var(--joy-palette-info-600, #5F35AE)',
          '--variant-softBg': 'rgba(var(--joy-palette-info-lightChannel, 225 203 255) / 0.72)',
          '--variant-softHoverColor': 'var(--joy-palette-info-700, #452382)',
          '--variant-softHoverBg': 'var(--joy-palette-info-200, #E1CBFF)',
          '--variant-softActiveBg': 'var(--joy-palette-info-300, #C69EFF)',
          '--variant-softDisabledColor':
            'rgba(var(--joy-palette-info-mainChannel, 129 77 222) / 0.6)',
          '--variant-softDisabledBg':
            'rgba(var(--joy-palette-info-mainChannel, 129 77 222) / 0.08)',
          '--variant-solidColor': '#fff',
          '--variant-solidBg': 'var(--joy-palette-info-600, #5F35AE)',
          '--variant-solidHoverColor': '#fff',
          '--variant-solidHoverBg': 'var(--joy-palette-info-500, #814DDE)',
          '--variant-solidActiveBg': 'var(--joy-palette-info-500, #814DDE)',
          '--variant-solidDisabledColor': 'rgba(palette-info-mainChannel, 129 77 222) / 6)',
          '--variant-solidDisabledBg':
            'rgba(var(--joy-palette-info-mainChannel, 129 77 222) / 0.08)',
        },
      },
      success: {
        '--Badge-ringColor':
          'var(--joy-palette-success-softBg, var(--joy-palette-success-900, #001D09))',
        '--joy-shadowChannel': 'var(--joy-palette-success-darkChannel, 0 47 15)',
        '&[data-joy-color-scheme="dark"], [data-joy-color-scheme="dark"] &': {
          '--joy-palette-focusVisible': 'var(--joy-palette-success-300, #4CC76E)',
          '--joy-palette-background-body':
            'rgba(var(--joy-palette-success-mainChannel, 44 162 77) / 0.1)',
          '--joy-palette-background-surface':
            'rgba(var(--joy-palette-success-mainChannel, 44 162 77) / 0.08)',
          '--joy-palette-background-level1':
            'rgba(var(--joy-palette-success-mainChannel, 44 162 77) / 0.2)',
          '--joy-palette-background-level2':
            'rgba(var(--joy-palette-success-mainChannel, 44 162 77) / 0.4)',
          '--joy-palette-background-level3':
            'rgba(var(--joy-palette-success-mainChannel, 44 162 77) / 0.6)',
          '--joy-palette-text-primary': 'var(--joy-palette-success-100, #D7F5DD)',
          '--joy-palette-text-secondary':
            'rgba(var(--joy-palette-success-lightChannel, 119 236 149) / 0.72)',
          '--joy-palette-text-tertiary':
            'rgba(var(--joy-palette-success-lightChannel, 119 236 149) / 0.6)',
          '--joy-palette-divider':
            'rgba(var(--joy-palette-success-lightChannel, 119 236 149) / 0.2)',
          '--variant-plainColor': 'rgba(var(--joy-palette-success-lightChannel, 119 236 149) / 1)',
          '--variant-plainHoverColor': 'var(--joy-palette-success-50, #F3FEF5)',
          '--variant-plainHoverBg':
            'rgba(var(--joy-palette-success-mainChannel, 44 162 77) / 0.16)',
          '--variant-plainActiveBg':
            'rgba(var(--joy-palette-success-mainChannel, 44 162 77) / 0.32)',
          '--variant-plainDisabledColor':
            'rgba(var(--joy-palette-success-mainChannel, 44 162 77) / 0.72)',
          '--variant-outlinedColor':
            'rgba(var(--joy-palette-success-lightChannel, 119 236 149) / 1)',
          '--variant-outlinedHoverColor': 'var(--joy-palette-success-50, #F3FEF5)',
          '--variant-outlinedBg': 'initial',
          '--variant-outlinedBorder':
            'rgba(var(--joy-palette-success-mainChannel, 44 162 77) / 0.4)',
          '--variant-outlinedHoverBorder': 'var(--joy-palette-success-600, #0F5D26)',
          '--variant-outlinedHoverBg':
            'rgba(var(--joy-palette-success-mainChannel, 44 162 77) / 0.16)',
          '--variant-outlinedActiveBg':
            'rgba(var(--joy-palette-success-mainChannel, 44 162 77) / 0.32)',
          '--variant-outlinedDisabledColor':
            'rgba(var(--joy-palette-success-mainChannel, 44 162 77) / 0.72)',
          '--variant-outlinedDisabledBorder':
            'rgba(var(--joy-palette-success-mainChannel, 44 162 77) / 0.2)',
          '--variant-softColor': 'var(--joy-palette-success-100, #D7F5DD)',
          '--variant-softBg': 'rgba(var(--joy-palette-success-mainChannel, 44 162 77) / 0.24)',
          '--variant-softHoverColor': '#fff',
          '--variant-softHoverBg': 'rgba(var(--joy-palette-success-mainChannel, 44 162 77) / 0.32)',
          '--variant-softActiveBg':
            'rgba(var(--joy-palette-success-mainChannel, 44 162 77) / 0.48)',
          '--variant-softDisabledColor':
            'rgba(var(--joy-palette-success-mainChannel, 44 162 77) / 0.72)',
          '--variant-softDisabledBg':
            'rgba(var(--joy-palette-success-mainChannel, 44 162 77) / 0.12)',
          '--variant-solidColor': '#fff',
          '--variant-solidBg': 'var(--joy-palette-success-500, #1A7D36)',
          '--variant-solidHoverColor': '#fff',
          '--variant-solidHoverBg': 'var(--joy-palette-success-400, #2CA24D)',
          '--variant-solidActiveBg': 'var(--joy-palette-success-400, #2CA24D)',
          '--variant-solidDisabledColor':
            'rgba(var(--joy-palette-success-mainChannel, 44 162 77) / 0.72)',
          '--variant-solidDisabledBg':
            'rgba(var(--joy-palette-success-mainChannel, 44 162 77) / 0.12)',
        },
        '&': {
          '--joy-palette-focusVisible': 'var(--joy-palette-success-500, #1A7D36)',
          '--joy-palette-background-body':
            'rgba(var(--joy-palette-success-mainChannel, 26 125 54) / 0.1)',
          '--joy-palette-background-surface':
            'rgba(var(--joy-palette-success-mainChannel, 26 125 54) / 0.08)',
          '--joy-palette-background-level1':
            'rgba(var(--joy-palette-success-mainChannel, 26 125 54) / 0.2)',
          '--joy-palette-background-level2':
            'rgba(var(--joy-palette-success-mainChannel, 26 125 54) / 0.32)',
          '--joy-palette-background-level3':
            'rgba(var(--joy-palette-success-mainChannel, 26 125 54) / 0.48)',
          '--joy-palette-text-primary': 'var(--joy-palette-success-700, #034318)',
          '--joy-palette-text-secondary':
            'rgba(var(--joy-palette-success-darkChannel, 0 47 15) / 0.8)',
          '--joy-palette-text-tertiary':
            'rgba(var(--joy-palette-success-darkChannel, 0 47 15) / 0.68)',
          '--joy-palette-divider': 'rgba(var(--joy-palette-success-mainChannel, 26 125 54) / 0.32)',
          '--variant-plainColor': 'rgba(var(--joy-palette-success-darkChannel, 0 47 15) / 0.8)',
          '--variant-plainHoverColor': 'rgba(var(--joy-palette-success-darkChannel, 0 47 15) / 1)',
          '--variant-plainHoverBg':
            'rgba(var(--joy-palette-success-mainChannel, 26 125 54) / 0.12)',
          '--variant-plainActiveBg':
            'rgba(var(--joy-palette-success-mainChannel, 26 125 54) / 0.24)',
          '--variant-plainDisabledColor':
            'rgba(var(--joy-palette-success-mainChannel, 26 125 54) / 0.6)',
          '--variant-outlinedColor': 'rgba(var(--joy-palette-success-mainChannel, 26 125 54) / 1)',
          '--variant-outlinedBorder':
            'rgba(var(--joy-palette-success-mainChannel, 26 125 54) / 0.4)',
          '--variant-outlinedHoverColor': 'var(--joy-palette-success-600, #0F5D26)',
          '--variant-outlinedHoverBorder': 'var(--joy-palette-success-300, #4CC76E)',
          '--variant-outlinedHoverBg':
            'rgba(var(--joy-palette-success-mainChannel, 26 125 54) / 0.12)',
          '--variant-outlinedActiveBg':
            'rgba(var(--joy-palette-success-mainChannel, 26 125 54) / 0.24)',
          '--variant-outlinedDisabledColor':
            'rgba(var(--joy-palette-success-mainChannel, 26 125 54) / 0.6)',
          '--variant-outlinedDisabledBorder':
            'rgba(var(--joy-palette-success-mainChannel, 26 125 54) / 0.12)',
          '--variant-softColor': 'var(--joy-palette-success-600, #0F5D26)',
          '--variant-softBg': 'rgba(var(--joy-palette-success-lightChannel, 119 236 149) / 0.72)',
          '--variant-softHoverColor': 'var(--joy-palette-success-700, #034318)',
          '--variant-softHoverBg': 'var(--joy-palette-success-200, #77EC95)',
          '--variant-softActiveBg': 'var(--joy-palette-success-300, #4CC76E)',
          '--variant-softDisabledColor':
            'rgba(var(--joy-palette-success-mainChannel, 26 125 54) / 0.6)',
          '--variant-softDisabledBg':
            'rgba(var(--joy-palette-success-mainChannel, 26 125 54) / 0.08)',
          '--variant-solidColor': '#fff',
          '--variant-solidBg': 'var(--joy-palette-success-600, #0F5D26)',
          '--variant-solidHoverColor': '#fff',
          '--variant-solidHoverBg': 'var(--joy-palette-success-500, #1A7D36)',
          '--variant-solidActiveBg': 'var(--joy-palette-success-500, #1A7D36)',
          '--variant-solidDisabledColor': 'rgba(palette-success-mainChannel, 26 125 54) / 6)',
          '--variant-solidDisabledBg':
            'rgba(var(--joy-palette-success-mainChannel, 26 125 54) / 0.08)',
        },
      },
      warning: {
        '--Badge-ringColor':
          'var(--joy-palette-warning-softBg, var(--joy-palette-warning-900, #3B2300))',
        '--joy-shadowChannel': 'var(--joy-palette-warning-darkChannel, 77 45 0)',
        '&[data-joy-color-scheme="dark"], [data-joy-color-scheme="dark"] &': {
          '--joy-palette-focusVisible': 'var(--joy-palette-warning-300, #D4A72C)',
          '--joy-palette-background-body':
            'rgba(var(--joy-palette-warning-mainChannel, 191 135 0) / 0.1)',
          '--joy-palette-background-surface':
            'rgba(var(--joy-palette-warning-mainChannel, 191 135 0) / 0.08)',
          '--joy-palette-background-level1':
            'rgba(var(--joy-palette-warning-mainChannel, 191 135 0) / 0.2)',
          '--joy-palette-background-level2':
            'rgba(var(--joy-palette-warning-mainChannel, 191 135 0) / 0.4)',
          '--joy-palette-background-level3':
            'rgba(var(--joy-palette-warning-mainChannel, 191 135 0) / 0.6)',
          '--joy-palette-text-primary': 'var(--joy-palette-warning-100, #FAE17D)',
          '--joy-palette-text-secondary':
            'rgba(var(--joy-palette-warning-lightChannel, 234 197 79) / 0.72)',
          '--joy-palette-text-tertiary':
            'rgba(var(--joy-palette-warning-lightChannel, 234 197 79) / 0.6)',
          '--joy-palette-divider':
            'rgba(var(--joy-palette-warning-lightChannel, 234 197 79) / 0.2)',
          '--variant-plainColor': 'rgba(var(--joy-palette-warning-lightChannel, 234 197 79) / 1)',
          '--variant-plainHoverColor': 'var(--joy-palette-warning-50, #FFF8C5)',
          '--variant-plainHoverBg':
            'rgba(var(--joy-palette-warning-mainChannel, 191 135 0) / 0.16)',
          '--variant-plainActiveBg':
            'rgba(var(--joy-palette-warning-mainChannel, 191 135 0) / 0.32)',
          '--variant-plainDisabledColor':
            'rgba(var(--joy-palette-warning-mainChannel, 191 135 0) / 0.72)',
          '--variant-outlinedColor':
            'rgba(var(--joy-palette-warning-lightChannel, 234 197 79) / 1)',
          '--variant-outlinedHoverColor': 'var(--joy-palette-warning-50, #FFF8C5)',
          '--variant-outlinedBg': 'initial',
          '--variant-outlinedBorder':
            'rgba(var(--joy-palette-warning-mainChannel, 191 135 0) / 0.4)',
          '--variant-outlinedHoverBorder': 'var(--joy-palette-warning-600, #7D4E00)',
          '--variant-outlinedHoverBg':
            'rgba(var(--joy-palette-warning-mainChannel, 191 135 0) / 0.16)',
          '--variant-outlinedActiveBg':
            'rgba(var(--joy-palette-warning-mainChannel, 191 135 0) / 0.32)',
          '--variant-outlinedDisabledColor':
            'rgba(var(--joy-palette-warning-mainChannel, 191 135 0) / 0.72)',
          '--variant-outlinedDisabledBorder':
            'rgba(var(--joy-palette-warning-mainChannel, 191 135 0) / 0.2)',
          '--variant-softColor': 'var(--joy-palette-warning-100, #FAE17D)',
          '--variant-softBg': 'rgba(var(--joy-palette-warning-mainChannel, 191 135 0) / 0.24)',
          '--variant-softHoverColor': '#fff',
          '--variant-softHoverBg': 'rgba(var(--joy-palette-warning-mainChannel, 191 135 0) / 0.32)',
          '--variant-softActiveBg':
            'rgba(var(--joy-palette-warning-mainChannel, 191 135 0) / 0.48)',
          '--variant-softDisabledColor':
            'rgba(var(--joy-palette-warning-mainChannel, 191 135 0) / 0.72)',
          '--variant-softDisabledBg':
            'rgba(var(--joy-palette-warning-mainChannel, 191 135 0) / 0.12)',
          '--variant-solidColor': '#fff',
          '--variant-solidBg': 'var(--joy-palette-warning-500, #9A6700)',
          '--variant-solidHoverColor': '#fff',
          '--variant-solidHoverBg': 'var(--joy-palette-warning-400, #BF8700)',
          '--variant-solidActiveBg': 'var(--joy-palette-warning-400, #BF8700)',
          '--variant-solidDisabledColor':
            'rgba(var(--joy-palette-warning-mainChannel, 191 135 0) / 0.72)',
          '--variant-solidDisabledBg':
            'rgba(var(--joy-palette-warning-mainChannel, 191 135 0) / 0.12)',
        },
        '&': {
          '--joy-palette-focusVisible': 'var(--joy-palette-warning-500, #9A6700)',
          '--joy-palette-background-body':
            'rgba(var(--joy-palette-warning-mainChannel, 154 103 0) / 0.1)',
          '--joy-palette-background-surface':
            'rgba(var(--joy-palette-warning-mainChannel, 154 103 0) / 0.08)',
          '--joy-palette-background-level1':
            'rgba(var(--joy-palette-warning-mainChannel, 154 103 0) / 0.2)',
          '--joy-palette-background-level2':
            'rgba(var(--joy-palette-warning-mainChannel, 154 103 0) / 0.32)',
          '--joy-palette-background-level3':
            'rgba(var(--joy-palette-warning-mainChannel, 154 103 0) / 0.48)',
          '--joy-palette-text-primary': 'var(--joy-palette-warning-700, #633C01)',
          '--joy-palette-text-secondary':
            'rgba(var(--joy-palette-warning-darkChannel, 77 45 0) / 0.8)',
          '--joy-palette-text-tertiary':
            'rgba(var(--joy-palette-warning-darkChannel, 77 45 0) / 0.68)',
          '--joy-palette-divider': 'rgba(var(--joy-palette-warning-mainChannel, 154 103 0) / 0.32)',
          '--variant-plainColor': 'rgba(var(--joy-palette-warning-darkChannel, 77 45 0) / 0.8)',
          '--variant-plainHoverColor': 'rgba(var(--joy-palette-warning-darkChannel, 77 45 0) / 1)',
          '--variant-plainHoverBg':
            'rgba(var(--joy-palette-warning-mainChannel, 154 103 0) / 0.12)',
          '--variant-plainActiveBg':
            'rgba(var(--joy-palette-warning-mainChannel, 154 103 0) / 0.24)',
          '--variant-plainDisabledColor':
            'rgba(var(--joy-palette-warning-mainChannel, 154 103 0) / 0.6)',
          '--variant-outlinedColor': 'rgba(var(--joy-palette-warning-mainChannel, 154 103 0) / 1)',
          '--variant-outlinedBorder':
            'rgba(var(--joy-palette-warning-mainChannel, 154 103 0) / 0.4)',
          '--variant-outlinedHoverColor': 'var(--joy-palette-warning-600, #7D4E00)',
          '--variant-outlinedHoverBorder': 'var(--joy-palette-warning-300, #D4A72C)',
          '--variant-outlinedHoverBg':
            'rgba(var(--joy-palette-warning-mainChannel, 154 103 0) / 0.12)',
          '--variant-outlinedActiveBg':
            'rgba(var(--joy-palette-warning-mainChannel, 154 103 0) / 0.24)',
          '--variant-outlinedDisabledColor':
            'rgba(var(--joy-palette-warning-mainChannel, 154 103 0) / 0.6)',
          '--variant-outlinedDisabledBorder':
            'rgba(var(--joy-palette-warning-mainChannel, 154 103 0) / 0.12)',
          '--variant-softColor': 'var(--joy-palette-warning-600, #7D4E00)',
          '--variant-softBg': 'rgba(var(--joy-palette-warning-lightChannel, 234 197 79) / 0.72)',
          '--variant-softHoverColor': 'var(--joy-palette-warning-700, #633C01)',
          '--variant-softHoverBg': 'var(--joy-palette-warning-200, #EAC54F)',
          '--variant-softActiveBg': 'var(--joy-palette-warning-300, #D4A72C)',
          '--variant-softDisabledColor':
            'rgba(var(--joy-palette-warning-mainChannel, 154 103 0) / 0.6)',
          '--variant-softDisabledBg':
            'rgba(var(--joy-palette-warning-mainChannel, 154 103 0) / 0.08)',
          '--variant-solidColor': '#fff',
          '--variant-solidBg': 'var(--joy-palette-warning-600, #7D4E00)',
          '--variant-solidHoverColor': '#fff',
          '--variant-solidHoverBg': 'var(--joy-palette-warning-500, #9A6700)',
          '--variant-solidActiveBg': 'var(--joy-palette-warning-500, #9A6700)',
          '--variant-solidDisabledColor': 'rgba(palette-warning-mainChannel, 154 103 0) / 6)',
          '--variant-solidDisabledBg':
            'rgba(var(--joy-palette-warning-mainChannel, 154 103 0) / 0.08)',
        },
      },
    },
    solid: {
      primary: {
        colorScheme: 'dark',
        '--Badge-ringColor':
          'var(--joy-palette-primary-solidBg, var(--palette-primary-500, #096BDE))',
        '--joy-shadowChannel': 'var(--joy-palette-primary-darkChannel, 7 40 89)',
        '--joy-palette-focusVisible': 'var(--joy-palette-primary-200, #ADDBFF)',
        '--joy-palette-background-body': 'rgba(0 0 0 / 0.1)',
        '--joy-palette-background-surface': 'rgba(0 0 0 / 0.06)',
        '--joy-palette-background-popup': 'var(--joy-palette-primary-700, #02367D)',
        '--joy-palette-background-level1':
          'rgba(var(--joy-palette-primary-darkChannel, 7 40 89) / 0.2)',
        '--joy-palette-background-level2':
          'rgba(var(--joy-palette-primary-darkChannel, 7 40 89) / 0.36)',
        '--joy-palette-background-level3':
          'rgba(var(--joy-palette-primary-darkChannel, 7 40 89) / 0.6)',
        '--joy-palette-text-primary': '#fff',
        '--joy-palette-text-secondary': 'var(--joy-palette-primary-100, #DDF1FF)',
        '--joy-palette-text-tertiary': 'var(--joy-palette-primary-200, #ADDBFF)',
        '--joy-palette-divider':
          'rgba(var(--joy-palette-primary-lightChannel, 173 219 255) / 0.32)',
        '--variant-plainColor': 'var(--joy-palette-primary-50, #F4FAFF)',
        '--variant-plainHoverColor': '#fff',
        '--variant-plainHoverBg':
          'rgba(var(--joy-palette-primary-lightChannel, 173 219 255) / 0.12)',
        '--variant-plainActiveBg':
          'rgba(var(--joy-palette-primary-lightChannel, 173 219 255) / 0.32)',
        '--variant-plainDisabledColor':
          'rgba(var(--joy-palette-primary-lightChannel, 173 219 255) / 0.72)',
        '--variant-outlinedColor': 'var(--joy-palette-primary-50, #F4FAFF)',
        '--variant-outlinedBorder':
          'rgba(var(--joy-palette-primary-lightChannel, 173 219 255) / 0.5)',
        '--variant-outlinedHoverColor': '#fff',
        '--variant-outlinedHoverBorder': 'var(--joy-palette-primary-300, #6FB6FF)',
        '--variant-outlinedHoverBg':
          'rgba(var(--joy-palette-primary-lightChannel, 173 219 255) / 0.12)',
        '--variant-outlinedActiveBg':
          'rgba(var(--joy-palette-primary-lightChannel, 173 219 255) / 0.32)',
        '--variant-outlinedDisabledColor':
          'rgba(var(--joy-palette-primary-lightChannel, 173 219 255) / 0.72)',
        '--variant-outlinedDisabledBorder': 'rgba(255 255 255 / 0.2)',
        '--variant-softColor': '#fff',
        '--variant-softHoverColor': '#fff',
        '--variant-softBg': 'rgba(var(--joy-palette-primary-lightChannel, 173 219 255) / 0.24)',
        '--variant-softHoverBg':
          'rgba(var(--joy-palette-primary-lightChannel, 173 219 255) / 0.36)',
        '--variant-softActiveBg':
          'rgba(var(--joy-palette-primary-lightChannel, 173 219 255) / 0.16)',
        '--variant-softDisabledColor':
          'rgba(var(--joy-palette-primary-lightChannel, 173 219 255) / 0.72)',
        '--variant-softDisabledBg':
          'rgba(var(--joy-palette-primary-lightChannel, 173 219 255) / 0.1)',
        '--variant-solidColor': 'var(--joy-palette-primary-500, #096BDE)',
        '--variant-solidBg': '#fff',
        '--variant-solidHoverColor': 'var(--joy-palette-primary-700, #02367D)',
        '--variant-solidHoverBg': '#fff',
        '--variant-solidActiveBg': 'var(--joy-palette-primary-200, #ADDBFF)',
        '--variant-solidDisabledColor':
          'rgba(var(--joy-palette-primary-lightChannel, 173 219 255) / 0.72)',
        '--variant-solidDisabledBg':
          'rgba(var(--joy-palette-primary-lightChannel, 173 219 255) / 0.1)',
      },
      neutral: {
        colorScheme: 'dark',
        '--Badge-ringColor':
          'var(--joy-palette-neutral-solidBg, var(--joy-palette-neutral-600, #5A5A72))',
        '--joy-shadowChannel': 'var(--joy-palette-neutral-darkChannel, 37 37 45)',
        '--joy-palette-focusVisible': 'var(--joy-palette-neutral-200, #D8D8DF)',
        '--joy-palette-background-body': 'rgba(0 0 0 / 0.1)',
        '--joy-palette-background-surface': 'rgba(0 0 0 / 0.06)',
        '--joy-palette-background-popup': 'var(--joy-palette-neutral-700, #434356)',
        '--joy-palette-background-level1':
          'rgba(var(--joy-palette-neutral-darkChannel, 37 37 45) / 0.2)',
        '--joy-palette-background-level2':
          'rgba(var(--joy-palette-neutral-darkChannel, 37 37 45) / 0.36)',
        '--joy-palette-background-level3':
          'rgba(var(--joy-palette-neutral-darkChannel, 37 37 45) / 0.6)',
        '--joy-palette-text-primary': '#fff',
        '--joy-palette-text-secondary': 'var(--joy-palette-neutral-100, #EBEBEF)',
        '--joy-palette-text-tertiary': 'var(--joy-palette-neutral-200, #D8D8DF)',
        '--joy-palette-divider':
          'rgba(var(--joy-palette-neutral-lightChannel, 216 216 223) / 0.32)',
        '--variant-plainColor': 'var(--joy-palette-neutral-50, #F7F7F8)',
        '--variant-plainHoverColor': '#fff',
        '--variant-plainHoverBg':
          'rgba(var(--joy-palette-neutral-lightChannel, 216 216 223) / 0.12)',
        '--variant-plainActiveBg':
          'rgba(var(--joy-palette-neutral-lightChannel, 216 216 223) / 0.32)',
        '--variant-plainDisabledColor':
          'rgba(var(--joy-palette-neutral-lightChannel, 216 216 223) / 0.72)',
        '--variant-outlinedColor': 'var(--joy-palette-neutral-50, #F7F7F8)',
        '--variant-outlinedBorder':
          'rgba(var(--joy-palette-neutral-lightChannel, 216 216 223) / 0.5)',
        '--variant-outlinedHoverColor': '#fff',
        '--variant-outlinedHoverBorder': 'var(--joy-palette-neutral-300, #B9B9C6)',
        '--variant-outlinedHoverBg':
          'rgba(var(--joy-palette-neutral-lightChannel, 216 216 223) / 0.12)',
        '--variant-outlinedActiveBg':
          'rgba(var(--joy-palette-neutral-lightChannel, 216 216 223) / 0.32)',
        '--variant-outlinedDisabledColor':
          'rgba(var(--joy-palette-neutral-lightChannel, 216 216 223) / 0.72)',
        '--variant-outlinedDisabledBorder': 'rgba(255 255 255 / 0.2)',
        '--variant-softColor': '#fff',
        '--variant-softHoverColor': '#fff',
        '--variant-softBg': 'rgba(var(--joy-palette-neutral-lightChannel, 216 216 223) / 0.24)',
        '--variant-softHoverBg':
          'rgba(var(--joy-palette-neutral-lightChannel, 216 216 223) / 0.36)',
        '--variant-softActiveBg':
          'rgba(var(--joy-palette-neutral-lightChannel, 216 216 223) / 0.16)',
        '--variant-softDisabledColor':
          'rgba(var(--joy-palette-neutral-lightChannel, 216 216 223) / 0.72)',
        '--variant-softDisabledBg':
          'rgba(var(--joy-palette-neutral-lightChannel, 216 216 223) / 0.1)',
        '--variant-solidColor': 'var(--joy-palette-neutral-600, #5A5A72)',
        '--variant-solidBg': '#fff',
        '--variant-solidHoverColor': 'var(--joy-palette-neutral-700, #434356)',
        '--variant-solidHoverBg': '#fff',
        '--variant-solidActiveBg': 'var(--joy-palette-neutral-200, #D8D8DF)',
        '--variant-solidDisabledColor':
          'rgba(var(--joy-palette-neutral-lightChannel, 216 216 223) / 0.72)',
        '--variant-solidDisabledBg':
          'rgba(var(--joy-palette-neutral-lightChannel, 216 216 223) / 0.1)',
      },
      danger: {
        colorScheme: 'dark',
        '--Badge-ringColor':
          'var(--joy-palette-danger-solidBg, var(--palette-danger-500, #D3232F))',
        '--joy-shadowChannel': 'var(--joy-palette-danger-darkChannel, 88 0 19)',
        '--joy-palette-focusVisible': 'var(--joy-palette-danger-200, #FFC7C5)',
        '--joy-palette-background-body': 'rgba(0 0 0 / 0.1)',
        '--joy-palette-background-surface': 'rgba(0 0 0 / 0.06)',
        '--joy-palette-background-popup': 'var(--joy-palette-danger-700, #77061B)',
        '--joy-palette-background-level1':
          'rgba(var(--joy-palette-danger-darkChannel, 88 0 19) / 0.2)',
        '--joy-palette-background-level2':
          'rgba(var(--joy-palette-danger-darkChannel, 88 0 19) / 0.36)',
        '--joy-palette-background-level3':
          'rgba(var(--joy-palette-danger-darkChannel, 88 0 19) / 0.6)',
        '--joy-palette-text-primary': '#fff',
        '--joy-palette-text-secondary': 'var(--joy-palette-danger-100, #FFE9E8)',
        '--joy-palette-text-tertiary': 'var(--joy-palette-danger-200, #FFC7C5)',
        '--joy-palette-divider': 'rgba(var(--joy-palette-danger-lightChannel, 255 199 197) / 0.32)',
        '--variant-plainColor': 'var(--joy-palette-danger-50, #FFF8F6)',
        '--variant-plainHoverColor': '#fff',
        '--variant-plainHoverBg':
          'rgba(var(--joy-palette-danger-lightChannel, 255 199 197) / 0.12)',
        '--variant-plainActiveBg':
          'rgba(var(--joy-palette-danger-lightChannel, 255 199 197) / 0.32)',
        '--variant-plainDisabledColor':
          'rgba(var(--joy-palette-danger-lightChannel, 255 199 197) / 0.72)',
        '--variant-outlinedColor': 'var(--joy-palette-danger-50, #FFF8F6)',
        '--variant-outlinedBorder':
          'rgba(var(--joy-palette-danger-lightChannel, 255 199 197) / 0.5)',
        '--variant-outlinedHoverColor': '#fff',
        '--variant-outlinedHoverBorder': 'var(--joy-palette-danger-300, #FF9192)',
        '--variant-outlinedHoverBg':
          'rgba(var(--joy-palette-danger-lightChannel, 255 199 197) / 0.12)',
        '--variant-outlinedActiveBg':
          'rgba(var(--joy-palette-danger-lightChannel, 255 199 197) / 0.32)',
        '--variant-outlinedDisabledColor':
          'rgba(var(--joy-palette-danger-lightChannel, 255 199 197) / 0.72)',
        '--variant-outlinedDisabledBorder': 'rgba(255 255 255 / 0.2)',
        '--variant-softColor': '#fff',
        '--variant-softHoverColor': '#fff',
        '--variant-softBg': 'rgba(var(--joy-palette-danger-lightChannel, 255 199 197) / 0.24)',
        '--variant-softHoverBg': 'rgba(var(--joy-palette-danger-lightChannel, 255 199 197) / 0.36)',
        '--variant-softActiveBg':
          'rgba(var(--joy-palette-danger-lightChannel, 255 199 197) / 0.16)',
        '--variant-softDisabledColor':
          'rgba(var(--joy-palette-danger-lightChannel, 255 199 197) / 0.72)',
        '--variant-softDisabledBg':
          'rgba(var(--joy-palette-danger-lightChannel, 255 199 197) / 0.1)',
        '--variant-solidColor': 'var(--joy-palette-danger-500, #D3232F)',
        '--variant-solidBg': '#fff',
        '--variant-solidHoverColor': 'var(--joy-palette-danger-700, #77061B)',
        '--variant-solidHoverBg': '#fff',
        '--variant-solidActiveBg': 'var(--joy-palette-danger-200, #FFC7C5)',
        '--variant-solidDisabledColor':
          'rgba(var(--joy-palette-danger-lightChannel, 255 199 197) / 0.72)',
        '--variant-solidDisabledBg':
          'rgba(var(--joy-palette-danger-lightChannel, 255 199 197) / 0.1)',
      },
      info: {
        colorScheme: 'dark',
        '--Badge-ringColor': 'var(--joy-palette-info-solidBg, var(--palette-info-500, #814DDE))',
        '--joy-shadowChannel': 'var(--joy-palette-info-darkChannel, 48 23 97)',
        '--joy-palette-focusVisible': 'var(--joy-palette-info-200, #E1CBFF)',
        '--joy-palette-background-body': 'rgba(0 0 0 / 0.1)',
        '--joy-palette-background-surface': 'rgba(0 0 0 / 0.06)',
        '--joy-palette-background-popup': 'var(--joy-palette-info-700, #452382)',
        '--joy-palette-background-level1':
          'rgba(var(--joy-palette-info-darkChannel, 48 23 97) / 0.2)',
        '--joy-palette-background-level2':
          'rgba(var(--joy-palette-info-darkChannel, 48 23 97) / 0.36)',
        '--joy-palette-background-level3':
          'rgba(var(--joy-palette-info-darkChannel, 48 23 97) / 0.6)',
        '--joy-palette-text-primary': '#fff',
        '--joy-palette-text-secondary': 'var(--joy-palette-info-100, #F4EAFF)',
        '--joy-palette-text-tertiary': 'var(--joy-palette-info-200, #E1CBFF)',
        '--joy-palette-divider': 'rgba(var(--joy-palette-info-lightChannel, 225 203 255) / 0.32)',
        '--variant-plainColor': 'var(--joy-palette-info-50, #FDF7FF)',
        '--variant-plainHoverColor': '#fff',
        '--variant-plainHoverBg': 'rgba(var(--joy-palette-info-lightChannel, 225 203 255) / 0.12)',
        '--variant-plainActiveBg': 'rgba(var(--joy-palette-info-lightChannel, 225 203 255) / 0.32)',
        '--variant-plainDisabledColor':
          'rgba(var(--joy-palette-info-lightChannel, 225 203 255) / 0.72)',
        '--variant-outlinedColor': 'var(--joy-palette-info-50, #FDF7FF)',
        '--variant-outlinedBorder': 'rgba(var(--joy-palette-info-lightChannel, 225 203 255) / 0.5)',
        '--variant-outlinedHoverColor': '#fff',
        '--variant-outlinedHoverBorder': 'var(--joy-palette-info-300, #C69EFF)',
        '--variant-outlinedHoverBg':
          'rgba(var(--joy-palette-info-lightChannel, 225 203 255) / 0.12)',
        '--variant-outlinedActiveBg':
          'rgba(var(--joy-palette-info-lightChannel, 225 203 255) / 0.32)',
        '--variant-outlinedDisabledColor':
          'rgba(var(--joy-palette-info-lightChannel, 225 203 255) / 0.72)',
        '--variant-outlinedDisabledBorder': 'rgba(255 255 255 / 0.2)',
        '--variant-softColor': '#fff',
        '--variant-softHoverColor': '#fff',
        '--variant-softBg': 'rgba(var(--joy-palette-info-lightChannel, 225 203 255) / 0.24)',
        '--variant-softHoverBg': 'rgba(var(--joy-palette-info-lightChannel, 225 203 255) / 0.36)',
        '--variant-softActiveBg': 'rgba(var(--joy-palette-info-lightChannel, 225 203 255) / 0.16)',
        '--variant-softDisabledColor':
          'rgba(var(--joy-palette-info-lightChannel, 225 203 255) / 0.72)',
        '--variant-softDisabledBg': 'rgba(var(--joy-palette-info-lightChannel, 225 203 255) / 0.1)',
        '--variant-solidColor': 'var(--joy-palette-info-500, #814DDE)',
        '--variant-solidBg': '#fff',
        '--variant-solidHoverColor': 'var(--joy-palette-info-700, #452382)',
        '--variant-solidHoverBg': '#fff',
        '--variant-solidActiveBg': 'var(--joy-palette-info-200, #E1CBFF)',
        '--variant-solidDisabledColor':
          'rgba(var(--joy-palette-info-lightChannel, 225 203 255) / 0.72)',
        '--variant-solidDisabledBg':
          'rgba(var(--joy-palette-info-lightChannel, 225 203 255) / 0.1)',
      },
      success: {
        colorScheme: 'dark',
        '--Badge-ringColor':
          'var(--joy-palette-success-solidBg, var(--palette-success-500, #1A7D36))',
        '--joy-shadowChannel': 'var(--joy-palette-success-darkChannel, 0 47 15)',
        '--joy-palette-focusVisible': 'var(--joy-palette-success-200, #77EC95)',
        '--joy-palette-background-body': 'rgba(0 0 0 / 0.1)',
        '--joy-palette-background-surface': 'rgba(0 0 0 / 0.06)',
        '--joy-palette-background-popup': 'var(--joy-palette-success-700, #034318)',
        '--joy-palette-background-level1':
          'rgba(var(--joy-palette-success-darkChannel, 0 47 15) / 0.2)',
        '--joy-palette-background-level2':
          'rgba(var(--joy-palette-success-darkChannel, 0 47 15) / 0.36)',
        '--joy-palette-background-level3':
          'rgba(var(--joy-palette-success-darkChannel, 0 47 15) / 0.6)',
        '--joy-palette-text-primary': '#fff',
        '--joy-palette-text-secondary': 'var(--joy-palette-success-100, #D7F5DD)',
        '--joy-palette-text-tertiary': 'var(--joy-palette-success-200, #77EC95)',
        '--joy-palette-divider':
          'rgba(var(--joy-palette-success-lightChannel, 119 236 149) / 0.32)',
        '--variant-plainColor': 'var(--joy-palette-success-50, #F3FEF5)',
        '--variant-plainHoverColor': '#fff',
        '--variant-plainHoverBg':
          'rgba(var(--joy-palette-success-lightChannel, 119 236 149) / 0.12)',
        '--variant-plainActiveBg':
          'rgba(var(--joy-palette-success-lightChannel, 119 236 149) / 0.32)',
        '--variant-plainDisabledColor':
          'rgba(var(--joy-palette-success-lightChannel, 119 236 149) / 0.72)',
        '--variant-outlinedColor': 'var(--joy-palette-success-50, #F3FEF5)',
        '--variant-outlinedBorder':
          'rgba(var(--joy-palette-success-lightChannel, 119 236 149) / 0.5)',
        '--variant-outlinedHoverColor': '#fff',
        '--variant-outlinedHoverBorder': 'var(--joy-palette-success-300, #4CC76E)',
        '--variant-outlinedHoverBg':
          'rgba(var(--joy-palette-success-lightChannel, 119 236 149) / 0.12)',
        '--variant-outlinedActiveBg':
          'rgba(var(--joy-palette-success-lightChannel, 119 236 149) / 0.32)',
        '--variant-outlinedDisabledColor':
          'rgba(var(--joy-palette-success-lightChannel, 119 236 149) / 0.72)',
        '--variant-outlinedDisabledBorder': 'rgba(255 255 255 / 0.2)',
        '--variant-softColor': '#fff',
        '--variant-softHoverColor': '#fff',
        '--variant-softBg': 'rgba(var(--joy-palette-success-lightChannel, 119 236 149) / 0.24)',
        '--variant-softHoverBg':
          'rgba(var(--joy-palette-success-lightChannel, 119 236 149) / 0.36)',
        '--variant-softActiveBg':
          'rgba(var(--joy-palette-success-lightChannel, 119 236 149) / 0.16)',
        '--variant-softDisabledColor':
          'rgba(var(--joy-palette-success-lightChannel, 119 236 149) / 0.72)',
        '--variant-softDisabledBg':
          'rgba(var(--joy-palette-success-lightChannel, 119 236 149) / 0.1)',
        '--variant-solidColor': 'var(--joy-palette-success-500, #1A7D36)',
        '--variant-solidBg': '#fff',
        '--variant-solidHoverColor': 'var(--joy-palette-success-700, #034318)',
        '--variant-solidHoverBg': '#fff',
        '--variant-solidActiveBg': 'var(--joy-palette-success-200, #77EC95)',
        '--variant-solidDisabledColor':
          'rgba(var(--joy-palette-success-lightChannel, 119 236 149) / 0.72)',
        '--variant-solidDisabledBg':
          'rgba(var(--joy-palette-success-lightChannel, 119 236 149) / 0.1)',
      },
      warning: {
        '--Badge-ringColor':
          'var(--joy-palette-warning-solidBg, var(--joy-palette-warning-200, #EAC54F))',
        '--joy-shadowChannel': 'var(--joy-palette-warning-darkChannel, 77 45 0)',
        '--joy-palette-focusVisible': 'var(--joy-palette-warning-700, #633C01)',
        '--joy-palette-background-body':
          'rgba(var(--joy-palette-warning-darkChannel, 77 45 0) / 0.16)',
        '--joy-palette-background-surface':
          'rgba(var(--joy-palette-warning-darkChannel, 77 45 0) / 0.1)',
        '--joy-palette-background-popup': 'var(--joy-palette-warning-100)',
        '--joy-palette-background-level1':
          'rgba(var(--joy-palette-warning-darkChannel, 77 45 0) / 0.2)',
        '--joy-palette-background-level2':
          'rgba(var(--joy-palette-warning-darkChannel, 77 45 0) / 0.36)',
        '--joy-palette-background-level3':
          'rgba(var(--joy-palette-warning-darkChannel, 77 45 0) / 0.6)',
        '--joy-palette-text-primary': 'var(--joy-palette-warning-900, #3B2300)',
        '--joy-palette-text-secondary': 'var(--joy-palette-warning-700, #633C01)',
        '--joy-palette-text-tertiary': 'var(--joy-palette-warning-500, #9A6700)',
        '--joy-palette-divider': 'rgba(var(--joy-palette-warning-darkChannel, 77 45 0) / 0.2)',
        '--variant-plainColor': 'var(--joy-palette-warning-700, #633C01)',
        '--variant-plainHoverColor': 'var(--joy-palette-warning-800, #4D2D00)',
        '--variant-plainHoverBg': 'rgba(var(--joy-palette-warning-mainChannel, 154 103 0) / 0.12)',
        '--variant-plainActiveBg': 'rgba(var(--joy-palette-warning-mainChannel, 154 103 0) / 0.32)',
        '--variant-plainDisabledColor':
          'rgba(var(--joy-palette-warning-mainChannel, 154 103 0) / 0.72)',
        '--variant-outlinedColor': 'var(--joy-palette-warning-700, #633C01)',
        '--variant-outlinedBorder': 'rgba(var(--joy-palette-warning-mainChannel, 154 103 0) / 0.5)',
        '--variant-outlinedHoverColor': 'var(--joy-palette-warning-800, #4D2D00)',
        '--variant-outlinedHoverBorder':
          'rgba(var(--joy-palette-warning-mainChannel, 154 103 0) / 0.6)',
        '--variant-outlinedHoverBg':
          'rgba(var(--joy-palette-warning-mainChannel, 154 103 0) / 0.12)',
        '--variant-outlinedActiveBg':
          'rgba(var(--joy-palette-warning-mainChannel, 154 103 0) / 0.32)',
        '--variant-outlinedDisabledColor':
          'rgba(var(--joy-palette-warning-mainChannel, 154 103 0) / 0.72)',
        '--variant-outlinedDisabledBorder':
          'rgba(var(--joy-palette-warning-mainChannel, 154 103 0) / 0.2)',
        '--variant-softColor': 'var(--joy-palette-warning-800, #4D2D00)',
        '--variant-softHoverColor': 'var(--joy-palette-warning-900, #3B2300)',
        '--variant-softBg': 'rgba(var(--joy-palette-warning-mainChannel, 154 103 0) / 0.2)',
        '--variant-softHoverBg': 'rgba(var(--joy-palette-warning-mainChannel, 154 103 0) / 0.28)',
        '--variant-softActiveBg': 'rgba(var(--joy-palette-warning-mainChannel, 154 103 0) / 0.12)',
        '--variant-softDisabledColor':
          'rgba(var(--joy-palette-warning-mainChannel, 154 103 0) / 0.72)',
        '--variant-softDisabledBg':
          'rgba(var(--joy-palette-warning-mainChannel, 154 103 0) / 0.08)',
        '--variant-solidColor': '#fff',
        '--variant-solidBg': 'var(--joy-palette-warning-600, #7D4E00)',
        '--variant-solidHoverColor': '#fff',
        '--variant-solidHoverBg': 'var(--joy-palette-warning-700, #633C01)',
        '--variant-solidActiveBg': 'var(--joy-palette-warning-800, #633C01)',
        '--variant-solidDisabledColor':
          'rgba(var(--joy-palette-warning-mainChannel, 154 103 0) / 0.72)',
        '--variant-solidDisabledBg':
          'rgba(var(--joy-palette-warning-mainChannel, 154 103 0) / 0.08)',
      },
    },
  },
  shadowRing: '0 0 #000',
  shadowChannel: '187 187 187',
  breakpoints: createBreakpoints({}),
  generateCssVars: () => ({ css: {}, vars: {} }),
  getCssVar: systemCreateGetCssVar('joy'),
  getColorSchemeSelector: (colorScheme) =>
    colorScheme === 'light'
      ? '&'
      : `&[data-joy-color-scheme="${colorScheme}"], [data-joy-color-scheme="${colorScheme}"] &`,
  shouldSkipGeneratingVar: defaultShouldSkipGeneratingVar,
  spacing: createSpacing(),
  unstable_sxConfig: defaultSxConfig,
  unstable_sx: function sx(props) {
    return styleFunctionSx({
      sx: props,
      theme: this,
    });
  },
} as ReturnType<typeof extendTheme>;

export default defaultTheme;
