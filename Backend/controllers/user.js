const getHome = async (req, res, next) => {
  return res.render("user/myhome");
};

const getLogin = async (req, res, next) => {
  return res.render("user/login");
};

const getSignup = async (req, res, next) => {
  return res.render("user/signup");
};

const getAbout = async (req, res, next) => {
  return res.render("user/about");
};

module.exports = {
  getHome,
  getLogin,
  getAbout,
  getSignup,
};
