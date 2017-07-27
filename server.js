// server.js

// init project
const express = require('express'),
      useragent = require('express-useragent');
const app = express();

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

const router = express.Router();
//use express-useragent middleware first
app.use(useragent.express());
router.use((req, res) => {
	const data = {
		ip: req.ip,
		language: req.acceptsLanguages()[0],
		browser: req.useragent.browser,
		os: req.useragent.os,
		platform: req.useragent.platform
	};
	res.type('json').send(JSON.stringify(data, null, 1));
});
//Serve the static files directly by built-in middleware func
app.use('/public', express.static(`${process.cwd()}/public`));
app.use('/api/whoami', router);
// Respond not found to all the wrong routes
app.use(function(req, res, next){
  res.status(404);
  res.type('txt').send('404 - Page Not Found');
});

// listen for requests :)
const listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
