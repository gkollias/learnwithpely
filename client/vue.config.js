module.exports = {
  devServer: {
    // ... existing config
    proxy: {
      '/api': {
        // For development only, keep as is
        target: 'http://localhost:5000',
        ws: false,
        changeOrigin: true,
      },
    },
  },
  // Add this to provide environment variables to your build
  chainWebpack: config => {
    config.plugin('define').tap(args => {
      const env = process.env.NODE_ENV === 'production'
        ? { VUE_APP_API_URL: JSON.stringify('https://learn-with-pely.onrender.com') }
        : { VUE_APP_API_URL: JSON.stringify('') };
      
      Object.assign(args[0]['process.env'], env);
      return args;
    });
  }
};