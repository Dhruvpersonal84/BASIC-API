const express = require("express");
var methodOverride = require('method-override');
const path = require("path");
const app = express();
const port = 8080;
const { v4 :uuidv4 } = require("uuid");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({ extended: true })); 
app.use(methodOverride('_method'))


let posts = [{
    id:uuidv4(),
    username:"Dhruv Kumar",
    content:"life is beautiful"
},
{
    id:uuidv4(),
    username:"vignesh",
    content:"always try to do better"
},
{
    id:uuidv4(),
    username:"Rakesh",
    content:"never show anyone that you are weak"
}]


app.listen(port, ()=>{
    console.log(`started listening on port ${port}`)
})


app.get("/post",(req,res)=>{
    res.render("index.ejs",{posts});
})

app.get("/post/new",(req,res)=>{
    res.render("form.ejs");
})

app.post("/post",(req,res)=>{
    let {username, content} = req.body;
    let id = uuidv4();
    posts.push({id,username,content});
    res.redirect("/post");
})

app.get("/post/:id",(req,res)=>{
    let {id} = req.params;
    let post = posts.find(findid => id===findid.id);
    res.render("show.ejs",{post});
})

app.get("/post/:id/edit",(req,res)=>{
    let {id} = req.params;
  let post = posts.find(findid => id===findid.id);
  res.render("edit.ejs",{post});
})
  
app.patch("/post/:id",(req,res)=>{
    let {id} = req.params;
    let newcontent = req.body.content;
    let post = posts.find(findid => id===findid.id);
    post.content = newcontent;
    res.redirect("/post")
});

app.delete("/post/:id",(req,res)=>{
    let {id} = req.params;
    posts = posts.filter(findid => id!==findid.id);
    res.redirect("/post");
})