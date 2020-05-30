module.exports = {
   getFleets: async (req, res) => {
      const { gameId } = req.params;
      const playerId = req.session.userId;

      const fleets = await req.app.get('db').fleets.getFleetsByGame({ gameId, playerId });

      let squadrons = [];
      if (fleets.length > 0) {
         fleets.forEach(async fleet => {
            const fleetSquadrons = await req.app.get('db')
               .squadrons.getSquadronsByFleet({ fleetId: fleet.id });
            squadrons.push(fleetSquadrons);
         });
      }

      res.status(200).send({ fleets, squadrons });
   },
}