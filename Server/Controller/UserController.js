const User = require("../Model/User");
const JWT = require("jsonwebtoken");
const { hashpassword, comparepass } = require("../Middlewares/authHelpers");
const getAllusers = async (req, res) => {
  try {
    const Users = await User.find({});
    res.status(200).send({
      success: true,
      message: "AllUsers",
      Users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error Obteniendo de los Users",
    });
  }
};
const getuser = async (req, res) => {
  // const { id } = req.params;
  try {
    //const Users = await User.find({});
    const ExistingUser = await User.findOne({ _id: req.params.id });
    if (ExistingUser) {
      res.status(200).send({
        success: true,
        message: "user",
        ExistingUser,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error Obteniendoel usuario",
    });
  }
};
const createuser = async (req, res) => {
  const { name, email, jobTitle, company, password } = req.body;
  if (!name || !email || !jobTitle || !company || !password) {
    return res.status(400).send({ message: "All Fields are required" });
  }

  //existe usuario  si o no
  const ExistingUser = await User.findOne({ email });
  if (ExistingUser) {
    return res.status(200).send({
      success: false,
      message: "User already registered",
    });
  }
  //Hashe la contraseña
  const hashedpassword = await hashpassword(password);
  const NeWUser = new User({
    name,
    email,
    jobTitle,
    company,
    password: hashedpassword,
  });
  await NeWUser.save();
  res.status(201).send({
    success: true,
    message: "User registered successfully",
    user: NeWUser,
  });
};
const deleteuser = async (req, res) => {
  const { id } = req.params;

  // Validar el formato del ID
  // if (!id.match(/^[0-9a-fA-F]{24}$/)) {
  //   return res.status(400).send({
  //     success: false,
  //     message: "ID de usuario inválido",
  //   });
  // }

  try {
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).send({
        success: false,
        message: "No se encontró el usuario para eliminar",
      });
    }

    return res.status(200).send({
      success: true,
      message: "Usuario eliminado correctamente",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: "Error al eliminar el usuario",
    });
  }
};
const updateuser = async (req, res) => {
  const { id } = req.params;
  const { name, email, jobTitle, company } = req.body;

  try {
    const updateUser = await User.findByIdAndUpdate(
      id,
      { name, email, jobTitle, company, password },
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).send({
      success: true,
      message: "User Update",
      user: updateUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error interno del servidor",
    });
  }
};
const logincontroller = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res
      .status(400)
      .send({ success: false, message: "Email or pass invalidate" });
  //Verifica si hay o no un usuario
  const user = await User.findOne({ email });
  if (!user)
    return res
      .status(400)
      .send({ success: false, message: "Email or pass invalidate" });
  //verifica si es la contraseña y el encriptado
  const math = await comparepass(password, user.password);
  if (!math) {
    return res
      .status(200)
      .send({ success: false, message: "invalid password" });
  }
  //sacamos el token
  const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  res.status(200).send({
    success: true,
    message: "login sucess",
    user: {
      name: user.name,
      email: user.email,
      jobTitle: user.jobTitle,
      company: user.company,
      password: user.password,
    },
    token,
  });
};

module.exports = {
  getAllusers,
  createuser,
  deleteuser,
  updateuser,
  logincontroller,
  getuser,
};
