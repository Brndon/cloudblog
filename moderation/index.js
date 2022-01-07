const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());


app.post('/events', async (req, res) => {
  //do something with the event

  const { type, data } = req.body;

  //reject comment if content contains the word "orange"
  if (type === 'CommentCreated') {
    const status = data.content.includes('orange') ? 'rejected' : 'approved';


    await axios.post('http://event-bus-srv:4005/events', {
      type: 'CommentModerated',
      data: {
        id: data.id,
        postId: data.postId,
        status,
        content: data.content
      }
    }).catch((err) => {
      console.log(err.message);
    });
  }

  console.log('Received Event', req.body.type);


  res.send({});
});

app.listen(4003, () => {
  console.log('Moderation Service - Listening on 4003');
});
