const express = require('express')
const methodOverride = require('method-override')
const port = process.env.PORT || 3000;
const app = express();
var exphbs = require('express-handlebars');
const bodyParser = require('body-parser'); // INITIALIZE BODY-PARSER AND ADD IT TO APP

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// The following line must appear AFTER const app = express() and before routes!
app.use(bodyParser.urlencoded({ extended: true }));

const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/gratefulness-project';
mongoose.connect(mongoUri, { useNewUrlParser: true });
