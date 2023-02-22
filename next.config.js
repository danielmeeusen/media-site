const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  skipWaiting: true,
  scope: '/',
})

module.exports = withPWA({
  experimental: {
        scrollRestoration: true,
      },
});



