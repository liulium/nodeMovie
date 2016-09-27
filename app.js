//入口文件
var express=require("express");
var path=require("path");
var bodyParser=require("body-parser");
var mongoose=require("mongoose");
var Movie=require("./models/movie.js");
var _=require("underscore");
var port=process.env.PORT || 3000;//命令行或者默认3000
var app=express();

mongoose.connect("mongodb://localhost/Node");

app.set("views","./views/pages");
app.set("view engine","pug");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,'bower_components')));
app.listen(port);

console.log("server is on port " + port);

//路由
app.get("/",function(req,res){
	Movie.fetch(function(err,movies){
		if(err){
			console.log(err);
		}
		res.render("index",{
			title: 'Node 首页',
			movies: movies
		})
	})
})

//detail
app.get("/movie/:id",function(req,res){
	var id=req.params.id;

	Movie.findById(id,function(err,movie){
		if(err){
			console.log(err);
		}
		res.render("detail",{
			title:'Node 详情页',
		 	movie:movie
		})
	})
	
})
app.get("/admin/movie",function(req,res){
	res.render("admin",{
		title:'Node 后台录入页',
		movie:{
			title:"",
			doctor:"",
			country:"",
			year:"",
			poster:"",
			flash:"",
			summary:"",
			language:""
		}
	})
})

//admin update movie
app.get('/admin/update/:id',function(req,res){
	var id=req.params.id;
	
	if(id){
		Movie.findById(id,function(err,movie){
			res.render('admin',{
				title:'Node 后台更新页',
				movie:movie
			})
		})
	}
})

//admin post movie
app.post('/admin/movie/new',function(req,res){
	var id=req.body.movie._id;
	var movieObj=req.body.movie;
	var _movie;

	if(id !==undefined){
		Movie.findById(id,function(err,movie){
			if (err) {
				console.log(err);
			}
			_movie=_.extend(movie,movieObj);
			//把movieObj对象属性覆盖到movie上，返回movie
			_movie.save(function(err,movie){
				if (err) {
					console.log(err);
				}
				res.redirect('/movie/'+movie._id);
			})
		})
	}else{
		_movie=new Movie({
			doctor:movieObj.doctor,
			title:movieObj.title,
			country:movieObj.country,
			language:movieObj.language,
			year:movieObj.year,
			poster:movieObj.poster,
			summary:movieObj.summary,
			flash:movieObj.flash
		})
		_movie.save(function(err,movie){
				if (err) {
					console.log(err);
				}
				res.redirect('/movie/'+movie._id);
			})
	}
})

app.get("/admin/list",function(req,res){
	Movie.fetch(function(err,movies){
		if(err){
			console.log(err);
		}
		res.render("index",{
			title: 'Node 列表页',
			movies: movies
		})
	})
})