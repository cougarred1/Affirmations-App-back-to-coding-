const express = require('express');
const cors = require('cors');
const app = express();
const messages = require('./messages');

app.use(cors());
app.use(express.json());


app.get('/api/message', (req, res) => {

  //here we have a random index retrieved from the entire array of messages
  const randomMessageIndex = Math.floor(Math.random() * messages.length);

  //in the messages array, that index is retrieved, giving us the message output
  const randomMessage = messages[randomMessageIndex];

  res.json({ message: randomMessage });
});

app.get('/api', (req, res) => {
  res.json({ message: "Hello from the backend!" });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
