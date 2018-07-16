var express = require('express');
var app = express();
var fs = require('fs')
var bodyParser = require('body-parser');

var stringifyFile = '';

app.use(bodyParser.json());

app.get('/getNote', function (req, res) {
	console.log('Otrzymałem żądanie GET do strony getNote');
	fs.readFile('./note.json', 'utf8', function(err, data) {
		if (err) throw err;
		stringifyFile = data;
		res.send(data);
	});
});

app.post('/updateNote/:note', function (req, res) {
	console.log('Otrzymałem żądanie POST do strony getNote/:note');
	stringifyFile += req.params.note;
	fs.writeFile('./note.json', stringifyFile, function(err, data) {
		if (err) throw err;
		console.log('File updated');
	});
});

app.use(function (req, res, next) {
	res.status(404).send('Wybacz, nie mogliśmy odnaleźć tego, czego żądasz!')
});

app.listen(3000);