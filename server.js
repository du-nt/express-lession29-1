const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);

require("dotenv").config();

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

const userRoute = require("./routes/users/user.route");
const bookRoute = require("./routes/books/book.route");
const transactionRoute = require("./routes/transactions/transaction.route");
const authRoute = require("./routes/auths/auth.route");
const cartRoute = require("./routes/cart/cart.route");

const transactionRouteApi = require("./api/routes/transaction.route");
const authRouteApi = require("./api/routes/auth.route");
const userRouteApi = require("./api/routes/user.route");
const bookRouteApi = require("./api/routes/book.route");

const sessionMiddleware = require("./middlewares/session.middleware");

const app = express();

app.set("view engine", "pug");
app.set("views", "./views");

app.use(
  session({
    name: "sid",
    secret: "tuthanvinhsinh",
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({
      mongooseConnection: mongoose.connection
    }),
    cookie: {
      maxAge: 24 * 60 * 60 * 1000
    }
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(sessionMiddleware);

app.use(express.static("public"));

//Home
app.get("/", (req, res) => {
  res.redirect("/books");
});

//Books
app.use("/books", bookRoute);

//Users
app.use("/users", userRoute);

//Transactions
app.use("/transactions", transactionRoute);

//Auth
app.use("/auth", authRoute);

//Cart
app.use("/cart", cartRoute);

//Api
app.use("/api/transactions", transactionRouteApi);
app.use("/api/login", authRouteApi);
app.use("/api/users", userRouteApi);
app.use("/api/books", bookRouteApi);

//Handling 404
app.use((req, res) => {
  res.status(404).render("404");
});

// Handling 500
app.use((error, req, res, next) => {
  res.status(500).render("500");
});

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
