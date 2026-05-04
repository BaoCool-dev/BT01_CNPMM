import bcrypt from 'bcryptjs';
import db from '../models/index';

let createNewUser = async (data) => {
  const existing = await db.User.findOne({ where: { email: data.email } });
  if (existing) {
    return { errCode: 1, message: 'Email đã tồn tại' };
  }
  const hashPassword = await bcrypt.hash(data.password, 10);
  await db.User.create({
    email: data.email,
    password: hashPassword,
    firstName: data.firstName,
    lastName: data.lastName,
    address: data.address,
    phoneNumber: data.phoneNumber,
    gender: data.gender === '1' ? true : false,
    roleId: data.roleId
  });
  return { errCode: 0, message: 'Tạo người dùng thành công' };
}

let getAllUser = async () => {
  return db.User.findAll({ raw: true });
}

let getUserInfoById = async (userId) => {
  const user = await db.User.findOne({ where: { id: userId }, raw: true });
  return user || null;
}

let updateUser = async (data) => {
  const user = await db.User.findOne({ where: { id: data.id } });
  if (!user) {
    return { errCode: 1, message: 'Không tìm thấy người dùng' };
  }
  user.firstName = data.firstName;
  user.lastName = data.lastName;
  user.address = data.address;
  user.phoneNumber = data.phoneNumber;
  user.gender = data.gender === '1' ? true : false;
  user.roleId = data.roleId;
  await user.save();
  const allUsers = await db.User.findAll({ raw: true });
  return { errCode: 0, data: allUsers };
}

let deleteUserById = async (userId) => {
  const user = await db.User.findOne({ where: { id: userId } });
  if (!user) {
    return { errCode: 1, message: 'Không tìm thấy người dùng' };
  }
  await user.destroy();
  return { errCode: 0, message: 'Xóa thành công' };
}

module.exports = {
  createNewUser,
  getAllUser,
  getUserInfoById,
  updateUser,
  deleteUserById
}
