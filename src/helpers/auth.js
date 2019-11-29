const helpers = {};

helpers.isAuthenticated = (req, res, next) => {
    if(req.isAuthenticated()){
        return next();
    }

    res.json({'error-msg': 'User Not Authorized'});
};

module.exports = helpers;