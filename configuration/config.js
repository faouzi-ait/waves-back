exports.params = {
  db_params: {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  TOKEN_SECRET: process.env.TOKEN_SECRET,
  db_url: function () {
    return process.env.DB_CONNECTION
  },
  port: function () {
    return process.env.PORT || 5000
  }
}
