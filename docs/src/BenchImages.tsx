import * as React from 'react';
import image001 from '../public/static/images/avatar/1.jpg';
import image002 from '../public/static/images/avatar/2.jpg';
import image003 from '../public/static/images/avatar/3.jpg';
import image004 from '../public/static/images/avatar/4.jpg';
import image005 from '../public/static/images/avatar/5.jpg';
import image006 from '../public/static/logo.png';
import image007 from '../public/static/images/buttons/breakfast.jpg';
import image008 from '../public/static/images/buttons/burgers.jpg';
import image009 from '../public/static/images/buttons/camera.jpg';
import image010 from '../public/static/images/cards/contemplative-reptile.jpg';
import image011 from '../public/static/images/cards/live-from-space.jpg';
import image012 from '../public/static/images/cards/paella.jpg';
import image013 from '../public/static/images/grid/complex.jpg';
import image014 from '../public/static/images/sliders/chilling-sunday.jpg';
import image015 from '../public/static/branding/about/olivier.png';
import image016 from '../public/static/branding/about/matt.png';
import image017 from '../public/static/branding/about/marija.png';
import image018 from '../public/static/branding/about/danail.png';
import image019 from '../public/static/branding/about/matheus.png';
import image021 from '../public/static/branding/about/michal.png';
import image022 from '../public/static/branding/about/siriwat.png';
import image023 from '../public/static/branding/about/danilo.png';
import image024 from '../public/static/branding/about/flavien.png';
import image025 from '../public/static/branding/about/benny.png';
import image026 from '../public/static/branding/about/alexandre.png';
import image027 from '../public/static/branding/about/bharat.png';
import image028 from '../public/static/branding/about/jan.png';
import image029 from '../public/static/branding/about/prakhar.png';
import image020 from '../public/static/branding/about/jose.png';
import image031 from '../public/static/branding/about/andrii.png';
import image032 from '../public/static/branding/about/sycamore.png';
import image033 from '../public/static/branding/about/pedro.png';
import image034 from '../public/static/branding/about/gerda.png';
import image035 from '../public/static/branding/about/vytautas.png';
import image036 from '../public/static/branding/about/lukas.png';
import image037 from '../public/static/branding/about/bilal.png';
import image038 from '../public/static/social-previews/core-preview.jpg';
import image039 from '../public/static/social-previews/designkits-preview.jpg';
import image030 from '../public/static/social-previews/templates-preview.jpg';
import image041 from '../public/static/social-previews/x-preview.jpg';
import image042 from '../public/static/branding/design-kits/designkits-figma.png';
import image043 from '../public/static/branding/design-kits/designkits-sketch.png';
import image044 from '../public/static/branding/design-kits/designkits-xd.png';
import image045 from '../public/static/sponsors/octopus.svg';
import image046 from '../public/static/sponsors/doit-square.svg';
import image047 from '../public/static/sponsors/tidelift.svg';
import image048 from '../public/static/sponsors/megafamous.png';
import image049 from '../public/static/branding/companies/unity-blue.svg';
import image040 from '../public/static/branding/companies/docker-blue.svg';
import image051 from '../public/static/branding/companies/loggi-blue.svg';
import image052 from '../public/static/images/cards/real-estate.png';
import image053 from '../public/static/branding/mui-x/sparkline-light1.png';
import image054 from '../public/static/branding/mui-x/sparkline-light2.png';
import image055 from '../public/static/branding/mui-x/chart-light1.png';
import image056 from '../public/static/branding/mui-x/chart-light2.png';
import image057 from '../public/static/branding/mui-x/chart-light3.png';
import image058 from '../public/static/branding/mui-x/chart-light4.png';
import image059 from '../public/static/branding/mui-x/Mocktable-light.png';
import image050 from '../public/static/social-previews/default-preview.jpg';
import image061 from '../public/static/themes/onepirate/appFooterFacebook.png';
import image062 from '../public/static/themes/onepirate/appFooterTwitter.png';
import image063 from '../public/static/themes/onepirate/productHeroWonder.png';
import image064 from '../public/static/themes/onepirate/productHeroArrowDown.png';
import image065 from '../public/static/themes/onepirate/productCurvyLines.png';
import image066 from '../public/static/themes/onepirate/productHowItWorks1.svg';
import image067 from '../public/static/themes/onepirate/productHowItWorks2.svg';
import image068 from '../public/static/themes/onepirate/productHowItWorks3.svg';
import image069 from '../public/static/themes/onepirate/producBuoy.svg';
import image060 from '../public/static/themes/onepirate/productValues1.svg';
import image071 from '../public/static/themes/onepirate/productValues2.svg';
import image072 from '../public/static/themes/onepirate/productValues3.svg';
import image073 from '../public/static/branding/mui-x/sparkline-dark1.png';
import image074 from '../public/static/branding/mui-x/sparkline-dark2.png';
import image075 from '../public/static/branding/mui-x/chart-dark1.png';
import image076 from '../public/static/branding/mui-x/chart-dark2.png';
import image077 from '../public/static/branding/mui-x/chart-dark3.png';
import image078 from '../public/static/branding/mui-x/chart-dark4.png';
import image079 from '../public/static/branding/mui-x/Mocktable-dark.png';

const images = [
  image001,
  image002,
  image003,
  image004,
  image005,
  image006,
  image007,
  image008,
  image009,
  image010,
  image011,
  image012,
  image013,
  image014,
  image015,
  image016,
  image017,
  image018,
  image019,
  image021,
  image022,
  image023,
  image024,
  image025,
  image026,
  image027,
  image028,
  image029,
  image020,
  image031,
  image032,
  image033,
  image034,
  image035,
  image036,
  image037,
  image038,
  image039,
  image030,
  image041,
  image042,
  image043,
  image044,
  image045,
  image046,
  image047,
  image048,
  image049,
  image040,
  image051,
  image052,
  image053,
  image054,
  image055,
  image056,
  image057,
  image058,
  image059,
  image050,
  image061,
  image062,
  image063,
  image064,
  image065,
  image066,
  image067,
  image068,
  image069,
  image060,
  image071,
  image072,
  image073,
  image074,
  image075,
  image076,
  image077,
  image078,
  image079,
];

export default function BenchImages() {
  return (
    <div>
      {images.map((image) => (
        <img {...image} alt="" />
      ))}
    </div>
  );
}
