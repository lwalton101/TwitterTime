const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const hbs = require("hbs");
const exhbs = require("express-handlebars");
const axios = require('axios').default;
const api = require("./api");

app.listen(PORT, () => {
    console.log("Ready and listening at http://localhost:" + PORT);
})

//Register routes
require("./app")(app);
api.updateConfig.then(config => {
    api.restartInterval(config.intervalTime);
});

app.set('view engine', 'hbs');
app.engine('hbs', exhbs.engine({
    defaultLayout: 'main',
    extname: '.hbs'
}));

app.use(express.static(__dirname + '/public'));
hbs.registerPartials(__dirname + "/views/partials", function (err) {if(err) { throw err }});


