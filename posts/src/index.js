const express = require("express");
const app = express();
const cors = require('cors');
const postsRouter = require("./routers/posts");

const PORT = process.env.PORT || 4000;

app.use(cors())

app.use(express.json())
app.use(postsRouter);

app.listen(PORT, () => {
  console.log(`Server is up and running on ${PORT}`);
});
