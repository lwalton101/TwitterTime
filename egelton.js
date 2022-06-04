const { default: axios } = require("axios");
const fs = require("fs");
const { emitKeypressEvents } = require("readline");
let tweets = new Map();

axios.get("https://api.twitter.com/2/users/1115356519233728514/tweets?max_results=100", {
    headers: {
        Authorization: 'Bearer AAAAAAAAAAAAAAAAAAAAAIqocwEAAAAAYOwyi0qi%2Fs%2BUZUl%2FSbXzcV9T8Fo%3DDITFi3qPgsJHqwu2THCNtUH5y61v9mfBALj99emWp5gmhcXzJE'
    }
}).then(res => {
    let json = JSON.parse(JSON.stringify(res.data));

    json["data"].forEach(element => {
        tweets.set(element["id"], element["text"]);
    });

    if(json["meta"]["next_token"]){
        getTweets(json["meta"]["next_token"])
    }
})

function getTweets(pageToken){
    axios.get("https://api.twitter.com/2/users/1115356519233728514/tweets?max_results=100&pagination_token=" + pageToken, {
    headers: {
        Authorization: 'Bearer AAAAAAAAAAAAAAAAAAAAAIqocwEAAAAAYOwyi0qi%2Fs%2BUZUl%2FSbXzcV9T8Fo%3DDITFi3qPgsJHqwu2THCNtUH5y61v9mfBALj99emWp5gmhcXzJE'
    }
}).then(res => {
    let json = JSON.parse(JSON.stringify(res.data));

    json["data"].forEach(element => {
        tweets.set(element["id"], element["text"]);
    });

    if(json["meta"]["next_token"]){
        getTweets(json["meta"]["next_token"])
    } else{
        fs.writeFile("tweets.json", JSON.stringify(Object.fromEntries(tweets)), err => {
            if (err) {
                console.error(err);
              }            
        })
    }
})}


