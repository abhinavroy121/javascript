const {Router} = require("express")
const blog = require("../model/Blog")
const userBlog = Router()


// userBlog.get("/:userid",async(req,res) => {
//      res.send("data")
// })

// when user posts a new blog
userBlog.post("/:userid/post",async(req,res)=>{
     try{
          const {title,url,user_id} = req.body;
          if(!title || !url || !user_id){
            return res.status(404).send({message:"Post Unsuccessful"})
          }
          else{
            let post = await new blog(req.body)
            post.save((err,success) => {
               if(err){
                return res.status(500).send({message:"Server not working"})
               }
               return res.status(200).send(success)
            })
           
          }
     }
     catch(err){
            return res.status(500).send({message:"Server Down found"})
     }
})

// when user fetch all the posts made by the user
userBlog.get("/:userid/posts",async(req,res)=>{
    try{
       let posts = await blog.find(req.body);
     return  res.status(200).send(posts)
    }
    catch(err) {
       return res.status(500).send({message:"No Posts Found"})
    }
})

// when user wants to see all the posts in the feed
userBlog.get("/posts",async(req,res)=>{
     try{
        let posts = await blog.find();
      return  res.status(200).send(posts)
     }
     catch(err) {
        return res.status(500).send({message:"No Posts Found"})
     }
 })

module.exports = userBlog;