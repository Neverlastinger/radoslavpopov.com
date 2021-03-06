module.exports = {
  async redirects() {
    return [
      {
        source: '/NotMyClass.js',
        destination: '/NotMyClass.js/index.html',
        permanent: true,
      },
    ];
  },
};
