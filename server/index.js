require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const logger = require("./utils/logger");

const authRoute = require("./routes/auth");
const postRoute = require("./routes/post");

const getMongoUri = () => {
  const {
    DB_USERNAME = '',
    DB_PASSWORD = '',
    DB_HOST = 'cluster0.mongodb.net',
    DB_NAME = 'learnit',
  } = process.env;

  return `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}?retryWrites=true&w=majority`;
};

const connectDB = async () => {
  try {
    await mongoose.connect(getMongoUri(), {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });

    logger.info("MongoDB connected successfully");
  } catch (error) {
    logger.error("MongoDB connection error", { error: error.message });
    process.exit(1);
  }
};

connectDB();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => logger.info(`Server started on port ${PORT}`));
