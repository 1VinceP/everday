module.exports = {
   getUser: async (req, res) => {
      const { id } = req.params;

      try {
         const [user] = await req.app.get('db').users.getUser({ id });
         res.status(200).send(user);
      } catch (error) {
         res.sendStatus(400);
      }
   },
}