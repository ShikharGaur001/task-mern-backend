require("dotenv").config();
const express = require("express");
const { errorHandler } = require("./middlewares/error.middleware");
const connectDB = require("./connections/database");
const cors = require('cors')

connectDB();
const PORT = process.env.PORT || 5000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())

app.use("/api/tasks", require("./routes/task.routes"));
app.use("/api/users", require("./routes/user.routes"));

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
