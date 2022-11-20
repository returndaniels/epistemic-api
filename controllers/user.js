const User = require("../models/user");

exports.createUser = async (req, res) => {
  const { fullname, username, email, password } = req.body;
  const isNewUser = await User.findOne({ email });
  if (isNewUser) {
    console.log(`Email já cadastrado (${email})`);
    return res.json({
      success: false,
      message: "Este email já está em uso, tente fazer login",
    });
  }

  console.log(`Novo usuário criado (${email})`);
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

  if (!user) {
    console.log(`Usuário não encontrado (${email})`);
    return res.json({
      success: false,
      message: "Não foi encontrado um usuário com este email",
    });
  }
  if (user.failedLoginAttempts >= 3) {
    console.log(`Limite de tentativas de acesso excedido (${email})`);
    return res.json({
      success: false,
      message: "Limite de tentativas excedido, tente recuperar a senha",
    });
  }
  const isMatch = user.password === password;
  if (!isMatch) {
    await User.findOneAndUpdate(
      { email },
      { failedLoginAttempts: user.failedLoginAttempts + 1 }
    );
    console.log(`Email ou senha inválidos (${email})`);
    return res.json({
      success: false,
      message: "email ou senha inválidos",
    });
  }

  await User.findOneAndUpdate({ email }, { failedLoginAttempts: 0 });

  const userInfo = {
    username: user.username,
    fullname: user.fullname,
    email: user.email,
  };

  console.log(`Usuário autorizado (${email})`);
  res.json({ success: true, user: userInfo });
};
