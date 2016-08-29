module.exports = {
  paths: {
    public: '../docs'
  },

  files: {
    javascripts: {
      joinTo: {
        'index.js': /^app/
      }
    },
    stylesheets: { 
      joinTo: 'index.css'
    },
  },

  plugins: {
    babel: { presets: ['stage-0']}
  }
};
