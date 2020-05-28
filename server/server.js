require('dotenv').config();
const express = require('express')
	 , bodyParser = require('body-parser')
	 , history = require('connect-history-api-fallback')
	 , session = require('express-session')
	 , massive = require('massive')
	 , helmet = require('helmet')
    , { check } = require('express-validator')
	 , PasswordValidator = require('password-validator')
	 , chalk = require('chalk');

const authController = require('./controllers/authController')
	 , userController = require('./controllers/userController')
	 , gamesController = require('./controllers/gamesController')
	 , retrieveHardData = require('./controllers/retrievalController');

const checkAuth = require('./middleware/checkAuth');

const app = express();

app.use(session({
	secret: process.env.SESSION_SECRET,
	resave: false,
	saveUninitialized: false,
	cookie: {
		secure: !process.env.DEV, // secure should be false for dev in http environments
		maxAge: 60 * 60 * 1000, // 1 hour
	},
}));
app.use(history()); // allows use of vue-router history mode
app.use(bodyParser.json());
app.use(helmet());

app.use(express.static(`${__dirname}/../public`));

/* database connection */
massive(process.env.DATABASE_URI).then(db => {
	let dbChalk = chalk.magenta;
	console.log(dbChalk('Connected to Database'));
	app.set('db', db);
	app.get('db').init.seed()
		.catch(res => console.error(res));
	// wait for db connection to succeed before starting server
	listen();
}).catch((err) => {
	console.log(chalk.red('Could not connect to Database'))
	console.log(err);
	// wait for db connection to fail before starting server
	listen();
});

const validator = new PasswordValidator();
validator.is().min(8)
   .has().lowercase()
   .has().uppercase()
   .has().digits()
   .has().not().spaces();
/* authentication */
app.post('/auth/create', [
	check('username').not().isEmpty().isLength({ min: 3 }).trim().escape(),
   check('email').not().isEmpty().isEmail().normalizeEmail(),
	check('password').not().isEmpty().isLength({ min: 8 }).trim().escape()
		.custom((value, { req }) => {
			const validated = validator.validate(value);
			const passwordMatch = value === req.body.passwordConfirmation;
			if (!validated) throw new Error('Password does not pass validation.');
			if (!passwordMatch) throw new Error('Passwords do not match.');

			return true;
		}),
], authController.createUser);
app.post('/auth/login', [
   check('username').not().isEmpty().isLength({ min: 3 }).trim().escape(),
   check('password').not().isEmpty().isLength({ min: 8 }).trim().escape(),
], authController.login);
app.post('/auth/logout', authController.logout);
app.get('/auth/checkSession', authController.checkSession);

/* games */
app.get('/games/:userId', checkAuth, gamesController.getGames);
app.post('/games', checkAuth, gamesController.createGame);
app.put('/games/:id', [
   check('name').not().isEmpty().trim().escape(),
   check('description').trim().escape(),
], checkAuth, gamesController.editGame);
app.delete('/games/:id', checkAuth, gamesController.deleteGame);

/* hardcoded data */
app.get('/retrieve/:dataset', retrieveHardData);

/* news */
app.get('/news', (req, res) => {
	const news = require('./data/news.json').filter(article => !article.archived);
	res.status(200).send(news.reverse());
});
app.get('/news/archives', (req, res) => {
	const news = [...require('./data/news.json')];
	res.status(200).send(news.reverse());
});
app.get('/news/:id', (req, res) => {
	const { id } = req.params;
	const news = require('./data/news.json');
	const index = news.findIndex(article => article.id == id);
	if (index >= 0) res.status(200).send(news[index]);
	else res.sendStatus(400);
});

/* users */
app.get('/users/:id', userController.getUser);




function listen() {
	const PORT = process.env.NODE_PORT || 3003;
	const portChalk = chalk.cyan.underline;
	app.listen(PORT, () => { console.log(portChalk(`eavesdropping_on_port_${PORT}`)) });
}
