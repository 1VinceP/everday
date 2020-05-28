module.exports = {
   getPlayers: async (req, res) => {
      const { gameId } = req.params;

      const players = await req.app.get('db').players.getPlayers({ gameId });

      res.status(200).send(players);
   },
};
