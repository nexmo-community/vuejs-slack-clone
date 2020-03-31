// controllers/server.js
exports.status = function(req, res, next) {
  res.json({
    defaultConversationId: process.env.NEXMO_DEFAULT_CONVERSATION_ID,
    status: 'ok'
  });
};