# React Project with Node Express Backend

> Example on using React application with a Node Express Backend to run Nexmo APIs

## Usage

```

Install server and client dependencies by going to their root directories (backend , frontend-app folders).

```
1) cd backend
2) npm install
3) Change Directory to frontend-app
4) npm install
```

Update the .env file. Insert values for API_KEY, API_SECRET VIRTUAL_NUMBER. 

To start the server (runs on port 8080)

```
Change Directory to backend
node server.js

```
To start the client 
```
Change Directory to frontend-app
```
npm start
```
Run ngrok application. Listen to port 8080
```
ngrok http 8080
```
Update the webhook url in your account settings under "inbound messages". it will look like this!
```
https://3c0f9127.ngrok.io/webhooks/inbound-sms
```

## Running the Application
1) Enter your First name, last name and phone number (1st user) --- verify the user when popup appears.
2) Register 2nd user as above
3) Click let's chat
4) In the next page, enter the two numbers to engage in a chat.


The proxy for has been configured in this React app at port 8080. 
This tells Webpack development server to proxy our API requests to our API server, given that our Express server is running on localhost:8080. Kindly do not change the port number.





