const isadmin = (req, res, next) => {
  try {
    if (req.session.admin_id) {
    } else {
      res.redirect("/login");
    }
    next();
  } catch (err) {
    console.log(err);
  }
};
const islogout = (req, res, next) => {
  try {
    if (req.session.admin_id) {
      res.redirect("/admin");
    }
    next();
  } catch (err) {
    console.log(err);
  }
};
module.exports = { isadmin, islogout };
