const config = {
  port: parseInt(process.env.PORT ?? "8001"),
  opt: process.env.OPT ?? "./opt/logs",
  database: {
    url: process.env.DB_URL,
  },
  fromEmailAddress: process.env.USER_EMAIL_ADDRESS,
  //   password: process.env.APP_PASSWORD,
};

module.exports = config;
