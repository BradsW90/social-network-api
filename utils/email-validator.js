function emailValidation(email) {
  const validation = /^([\w\d\._-]+)@([\w\d_-]+)\.([\w\d]{2,3})$/;
  return validation.test(email);
}

module.exports = { emailValidation };
