const {TwitterApi} = require("twitter-api-v2");
const client = new TwitterApi({ clientId: "UnRhZnFMUUNicEd1ZDUyTHN5YXo6MTpjaQ" });
const axios = require('axios').default;
const {hasConfig} = require("./api");

module.exports = function(app){
    app.get("/",hasConfig, (req,res) => {
        res.render("index");
    });
    app.get("/tweet", (req,res) => {
        const options = {
            method: 'POST',
            url: 'https://api.twitter.com/2/tweets',
            headers: {
                cookie: 'guest_id=v1%253A165333379072614268',
                'Content-Type': 'application/json',
                Authorization: 'OAuth oauth_consumer_key="3bmnEzbF1Ku9E67aQXvYKTEs3", oauth_nonce="6CAH7XWkipLNrjp0bDfdHHAcaVuHYuPA", oauth_signature="MRD5DXVFrFmnuDZGDmHn66udKlM%3D", oauth_signature_method="HMAC-SHA1", oauth_timestamp="1654344265", oauth_token="1528814041120088065-JE5Cdn5VESMCpZwfCQ3hY9TZ4HyN4N", oauth_version="1.0"'
            },
            data: {text: req.query.value}
        };

        axios.request(options).then(function (response) {
            res.send(response.data);
        }).catch(function (error) {
            console.error(error);
        });
    })

    app.get("/api/config", (req,res) => {
        const options = {
            method: 'PUT',
            url: 'https://api.jsonbin.io/b/629b6f48402a5b38021c5cb2',
            headers: {
              'X-Master-Key': '$2b$10$C4gyj8eQoW1.$2b$10$yJBxI6cXBjzDtHtiKqc5J.gF80lyJNsMZLrwKfOISAL9a0ZOn09K.',
              'Content-Type': 'application/json'
            },
            data: {consumerKey: req.query.consumerKey, consumerSecret: req.query.consumerSecret, tokenKey: req.query.consumerSecret, tokenSecretKey: req.query.consumerSecret}
          };

          axios.request(options).then(function (response) {
            res.send(response.data);
          }).catch(function (error) {
            console.error(error);
          });
    });

    app.get("/setup", (req,res) => {
        res.render("setup")
       });
}