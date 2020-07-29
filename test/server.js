#!/usr/bin/env node
// simple test-app server

const PORT = 3069;
const fs = require('fs');
const http = require('http');
const webpack = require('webpack');
const wpCfg = require('./webpack.config');
const watcher = require('nodemon')(undefined, {
	ignored: /.*test\/.*\.bundle.js/,
});

if (watcher) {
	watcher.on('change', f => console.log('----- changed:', f));

	// run webpack in the watchers thread
	webpack(wpCfg()).watch(undefined, (err, stats) => {
		if (err)
			console.error(err)
		else
			console.log(stats.toString({colors: true}));

	});
	console.log("-- started webpack --");
	return;
}

// serve files
const server = http.createServer((req, res) => {
	console.log("serving:", req.url)
	if (req.url === '/')
		req.url = '/index.html';
	fs.readFile(__dirname + req.url, (err, data) => {
		if (err) {
			res.writeHead(404);
			res.end(JSON.stringify(err));
		} else {
			res.writeHead(200);
			res.end(data);
		}
	});
}).listen(PORT, () => console.log(`-- started http server http://localhost:${PORT} --`));
