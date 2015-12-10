var express = require('express'),
    router = express.Router()
    Users = require('../models/userSchema'),
    bcrypt = require('bcryptjs'),
    Promise	= require('q');

router.post('/login',function(req, res){
	
	Users.findOne({email: req.body.email})
	.then(function(data, error){
		if(error){
			console.log(error);
			res.send({message:"someThing went Wrong sorry"});
		}
		else if(data){
			
			comparePasswordToHash(req.body.password, data.password)
			.then(function(matchValue){
				if(matchValue == 'matched')
					res.send({data:data, message:'ok'});
				else if(matchValue == 'unmatched')
					res.send({message:"password not match please enter correct password"});
				else 
					res.send({message:"someThing went Wrong sorry"});
			})
			.catch(function(error){
				console.log(error);
				res.send({message:"someThing went Wrong sorry"});
			});
		}
		else{
			res.send({message:"user not found please enter valid eamil"});
		}
	});

});

router.post('/register',function(req, res){
	
	convertPasswordToHash(req.body.password)
	.then(function(data){
		req.body.password = data;
		(new Users(req.body)).save()
		.then(function(data){
			if (data) {
				res.send({message:'ok'});
			}
			else {
				res.send({message:'error'});
			}
		},function(error){
			res.send({message:'user alredy exist or invalid email'});
		});	
	})
	.catch(function(err){
		res.send({message:'someThing went Wrong oooopps'});
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

function comparePasswordToHash(password, hash){
	var deferred  =	Promise.defer();
	bcrypt.compare(password, hash, function(error, res) {
    	if(res){
    		return deferred.resolve('matched');
    	}
    	else if(error){
    		return deferred.reject(error)
    	}
    	else{
    		return deferred.resolve('unmatched');
    	}
	});
	return deferred.promise;
}
module.exports = router;