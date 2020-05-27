module.exports = (req, res, next) => {
   const headerId = req.header('user-id');
   const sessionId = req.session.userId;
   if (headerId == sessionId) {
      next();
   } else {
      res.sendStatus(401);
   }
};
