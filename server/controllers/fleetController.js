module.exports = {
   getFleets: async (req, res) => {
      const { gameId } = req.params;
      const playerId = req.session.userId;

      const fleets = await req.app.get('db').fleets.getFleetsByGame({ gameId, playerId });

      res.status(200).send({ fleets });
   },
}