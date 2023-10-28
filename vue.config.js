const webpack = require('webpack');

module.exports = {
  css: {
    loaderOptions: {
      sass: {
        additionalData: `
          @import "@/styles/bootstrap/_variables.scss";
          @import "@/styles/bootstrap/_mixins.scss";
          @import "@/styles/bootstrap/_functions.scss";
        `,
      },
    },
  },
  configureWebpack: {
    devtool: 'source-map',
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
      }),
    ],
    resolve: {
      alias: {
        'popper.js': 'popper.js/dist/umd/popper',
      },
    },
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'https://www.dnd5eapi.co',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '',
        },
      },
    },
  },
};
