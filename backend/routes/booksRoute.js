import  express  from "express";
import {Book} from "../models/bookModel.js";

const router = express.Router();

//route to save book
router.post("/", async(req, res)=>{
    try {
        if(
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear 
           
        ) {
            return res.status(400).send({
                message: "send all required feilds: title, author, publisheYear",
            })
        }

        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear,
            
        };

        const book = await Book.create(newBook);
        return res.status(201).send(book);
        
    }
    catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
});


//Get all books
// Route for Get All Books from database
router.get('/', async (request, response) => {
    try {
      const books = await Book.find({});
  
      return response.status(200).json({
        count: books.length,
        data: books,
      });
    } catch (error) {
      console.log(error.message);
      response.status(500).send({ message: error.message });
    }
  });

// Route to get all books from database by id
router.get("/:id", async(req, res)=> {
    try {
        const {id} = req.params;

        const books = await Book.findById(id);
        if (books == null) {
            return res.status(401).send({message: "Book Not Found"});
        }
        return res.status(200).json(books);
       
    } catch (error) {
        console.log(error.message)
        res.status(500).send({message: error.message});
    }
});

//Route to edit book
router.put("/:id", async(req, res)=> {
    try {
        if (
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear

        ) {
            return res.status(400).send({
                message: "send all required feilds: title, author, publisheYear",
            });

        }

        const {id} = req.params;
        const result = await Book.findByIdAndUpdate(id, req.body);
        if (!result) {
            return res.status(404).json({message: "Book not found"});
        }
        return res.status(200).send({message: "Book Updated succssfully"});
    }
    catch (error) {
        console.log(error);
        res.status(500).send({message: error.message});
    }
});

//Route to delete book
router.delete("/:id", async(req, res)=> {
    try {
        const {id} = req.params;

        const result = await Book.findByIdAndDelete(id);
        if (!result) {
            return res.status(404).send({message: "Book not found"});
        }
        return res.status(200).send({message: "Book Deleted succssfully"});


    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message});
    }
});

export default router;