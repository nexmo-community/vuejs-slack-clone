exports.session = function(req, res, next) {
  res.json({
    user: process.env.NEXMO_USER,
    token: process.env.NEXMO_USER_TOKEN
  });
};