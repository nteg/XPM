var express = require('express'),
    router = express.Router();
    bodyParser = require('body-parser'), //parses information from POST
    methodOverride = require('method-override'); //used to manipulate POST

//Any requests to this controller must pass through this 'use' function
//Copy and pasted from method-override
router.use(bodyParser.urlencoded({ extended: true }));
router.use(methodOverride(function(req, res){
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        var method = req.body._method;
        delete req.body._method;
        return method;
    }
}));

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('Welcome to auth service.');
});

// Signup
router.route('/signup')
    .get(function(req, res) {
        res.send('Welcome to signup service.');
    })
    .post(function(req, res, next) {
        res.format({
            text: function() {
                res.send('hey text');
            },

            html: function() {
                res.send('<p>hey html</p>');
            },

            json: function() {
                res.send({ message: 'hey' });
            }
        });
    });

module.exports = router;
