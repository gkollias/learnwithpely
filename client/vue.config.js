// vue.config.js

module.exports = {
  devServer: {
    host: 'localhost',
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        ws: false,
        changeOrigin: true,
      },
    },
    watchOptions: {
      poll: true,
    },
  },
};
