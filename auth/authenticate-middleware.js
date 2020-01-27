// /* 
//   complete the middleware code to check if the user is logged in
//   before granting access to the next middleware/route handler
// */

// module.exports = (req, res, next) => {
//   res.status(401).json({ you: 'shall not pass!' });
// };

const jwt = require('jsonwebtoken')


module.exports = (req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
        jwt.verify(token, 'this is my secret', (err, decodedToken) => {
            if(err) {
                console.log(err)
                res.status(401).json({ message: 'Token not valid'})
            } else {
                console.log('Valid token')
                req.user = decodedToken;
                next();
            }
        })
    } else {
        res.status(401).json({ you: 'shall not pass!'})
    }
}