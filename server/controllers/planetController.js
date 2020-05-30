module.exports = {
   getPlanets: async (req, res) => {
      const { systemId } = req.params;

      const planets = await req.app.get('db').planets.getPlanets({ systemId });
      res.status(200).send(planets);
   },
};
