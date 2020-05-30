const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");
const Book = require("../../models/book.model");

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

module.exports.index = async (req, res) => {
  try {
    const { page, perPage } = req.query;
      const options = {
        page: parseInt(page, 10) || 1,
        limit: parseInt(perPage, 10) || 8,
      }
    const books = await Book.paginate({}, options);
    res.render("books", { books });
  } catch (err) {
    console.error(err);
  }
};

module.exports.deleteBook = (req, res) => {
  Book.findById(req.params.id).then(book =>
    book.remove().then(book => res.redirect("/books/manageBook"))
  );
};

module.exports.editBookGet = (req, res) => {
  Book.findById(req.params.id).then(book => res.render("edit", { book }));
};

module.exports.editBookPost = (req, res) => {
  const id = req.params.id;

  Book.findByIdAndUpdate(id, req.body, { new: true })
    .then(book => res.redirect("/books/manageBook"))
    .catch(err => console.log(err));
};

module.exports.addBook = (req, res) => {
  const { title, description } = req.body;

  if (req.file) {
    cloudinary.uploader.upload(req.file.path, { tags: "covers" }, function(
      err,
      result
    ) {
      const newBook = new Book({
        title,
        description,
        coverUrl: result.url
      });
      newBook
        .save()
        .then(book => res.redirect("/books/manageBook"))
        .catch(err => console.log(err));
    });
  } else {
    const newBook = new Book({
      title,
      description
    });
    newBook
      .save()
      .then(book => res.redirect("/books/manageBook"))
      .catch(err => console.log(err));
  }
};

module.exports.manageBook = (req, res) => {
  Book.find().then(books => res.render("manageBook", { books }));
};
