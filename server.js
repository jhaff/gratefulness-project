const express = require('express')
const methodOverride = require('method-override')
const port = process.env.PORT || 3000;
const app = express();
var exphbs = require('express-handlebars');
const bodyParser = require('body-parser'); // INITIALIZE BODY-PARSER AND ADD IT TO APP
const GratefulNugget = require('./models/grateful-nugget.js')
const mongoose = require('mongoose');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// The following line must appear AFTER const app = express() and before routes!
app.use(bodyParser.urlencoded({ extended: true }));

const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/gratefulness-project';
mongoose.connect(mongoUri, { useNewUrlParser: true });

// CREATE
app.post('/grateful-nuggets', (req, res) => {
    console.log(req.body);
    GratefulNugget.create(req.body)
        .then(nugget => {
            console.log(nugget)
        }).catch(error => {
            console.log(error.message);
        });
});

// INDEX
app.get('/', (req, res) => {
    //start of the promise
    GratefulNugget.find()
        .then(reviews => {
            res.render('index', {
                // reviews: reviews
            });
        })
        // if not found
        .catch(err => {
            console.log(err);
        })
})

module.exports = app.listen(port, () => {
  console.log('App listening on port 3000!')
})
