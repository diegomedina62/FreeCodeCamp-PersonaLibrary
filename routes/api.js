/*
*
*
*       Complete the API routing below
*       
*       
*/

'use strict';
const Book = require("../models/models")

module.exports = function (app) {

  app.route('/api/books')
    .get(async function (req, res){
      //response will be array of book objects
      //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
      const booksArray = await Book.find()
      res.status(200).json(booksArray)

    })
    
    .post(async function (req, res){
      let title = req.body.title;
      //response will contain new book object including atleast _id and title
      try {
        
        const book = await Book.create(req.body)
        res.status(200).json({_id:book._id,title:book.title})
        
      } catch (error) {
        res.send(error.errors.title.message)
      }
    })
    
    .delete(function(req, res){
      //if successful response will be 'complete delete successful'
      Book.deleteMany({}).exec((err, result) => {
        if(err){res.status(500)}
        res.send("complete delete successful")
      });
    });



  app.route('/api/books/:id')
    .get(async function (req, res){
      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
      try {
        let bookid = req.params.id;
        const book= await Book.findById(bookid)
        if(!book){return res.status(200).send("no book exists")}
        res.status(200).json(book)

      } catch (error) {
        console.log(error)
      }

    })
    
    .post(async function(req, res){
      //json res format same as .get
      try {
        let bookid = req.params.id;
        let comment = req.body.comment;
        if(!comment){return res.status(200).send("missing required field comment")}
        const book = await Book.findById(bookid)
        if(!book){return res.status(200).send("no book exists")}
        book.commentcount++
        book.comments.push(comment)
        const newComment = await book.save()
        res.status(200).json(newComment)
      } catch (error) {
        res.status(500).json(error)
      }
    })
    
    .delete(async function(req, res){
      let bookid = req.params.id;
      //if successful response will be 'delete successful'
      try {
        const book = await Book.findByIdAndDelete(bookid)
        if(!book){return res.status(200).send("no book exists")}
        res.send("delete successful")
      } catch (error) {
        res.status(500).json(error)
      }
    });
  
};
