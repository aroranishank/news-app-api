const winston = require("winston");
const cors = require("cors");
const filters = require("./routes/filter");
const search = require("./routes/search");
const user = require("./routes/user");

const express = require("express");
const mongoose = require("mongoose");

winston.exceptions.handle(
  new winston.transports.Console({ colorize: true, prettyprint: true }),
  new winston.transports.File({ filename: "uncaughtExceptions.log" })
);

process.on("unhandledRejection", (error) => {
  throw error;
});

winston.add(new winston.transports.File({ filename: "logfile.log" }));

require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/feed", search);
app.use("/api/user", user);
app.use("/api/categories", filters);

app.get("/api", (req, res) => {
  res.send("welcome to the news app api...");
});

const uri = process.env.ATLAS_URI;
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port: ${port}...`);
});

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => console.log("MongoDB connection established..."))
  .catch((error) => console.error("MongoDB connection failed:", error.message));
