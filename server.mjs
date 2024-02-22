import express from "express";
import admin from 'firebase-admin';

const api = express();
const port = 3000;

// Initialize the default app
var app = admin.initializeApp({
  credential: admin.credential.cert('./chromatic-alloy-350109-358f6672ef84.json')
});

var defaultAuth = admin.auth();

// endpoint that accepts sign-in credentials from users and returns a custom JWT token
api.post('/signin', (req, res) => {
  // extract the email and password from the request header
  var email = req.headers.email;
  var password = req.headers.password;
  var uid = email + password;

  defaultAuth
  .createCustomToken(uid)
  .then((customToken) => {
    res.send(customToken);
  })
  .catch((error) => {
    console.log('Error creating custom token:', error);
  });
});

api.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
