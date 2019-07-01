const middlewareObj = {};

middlewareObj.isLoggedIn = function(req,res,next){
  if(req.isAuthenticated()){
      next();
  } else {
      res.status(401).json({
        message: 'failed'
      });
  }
};

module.exports = middlewareObj;
