const axios = require('axios').default;
let intervalId;
let config;

let updateConfig = new Promise(function(resolve, error){
    const options = {
        method: 'GET',
        url: 'https://api.jsonbin.io/b/629d119705f31f68b3b732a4/latest',
        headers: {
          'secret-key': '$2b$10$yJBxI6cXBjzDtHtiKqc5J.gF80lyJNsMZLrwKfOISAL9a0ZOn09K.'
        }
    };
    
    axios.request(options).then(function (response) {
        config = JSON.parse(JSON.stringify(response.data));
        resolve(config);
    }).catch(function (error) {
        console.error(error);
        error(error);
    });
});

function hasConfig(req, res, next){
    if(configValid()){
        next();
    } else{
        res.redirect("setup");
    } 
}

function configValid(){
    for(var option in config){
        if(config[option] === ""){
            return false;
        }
    }

    return true;
}

//Starts/Restarts interval
function restartInterval(intervalTime){
    if(intervalId){
        clearInterval(intervalId);
    }

    setInterval(() => {
        if(config){
            //API-Football stuff
        } else{
            console.log("Config not found");
        }    
    }, config.intervalTime * 1000);    
}

module.exports = {
    hasConfig,
    updateConfig,
    restartInterval,
    configValid, 
    config
}