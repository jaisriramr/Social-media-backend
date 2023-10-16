import * as bcrypt from 'bcrypt';

async function validatePassword(password: string) {
  return bcrypt.compare(password, this.password);
}

exports.module = {
  validatePassword,
};
