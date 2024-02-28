export default {
  modules: [
    '@nuxt/content-security-policy',
  ],
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'"],
      fontSrc: ["'self'"],
      connectSrc: ["'self'"],
      frameSrc: ["'self'"],
    },
  },
}