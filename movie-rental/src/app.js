//require("express-async-errors");
const express = require("express");
const path = require("path");
const helmet = require("helmet");
const morgan = require("morgan");
const config = require("config");
const mongoose = require("mongoose");
const logger = require("./middlewares/logger");
const genreRouter = require("./routes/genre");
const customerRouter = require("./routes/customer");
const movieRouter = require("./routes/movie");
const rentalRouter = require("./routes/rental");
const userRouter = require("./routes/user");
const authRouter = require("./routes/auth");
const defaultRouter = require("./routes/default");
// const error = require("./middlewares/error");

const app = express();
const staticFilePath = path.join(__dirname, "../public");

// if (!config.get('jwtPrivateKey')) {
//     console.log('FATAL ERROR: Missing JWT Private Key')
//     process.exit(1)
// }

const url = "mongodb://localhost:27017/MovieRental";
mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("MongoDB Connection Success!");
  })
  .catch(err => {
    console.log("Error: ", err);
  });

app.use(helmet());

if (app.get("env") !== "production") app.use(morgan("tiny"));
//JSON Parser Middleware
app.use(express.json()); //Sets req.body
app.use(logger); //Custom Middleware
app.use(express.static(staticFilePath));
app.use("/api/genres", genreRouter);
app.use("/api/customers", customerRouter);
app.use("/api/movies", movieRouter);
app.use("/api/rentals", rentalRouter);
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("*", defaultRouter);
//app.use(error);

const port = process.env.NODE_PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
