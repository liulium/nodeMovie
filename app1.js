//入口文件
var express=require("express");
//var path=require("path");
//var bodyParser=require("body-parser");
var port=process.env.PORT || 2000;//命令行或者默认3000
var app=express();

app.set("views","./views/pages");
app.set("view engine","pug");
//app.use(bodyParser.urlencoded({extended:false}));
//app.use(express.static(path.join(__dirname,'bower_components')));
app.listen(port);

console.log("server is on port " + port);

//路由
app.get("/",function(req,res){
	res.render("index",{
		title: 'Node 首页',
		 
	})
})

//detail
app.get("/movie/:id",function(req,res){
	res.render("detail.pug",{
		title:'Node 详情页',
		 
	})
})

app.get("/admin/movie",function(req,res){
	res.render("admin.pug",{
		title:'Node 后台录入页',
		 
	})
})

app.get("/admin/list",function(req,res){
	res.render("list.pug",{
		title:'Node 列表页',
		
	})
})