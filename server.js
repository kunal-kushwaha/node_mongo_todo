const express = require('express');
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes/routes')

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://mongo:27017/mongoose_express_todos', {
    // mongo in above url is the container
    useNewUrlParser: true
}).then(() => {
    console.log('Database connected')
});

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

const mustacheExpressInstance = mustacheExpress();
mustacheExpressInstance.cache = null;
app.engine('mustache', mustacheExpressInstance);
app.set('view engine', 'mustache');
app.set('views', __dirname + '/views');

app.use('/', routes);

app.listen(3000, () => {
    console.log('Server has started')
})
