const bcrypt = require('bcrypt');
const chalk = require('chalk');
const shortId = require('../utils/shortId');
const saltRounds = Number(process.env.BCRYPT_SALT_ROUNDS);

module.exports = {
   createUser: async (req, res) => {
      const { username, email, password } = req.body;

      const usernameFound = await req.app.get('db').users.find({ username });
      const emailFound = await req.app.get('db').users.find({ email });

      if (usernameFound.length > 0) {
         res.status(400).send({ message: 'That username is already in use.' });
         return;
      } else if (emailFound.length > 0) {
         res.status(400).send({ message: 'That email is already in use.' });
         return;
      }

      const friend_code = [shortId(4), shortId(4), shortId(4), shortId(4)].join('-').toUpperCase();
      const hash = await bcrypt.hash(password, saltRounds);
      const [user] = await req.app.get('db').auth.createUser({ username, email, password: hash, friend_code });
      console.log(chalk.yellow('New user created.'));

      req.session.userId = user.user_id;
      res.status(200).send(user);
   },

   login: async (req, res) => {
      const { username, password } = req.body;

      const [user] = await req.app.get('db').auth.getUser({ username });

      if (user) {
         let match;
         if (process.env.DEV) {
            // match without bcrypt for dev
            match = password === user.password;
         } else {
            match = await bcrypt.compare(password, user.password);
         }

         if (match) {
            req.session.userId = user.id;
            console.log(chalk.green('LOGIN'));
            res.status(200).send(user);
         } else {
            res.status(400).send('Username and password combination not found.');
         }
      }
   },

   logout: (req, res) => {
      req.session.destroy();
      console.log(chalk.green('LOGOUT'));
      res.sendStatus(200);
   },

   checkSession: (req, res) => {
      const { userId } = req.session;
      if (userId) {
         res.status(200).send({ onSession: true, userId });
      } else {
         res.status(200).send({ onSession: false });
      }
   },
};
