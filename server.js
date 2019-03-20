const express = require('express');
const mustacheExpress = require('mustache-express'); // view engine
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes/routes')

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/mongoose_express_todos', {
// mongoose.connect('mongodb://mongo:27017/mongoose_express_todos', {
    // useMongoClient: true,
    useNewUrlParser: true
}).then(() => {
    console.log('Database connected')
});

const app = express();
app.use(bodyParser.urlencoded({extended: true}));

const mustacheExpressInstance = mustacheExpress();
mustacheExpressInstance.cache = null;   // this is so we can make changes in future
app.engine('mustache', mustacheExpressInstance);
app.set('view engine', 'mustache'); // for the view engine any file with a mustache extension will be considered a template
app.set('views', __dirname + '/views');

app.use('/', routes);

app.listen(3000, () => {
    console.log('Server has started')
})
