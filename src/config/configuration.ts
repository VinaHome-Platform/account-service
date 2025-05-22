export default () => ({
  jwt: {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN,
  },
  database: {
    mongodb: process.env.MONGODB_URI,
  },
  connection: {
    host: process.env.HOST_ACCOUNT_SERVICE,
    port: process.env.PORT_ACCOUNT_SERVICE,
  },
});
