module.exports = (req, res, next) => {
   const headerId = req.header('user-id');
   const sessionId = req.session.userId;

   // console.log({ header: headerId, session: sessionId });

   if (headerId == sessionId) {
      next();
   } else {
      res.sendStatus(401);
   }
};
