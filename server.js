var express = require('express');
var app 	= express();
var mongojs = require('mongojs');
var db		= mongojs('contactlist',['contactlist']);
var bodyparser = require('body-parser');

app.use(express.static(__dirname + "/public"));
app.use(bodyparser.json());

app.get('/contactlist', function(req,res)
{
	console.log('Received a GET request!');

	db.contactlist.find(function(err,docs)
	{
		console.log(docs);
		res.json(docs);
	});	

});

app.get('/contactlist/:id', function(req,res)
{
	var id = req.params.id;
	console.log('Received a GET request for id %s !',id);

	db.contactlist.find({ _id: mongojs.ObjectId(id) }, function(err,doc)
	{
		console.log(doc);
		res.json(doc);
	});	

});

app.post('/contactlist', function(req, res)
{
	db.contactlist.insert(req.body, function(err, doc){

		res.json(doc);

	});
});

app.delete('/contactlist/:id', function(req, res){
	var id = req.params.id;
	console.log("Received a request to delete contact with _id "+ id);
	db.contactlist.remove({_id: mongojs.ObjectId(id)}, function(err, doc){
		res.json(doc);
	});
});

app.put('/contactlist/:id', function(req,res)
{
	var id = req.params.id;
	console.log("Received an Update request contact with _id "+ id);

	db.contactlist.findAndModify( {query: {_id: mongojs.ObjectId(id)},
		update: {$set: {name: req.body.name, email: req.body.email, number: req.body.number}},
		new: true}, function(err, doc){
			res.json(doc);
		});
});

var server = app.listen(3000, function () {

	var host = server.address().address;
	var port = server.address().port;

	console.log('Server listening at http://%s : %s', host, port);

});