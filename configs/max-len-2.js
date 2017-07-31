module.exports = {
  plugins: [
    'max-len-2'
  ],

  rules: {
    'max-len-2/max-len-2': ['warn', {
      code: 80,
      ignoreComments: true,
      ignoreUrls: true
    }]
  }
};
