var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect("mongodb://localhost/todolist");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

//Schema
var todolistSchema = new mongoose.Schema({
	todo: String
});

var Todolist = mongoose.model("Todolist", todolistSchema);

// Todolist.create(
// 	{
// 		todo: 'wake up'
// 	}, function(err, data){
// 		if(err) {
// 			console.log(err);
// 		} else {
// 			console.log('New todolist');
// 			console.log(data);
// 		}
// 	});


app.get("/", function(req,res){
	res.render("landing");
});

app.get("/todolist", function(req,res){
	// Get all todos from DB
	Todolist.find({}, function(err, allTodos){
		if(err){
			console.log(err);
		} else {
			res.render("todolist", {todolist:allTodos});
		}
	});
});

app.post("/todolist", function(req,res){
	var name = req.body.name;
	var newTodolist = {todo:name};
	// todolist.push(newTodolist);
	Todolist.create(newTodolist, function(err, newlyCreated){
		if(err){
			console.log(err);
		} else {
			res.redirect("/todolist");
		}
	});
});

app.get("/todolist/new", function(req,res){
	res.render("new");
});

app.listen(3000,function(){
	console.log("Server is listening");
});