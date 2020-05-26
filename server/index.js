const express = require('express')
	 , bodyParser = require('body-parser')
	 , history = require('connect-history-api-fallback')
	 , chalk = require('chalk');

const app = express();

app.use(history());
app.use(bodyParser.json());




const PORT = process.env.PORT || 3003;
const listenChalk = chalk.cyan.underline;
app.listen(PORT, () => { listenChalk(console.log(`listening on port ${PORT}`)) });