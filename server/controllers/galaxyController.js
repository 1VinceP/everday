module.exports = {
   getGalaxy: async (req, res) => {
      const { gameId } = req.params;

      const [galaxy] = await req.app.get('db').galaxy.getGalaxy({ gameId });
      let systems = []
      if (galaxy) {
         systems = await req.app.get('db').systems.getByGalaxy({ galaxyId: galaxy.id });
      }

      res.status(200).send({ galaxy, systems });
   },
};
