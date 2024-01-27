const bcrypt = require("bcrypt");

const hashpassword = async (password) => {
  try {
    const saltRound = 10;
    const haspassword = await bcrypt.hash(password, saltRound);
    return haspassword;
  } catch (error) {
    console.log(error);
  }
};
//el haspassword tiene que estar encriptado
const comparepass = async (password, haspassword1) => {
  return bcrypt.compare(password, haspassword1);
};
module.exports = {
  hashpassword,
  comparepass,
};
