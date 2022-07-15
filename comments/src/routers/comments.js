const express = require("express");
const router = express.Router();
const { randomBytes } = require("crypto");
const axios = require("axios");

const commentsByPostId = {};

router.get("/posts/:id/comments", (req, resp) => {
  resp.send(commentsByPostId[req.params.id] || []);
});

router.post("/posts/:id/comments", (req, resp) => {
  const commentId = randomBytes(4).toString("hex");
  const { content } = req.body;

  const commemts = commentsByPostId[req.params.id] || [];

  commemts.push({ id: commentId, content });

  commentsByPostId[req.params.id] = commemts;

  axios.post("http://localhost:4005/events", {
    type: "CommentCreated",
    data: {
      id: commentId,
      content, 
      postId: req.params.id,
    },
  });

  resp.status(201).send(commemts);
});

router.post('/events',(req,res)=>{
  console.log('comment event received',req.body.type)

  res.send({})
})

module.exports = router;
