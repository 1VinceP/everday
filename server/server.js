require('dotenv').config();
const express = require('express')
	 , bodyParser = require('body-parser')
	 , history = require('connect-history-api-fallback')
	 , session = require('express-session')
	 , massive = require('massive')
	 , helmet = require('helmet')
	 , chalk = require('chalk');

const authController = require('./controllers/authController')
	 , userController = require('./controllers/userController')
	 , gamesController = require('./controllers/gamesController');

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
// process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;
massive(process.env.DATABASE_URI).then(db => {
	let dbChalk = chalk.magenta;
	console.log(dbChalk('Connected to Database'));
	app.set('db', db);
	app.get('db').init.seed()
		.catch(res => console.error(res));
	listen();
}).catch((err) => {
	console.log(chalk.red('Could not connect to Database'))
	console.log(err);
});

/* authentication */
app.post('/auth/login', authController.login);
app.post('/auth/logout', authController.logout);
app.get('/auth/checkSession', authController.checkSession);

/* users */
app.get('/users/:id', userController.getUser);

/* games */
app.get('/games/:userId', gamesController.getGames);
app.delete('/games/:id', checkAuth, gamesController.deleteGame);

/* news */
app.get('/news', (req, res) => {
	const news = require('./news').filter(article => !article.archived);
	res.status(200).send(news);
});
app.get('/news/archives', (req, res) => {
	const news = require('./news');
	res.status(200).send(news);
});




function listen() {
	const PORT = process.env.NODE_PORT || 3003;
	const portChalk = chalk.cyan.underline;
	app.listen(PORT, () => { console.log(portChalk(`eavesdropping_on_port_${PORT}`)) });
}