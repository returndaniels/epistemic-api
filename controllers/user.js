const User = require("../models/user");

exports.createUser = async (req, res) => {
  const { fullname, username, email, password } = req.body;
  const isNewUser = await User.findOne({ email });
  if (!isNewUser)
    return res.json({
      success: false,
      message: "Este email já está em uso, tente fazer login",
    });

  const user = await User({
    username,
    fullname,
    email,
    password,
    failedLoginAttempts: 0,
  });
  await user.save();
  res.json({ success: true, user });
};

exports.userSignIn = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user)
    return res.json({
      success: false,
      message: "Não foi encontrado um usuário com este email",
    });

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    await User.findOneAndUpdate(
      { email },
      { failedLoginAttempts: user.failedLoginAttempts + 1 }
    );
    return res.json({
      success: false,
      message: "email ou senha inválidos",
    });
  }

  const userInfo = {
    username: user.username,
    fullname: user.fullname,
    email: user.email,
  };

  res.json({ success: true, user: userInfo });
};
