
/**
 * Renders the given view
 */
module.exports = function (objectrepository, viewName) {

    return function (req, res) {
      //res.end('Render: ' + viewName + static());
      res.render(viewName, res.locals);
    };
  
  };