// Load environment variables
require('dotenv').config();

// Import Express.js
const express = require('express');

// Create an Express app
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Set port
const port = process.env.PORT || 3000;

// Route for GET requests
app.get('/', (req, res) => {
  const { 'hub.mode': mode, 'hub.challenge': challenge, 'hub.verify_token': token } = req.query;
  const verifyToken = process.env.VERIFY_TOKEN;

  if (mode === 'subscribe' && token === verifyToken) {
    console.log('WEBHOOK VERIFIED');
    res.status(200).send(challenge);
  } else {
    res.status(403).end();
  }
});

// Route for POST requests
app.post('/', (req, res) => {
  const timestamp = new Date().toISOString().replace('T', ' ').slice(0, 19);
  console.log(`\n\nWebhook received ${timestamp}\n`);
  console.log(JSON.stringify(req.body, null, 2));

  // Basic example: acknowledge receipt and handle events
  if (req.body && req.body.object) {
    // TODO: implement event handling logic here
  }

  res.status(200).json({ status: 'received' });
});

// Export app for testing and start server only when run directly
module.exports = app;

if (require.main === module) {
  // Start the server
  app.listen(port, () => {
    console.log(`\nListening on port ${port}\n`);
  });
}
