const getUserProfile = async (req, res) => {
  res.json(req.user);
};

module.exports = getUserProfile;
