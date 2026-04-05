module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        vscode: {
          bg: '#1e1e1e',
          panel: '#252526',
          sidebar: '#333333',
          accent: '#007acc',
          accentSoft: '#0e639c',
          border: '#3c3c3c',
          text: '#d4d4d4',
          muted: '#9da0a6',
          green: '#89d185',
          yellow: '#dcdcaa',
          red: '#f14c4c',
        },
      },
      boxShadow: {
        soft: '0 20px 50px rgba(0,0,0,.35)',
      },
    },
  },
  plugins: [],
};
