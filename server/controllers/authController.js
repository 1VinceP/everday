const bcrypt = require('bcrypt');
const saltRounds = Number(process.env.BCRYPT_SALT_ROUNDS);

module.exports = {
   createUser: async (req, res) => {
      const { username, email, password } = req.body;

      const usernameTaken = await req.app.get('db').users.find({ username });
      const emailTaken = await req.app.get('db').users.find({ email });

      if (usernameTaken) {
         res.status(400).send('That username is already in use.');
         return;
      } else if (emailTaken) {
         res.status(400).send('That email is already in use.');
         return;
      }

      const hash = await bcrypt.hash(password, saltRounds);
      const [user] = await req.app.get('db').auth.createUser({ username, email, password: hash });

      req.session.user_id = user.user_id;

      res.status(200).send(user);
   },

   login: async (req, res) => {
      const { username, password } = req.body;

      const [user] = await req.app.get('db').auth.getUser({ username });

      if (user) {
         let match;
         if (process.env.DEV) {
            // match without bcrypt for easy dev
            match = password === user.password;
         } else {
            match = await bcrypt.compare(password, user.password);
         }

         if (match) {
            req.session.userId = user.id;

            res.status(200).send(user);
         } else {
            res.status(400).send('Username and password combination not found');
         }
      }
   },

   logout: (req, res) => {
      req.session.destroy();
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
