const express = require("express");
const router = express.Router();
const { randomBytes } = require("crypto");
const axios = require("axios");

const posts = {};

router.get("/posts", (req, resp) => {
  resp.send(posts);
});

router.post("/posts", async (req, resp) => {
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;

  posts[id] = {
    id,
    title,
  };

  await axios.post("http://localhost:4005/events", {
    type: "PostCreated",
    data: {
      id,
      title,
    },
  });

  resp.status(201).send(posts[id]);
});

router.post('/events',(req,res)=>{
  console.log('post event received',req.body.type)

  res.send({})
})

module.exports = router;
