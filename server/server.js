require('dotenv').config();
const express = require('express')
	 , bodyParser = require('body-parser')
	 , history = require('connect-history-api-fallback')
	 , session = require('cookie-session')
	 , massive = require('massive')
	 , helmet = require('helmet')
	 , chalk = require('chalk');

const app = express();

app.use(session({
	name: 'session',
	keys: [process.env.SESSION_KEY_1, process.env.SESSION_KEY_2],
	secret: process.env.SESSION_SECRET,
	cookie: {
		secure: true,
		httpOnly: true,
		expires: new Date( Date.now() + 60 * 60 * 1000 ) // 1 hour
	 },
}));
app.use(history()); // allows use of vue-router history mode
app.use(bodyParser.json());
app.use(helmet());

app.use(express.static(`${__dirname}/../public`));

/* database connection */
// massive(process.env.DATABASE_URI).then(db => {
// 	let dbChalk = chalk.magenta;
// 	console.log(dbChalk('Connected to Database'));
// 	app.set('db', db);
// 	app.get('db').init.seed()
// 		.catch(res => console.error(res));
// 	listen();
// }).catch(() => {
// 	console.log(chalk.red('Could not connect to Database'))
// });



function listen() {
	const PORT = process.env.PORT || 3003;
	const portChalk = chalk.cyan.underline;
	app.listen(PORT, () => { console.log(portChalk(`eavesdropping_on_port_${PORT}`)) });
}
listen();