exports.session = function(req, res, next) {
  res.json({
    user: process.env.VONAGE_USER,
    token: process.env.VONAGE_USER_TOKEN
  });
};