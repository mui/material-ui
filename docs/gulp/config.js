var dest = './build',
  src = './src'
  dist = './dist';

module.exports = {
  browserSync: {
    server: {
      // We're serving the src folder as well
      // for sass sourcemap linking
      baseDir: [dest, src]
    },
    files: [
      dest + '/**'
    ]
  },
  less: {
    src: src + '/less/main.less',
    watch: [
      src + '/less/**',
      dist + '/less/**'
    ],
    dest: dest
  },
  markup: {
    src: src + "/www/**",
    dest: dest
  },
  svgs: {
    src: dist + '/less/material-design-icons/svg-sprite/**',
    dest: dest + '/svg-sprite'
  },
  browserify: {
    // Enable source maps
    debug: true,
    // A separate bundle will be generated for each
    // bundle config in the list below
    bundleConfigs: [{
      entries: src + '/app/app.jsx',
      dest: dest,
      outputName: 'app.js'
    }]
  }
};
