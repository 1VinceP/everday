module.exports = {
   getSettlements: async (req, res) => {
      const { planetId } = req.params;

      const settlements = await req.app.get('db').settlements.getSettlements({ planetId });
      res.status(200).send(settlements);
   },
};
