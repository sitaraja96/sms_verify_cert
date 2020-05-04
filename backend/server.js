// server.js
// where your node app starts

require('dotenv').config();

// init server
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const port =  8080;
const Nexmo = require('nexmo');
const SmsProxy = require('./SmsProxy');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));


// Create and Initialize Nexmo client
const nexmo = new Nexmo({
  apiKey: process.env.API_KEY,
  apiSecret: process.env.API_SECRET,
}, {debug: true});

app.post('/getsms', function(req, res) {
    nexmo.message.sendSms(req.body.from, req.body.to, req.body.text,{
      type: "unicode",
    }, (err, responseData) => {
      if (err) {
        console.log(err);
      } else {
        if (responseData.messages[0]['status'] === "0") {
          console.log("Message sent successfully.");
          console.log(responseData)
          res.send({response: responseData.messages[0]})
        } else {
          console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
        }
      }
  });
});


app.post('/verify', (req, res) => {
  verifyRequestNumber = req.body.phoneNumber;
  nexmo.verify.request({
      number: verifyRequestNumber,
      brand: process.env.BRAND_NAME
  }, (err, result) => {
      if (err) {
          console.error(err);
      } else {
        
        if (result.status === "0") {
          verifyRequestId = result.request_id;
          console.log(`request_id: ${verifyRequestId}`);
          console.log(`status: ${result.status}`);
          res.send({response: result})
        }else{
          console.log(`Request was unsuccesful!`);
        }
      }
  });
});

app.post('/checkverify', (req, res) => {
  nexmo.verify.check({
      request_id: req.body.requestId,
      code: req.body.token
  }, (err, result) => {
      if (err) {
          console.error(err);
      } else {
          if (result.status == 0) {
            console.log(`Check Verify API successful`)
            console.log(`request_id: ${result.request_id}`);
            res.send({response: result})
          }
      }
  });
});


const smsProxy = new SmsProxy();


app.get('/webhooks/inbound-sms', (req, res) => {
  const from = req.query.msisdn;
  const to = req.query.to;
  const text = req.query.text;
  smsProxy.proxySms(from, text);

  //res.status(200).end();
  res.sendStatus(204);
});

app.post('/chat', (req, res) => {
  const userANumber = req.body.userANumber;
  const userBNumber = req.body.userBNumber;

  smsProxy.createChat(userANumber, userBNumber, (err, result) => {
      if (err) {
          res.status(500).json(err);
      }
      else {
          res.json(result);
      }
  });
  res.send('OK');
});



if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client/build')));

  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));
