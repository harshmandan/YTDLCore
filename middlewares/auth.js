var jwt = require('jsonwebtoken');

module.exports.isAuthorized  = function(req, res, next) {
  if(req.headers.authorization)
  {
    jwt.verify(req.headers.authorization, "dang_this_is_a_secret_cat", function(err, decoded) {
      if(err)
        return res.status(401).send({error: "wrong authorization header or authorization header expired"});
      if(decoded)
      {
        next();
      }
      else
      {
        return res.status(401).send({error: "you are not authorized, please log in first"});
      }
    });
  }
  else
  {
    return res.status(401).send({error: "no authorized token"});
  }
}