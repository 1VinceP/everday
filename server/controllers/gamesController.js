const moment = require('moment');
const shortId = require('../utils/shortId');

const gamesByTier = {
   basic: 1,
   advanced: 2,
   superior: 3,
};

module.exports = {
   getGames: async (req, res) => {
      const { userId } = req.params;

      const games = await req.app.get('db').games.getGames({ userId });

      res.status(200).send(games);
   },

   createGame: async (req, res) => {
      const { userId } = req.session;

      const [user] = await req.app.get('db').users.getUser({ id: userId });
      const games = await req.app.get('db').games.getGames({ userId });
      console.log(user.tier);

      if (!user.tier && games.length >= 1) {
         res.status(401).send({ message: 'Basic tier game limit reached.' });
         return;
      } else if (user.tier === 'advanced' && games.length >= 2) {
         res.status(401).send({ message: 'Advanced game limit reached.' });
         return;
      } else if (user.tier === 'superior' && games.length >= 3) {
         res.status(401).send({ message: 'Superior game limit reached.' });
         return;
      }

      try {
         const id = shortId(36, 'complex');
         console.log(id);
         const creationDate = moment();
         const newGames = await req.app.get('db').games.createGame({ id, userId, creationDate });
         res.status(200).send(newGames);
      } catch (error) {
         console.log(error);
         res.sendStatus(400);
      }
   },

   editGame: async (req, res) => {
      const { id } = req.params;
      const { name: game_name, description: game_description } = req.body;
      const { userId } = req.session;

      try {
         const games = await req.app.get('db').games.editGame({ id, game_name, game_description, userId });
         res.status(200).send(games);
      } catch (error) {
         res.sendStatus(400);
      }
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
