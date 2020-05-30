require('dotenv').config();
// npm imports
const express = require('express')
	 , bodyParser = require('body-parser')
	 , history = require('connect-history-api-fallback')
	 , session = require('express-session')
	 , MemoryStore = require('memorystore')(session)
	 , massive = require('massive')
	 , helmet = require('helmet')
    , { check } = require('express-validator')
	 , PasswordValidator = require('password-validator')
	 , chalk = require('chalk');

// controller imports
const authController = require('./controllers/authController')
    , fleetController = require('./controllers/fleetController')
    , galaxyController = require('./controllers/galaxyController')
    , gamesController = require('./controllers/gamesController')
    , planetController = require('./controllers/planetController')
	 , playerController = require('./controllers/playerController')
    , retrieveHardData = require('./controllers/retrievalController')
    , settlementController = require('./controllers/settlementController')
	 , userController = require('./controllers/userController');

// middleware imports
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
	store: new MemoryStore({
		checkPeriod: 60 * 60 * 1000, // prune expired entries every hour
	}),
}));
app.use(history()); // allows use of vue-router history mode
app.use(bodyParser.json());
app.use(helmet());
app.use(express.static(`${__dirname}/../public/index.html`));

/* database connection */
massive(process.env.DATABASE_URL).then(db => {
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

/* ////// authentication ////// */
const validator = new PasswordValidator();
validator.is().min(8)
   .has().lowercase()
   .has().uppercase()
   .has().digits()
	.has().not().spaces();

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

/* ////// fleet ////// */
app.get('/fleets/:gameId', checkAuth, fleetController.getFleets);

/* ////// galaxy ////// */
app.get('/galaxy/:gameId', checkAuth, galaxyController.getGalaxy);

/* ////// games ////// */
app.get('/games/:userId', checkAuth, gamesController.getGames);
app.post('/games', checkAuth, gamesController.createGame);
app.put('/games/:id', [
   check('name').not().isEmpty().trim().escape(),
   check('description').trim().escape(),
], checkAuth, gamesController.editGame);
app.delete('/games/:id', checkAuth, gamesController.deleteGame);

/* ////// hardcoded data ////// */
app.get('/retrieve/:dataset', retrieveHardData);

/* ////// news ////// */
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

/* ////// planets ////// */
app.get('/planets/:systemId', planetController.getPlanets);

/* ////// players ////// */
app.get('/players/:gameId', checkAuth, playerController.getPlayers);

/* ////// settlements ////// */
app.get('/settlements/:planetId', settlementController.getSettlements);

/* ////// users ////// */
app.get('/users/:id', userController.getUser);




function listen() {
	const PORT = process.env.DEV ? process.env.NODE_PORT || 3003 : process.env.PORT;
	const portChalk = chalk.cyan.underline;
	app.listen(PORT, () => { console.log(portChalk(`eavesdropping_on_port_${PORT}`)) });
}
