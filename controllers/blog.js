let _ = require('lodash');
const Post = require('../models/post')
const Comment = require('../models/comment')
const jwt = require("jwt-simple")

module.exports = {
  // get list post
  fetchPosts: (req, res, next) => {
    Post
    .find({})
    .select({})
    .limit(100)
    .sort({
      time: -1
    })
    .exec(function(err, posts){
      if(err) {
        console.log(err);
        return res.status(422).json({
          message: 'Error, couldnt retrieve posts'
        });
      }
      res.json(posts)
    });
  },
  // create new post
  createPost: (req, res, next) =>{
    
    const _id = jwt.decode(req.headers.authorization, "secretcode")

    const title = req.body.title;
    const categories = req.body.categories;
    const content = req.body.content;
    const authorId = _id.sub
    const authorName = req.body.username;
    const time = Date.now();

    //make sure title, and all content are not empti
    if(!title || !categories || !content) {
      return res.status(422).json({
        message: 'title, categories and content are all required'
      });
    }
    //create new
    const post = new Post({
      title: title,
      categories: _.uniq(categories.split(',').map((item) => item.trim())),
      content: content,
      authorId: authorId,
      authorName: authorName,
      time: time,
    });
    //save
    post.save(function(err, post){
      //callback func
      if(err) {
        return next(err);
      }
      res.json(post); //return the created post
    });
  },
  //fetch a single post by post id
  fetchPost: (req, res, next) => {
    Post.findById({
      _id: req.params.id
    }, function(err, post){
      if(err){
        console.log(err);
        return res.status(422).json({
          message: 'error, couldnt retrieve data'
        });
      }
      if(!post) {
        return res.status(404).json({
          message: 'error! post with the given ID is not exist'
        })
      }
      res.json(post); //return the single blog post
    })
  },
  allowUpdateOrDelete: (req, res, next) => {
    const user = req.user;

    //find the post by post id
    Post.findById({
      _id: req.params.id
    }, function(err, post){
      if(err){
        console.log(err);
        return res.status(422).json({
          message: 'error! couldnt retrieve the post with the given post ID'
        });
      }
      //check if the post exist
      if(!post) {
        return res.status(404).json({
          message: 'error! the post with the given id isnt exist'
        });
      }
      console.log(user._id);
      console.log(post.authorId)
      //check if the user id is equal to the author ID
      if(!user._id.equals(post.authorId)){
        return res.send({allowChange: false});
      }
      res.send({allowChange: true});
    });
  },
  updatePost: (req, res, next) => {
    const user = req.user;

    Post.findById({
      _id: req.params.id
    }, function(err, post){
      if(err) {
        console.log(err);
        return res.status(422).json({
          message: 'error'
        })
      }
      //cek if the post exist
      if(!post) {
        return res.status(422).json({
          message: 'error!, the post with the given id isnt exist'
        });
      }
      //make sure ID is equal to the authod id
      if (!user._id.equals(post.authorId)) {
        return res.status(422).json({
          message: 'error! you have no authority bujaaang'
        })
      }
      //make sure title categories and content are not empty
      const title = req.body.title;
      const categories = req.body.categories;
      const content = req.body.content;

      if(!title || !categories || !content) {
        return res.status(422).json({
          message: 'title, categories and content all are required'
        })
      }
      //update user
      post.title = title;
      post.categories = _.uniq(categories.split(',').map((item)=> item.trim()))
      post.content = content;

      //save user
      post.save(function(err, post){
        //callback
        if(err) {
          return next(err);
        }
        res.json(post); //return the updated post
      })
    })
  },
  // delete the post
  deletePost: (req, res, next) => {
    Post.findByIdAndRemove(req.params.id, function(err, post) {
      if (err) {
        return next(err);
      }
      if (!post) {
        return res.status(422).json({
          message: 'Error! The post with the given ID is not exist.'
        });
      }
  
      // Delete comments correspond to this post
      Comment.remove({ postId: post._id }, function(err) {
        if (err) {
          return next(err);
        }
      });
  
      // Return a success message
      res.json({
        message: 'The post has been deleted successfully!'
      });
    });
  },
  fetchPostByAuthorId : (req, res, next) => {
    const user = req.user;

  // Fetch posts by author ID
  Post
    .find({
      authorId: user._id
    })
    .select({})
    .limit(100)
    .sort({
      time: -1
    })
    .exec(function(err, posts) {
      if (err) {
        console.log(err);
        return res.status(422).json({
          message: 'Error! Could not retrieve posts.'
        });
      }
      res.json(posts);
    });
  },

  //COMMENT SECTION
  createComment: (req, res, next)=> {
    const user = req.user;

    if (!user) {
      return res.status(422).json({
        message: 'You must sign in before you can post new comment.'
      });
    }
  
    // Get post ID
    const postId = req.params.postId;
  
    // Get content and make sure it is not empty
    const content = req.body.content;
    if (!content) {
      return res.status(422).json({
        message: 'Comment cannot be empty.'
      });
    }
  
    // Create a new comment
    const comment = new Comment({
      content: content,
      authorId: user._id,
      authorName: user.firstName + ' ' + user.lastName,
      postId: postId,
      time: Date.now(),
    });
  
    // Save the comment
    comment.save(function(err, comment) {  // callback function
      if (err) {
        return next(err);
      }
      res.json(comment);  // return the created comment
    });
  },
  fetchCommentsByPostId: (req, res, next) => {
    Comment
    .find({
      postId: req.params.postId
    })
    .select({})
    .limit(100)
    .sort({
      time: 1
    })
    .exec(function(err, comments) {
      if (err) {
        console.log(err);
        return res.status(422).json({
          message: 'Error! Could not retrieve comments.'
        });
      }
      res.json(comments);
    });
  }

}