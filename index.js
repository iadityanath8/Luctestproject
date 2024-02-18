const express = require('express')
const Oauth2data = require('./client_secret.json')
const { google } = require('googleapis')
const cors = require('cors')

let title,description
let tags = []

const app = express()

app.use(cors());


app.use(express.json())

const client_id = Oauth2data.web.client_id;
const client_secret = Oauth2data.web.client_secret;
const redirect = Oauth2data.web.redirect_uris[0];

const Oauth2client = new google.auth.OAuth2(
  client_id,
  client_secret,
  redirect
)

let authed = false;
let scopes = "https://www.googleapis.com/auth/youtube.upload https://www.googleapis.com/auth/userinfo.profile"

app.get('/',(req,res) => {
  
  try {
    if(!authed){
      const ourl = Oauth2client.generateAuthUrl({
        access_type:"offline",
        scope:scopes
      })
      
      res.status(200).send({url:ourl})
    } 
  } catch (error) {
    res.status(500).send({message:error})
  }
})

app.listen(5000,() => {
  console.log("server is running in port",5000)
})