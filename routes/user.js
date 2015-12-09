var express = require('express'),
    router = express.Router()
    Users = require('../models/userSchema'),
    bcrypt = require('bcryptjs'),
    Promise	= require('q');

router.get('/', function(req, res){
	res.send([
		{ name:'Nitesh', contact:'142234'},
		{ name:'Brijesh', contact:'242234'},
		{ name:'Ritesh', contact:'342234'}
	]);
});

router.post('/register',function(req, res){
	console.log('posted');
	convertPasswordToHash(req.body.password)
	.then(function(data){
		console.log(req.body);
		req.body.password = data;
		console.log(req.body);
		(new	Users(req.body)).save()
		.then(function(data){
			console.log(data);
			res.send('ok');
		});	
	})
	.catch(function(err){
		res.send('someThing went Wrong oooopps');
	})
	
});
function convertPasswordToHash(password){
	var deferred  =	Promise.defer();
	bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(password, salt, function(err, hash) {
	        if(hash) {
	        	deferred.resolve(hash);
	        }
	        else {
	        	deferred.reject('not convert');
	        }
	    });
	});
	return deferred.promise;
}
module.exports = router;