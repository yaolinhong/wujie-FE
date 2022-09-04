// console.log('🚀 ~ file: domain.ts ~ line 3 ~ process.env', process.env);
// import.meta.env.VITE_ENV
export default {
  interface: {
    login: {
      fetchColor: '/testApi/api/random'
    }
  },
  Proxy: {
    domain: {
      testApi: {
        development: 'https://x-colors.herokuapp.com',
        release: 'https://x-colors.herokuapp.com',
        production: 'https://x-colors.herokuapp.com'
      }
    }
  }
};
