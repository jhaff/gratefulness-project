//TODO: Figure out package.json

const express = require('express');
const methodOverride = require('method-override');
const port = process.env.PORT || 3000;
const app = express();
var exphbs = require('express-handlebars');
const bodyParser = require('body-parser'); // INITIALIZE BODY-PARSER AND ADD IT TO APP
const Nugget = require('./models/nugget.js');
const mongoose = require('mongoose');
const Comment = require('./models/comment')
const commentsController = require('./controllers/comments.js')
const adminController = require('./controllers/admin.js')



app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(methodOverride('_method'));

// The following line must appear AFTER const app = express() and before routes!
app.use(bodyParser.urlencoded({ extended: true }));

app.use(commentsController);
app.use(adminController);

const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/gratefulness-project';
mongoose.connect(mongoUri, { useNewUrlParser: true });

// CREATE
app.post('/nuggets', (req, res) => {
    console.log(req.body);
    Nugget.create(req.body)
        .then(nugget => {
            console.log(nugget);
            res.redirect(`/`);
        }).catch(error => {
            console.log(error.message);
        });
});

// SHOW FOR ADMIN
app.get('/nuggets/:id/admin', (req, res) => {
    // find review
    Nugget.findById(req.params.id).then(nugget => {
        // fetch its comments
        Comment.find({
            nuggetId: req.params.id
        }).then(comments => {
            // respond with the template with both values
            res.render('nuggets-show-admin', {
                nugget: nugget,
                comments: comments,
                nuggetId: req.params.id
            })
        })
    }).catch((err) => {
        // catch errors
        console.log(err.message)
    });
});


// SHOW
app.get('/nuggets/:id', (req, res) => {
    // find review
    Nugget.findById(req.params.id).then(nugget => {
        // fetch its comments
        Comment.find({
            nuggetId: req.params.id
        }).then(comments => {
            // respond with the template with both values
            res.render('nuggets-show', {
                nugget: nugget,
                comments: comments,
                nuggetId: req.params.id
            })
        })
    }).catch((err) => {
        // catch errors
        console.log(err.message)
    });
});

app.delete('/nuggets/:id/', function(req, res) {
    console.log("DELETE nugget")
    Nugget.findByIdAndRemove(req.params.id).then((nugget) => {
        res.redirect(`/nuggets/`);
    }).catch((err) => {
        console.log(err.message);
    })
})


// HOME
app.get('/', (req, res) => {
    //start of the promise
    Nugget.find()
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

//INDEX
app.get('/nuggets', (req, res) => {
    Nugget.find()
        .then(nuggets => {
            res.render('nuggets-index', {
                nuggets: nuggets
            });
        })
        .catch(err => {
            console.log(err);
        })
})

module.exports = app.listen(port, () => {
  console.log('App listening on port 3000!')
})
