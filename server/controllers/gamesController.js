module.exports = {
   getGames: async (req, res) => {
      const { userId } = req.params;

      const games = await req.app.get('db').games.getGames({ userId });

      res.status(200).send(games);
   },

   deleteGame: async (req, res) => {
      const { id } = req.params;
      const { userId } = req.session;

      try {
         const games = await req.app.get('db').games.deleteGame({ id, userId });
         res.status(200).send(games);
      } catch (error) {
         res.sendStatus(500);
      }
   },
};
