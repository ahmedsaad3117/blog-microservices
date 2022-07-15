const express = require("express");
const app = express();
const commentsRouter = require("./routers/comments");
const cors = require('cors');

const PORT = process.env.PORT || 4001;

app.use(cors());

app.use(express.json());
app.use(commentsRouter);

app.listen(PORT, () => {
  console.log(`Server is up and running on ${PORT}`);
});
