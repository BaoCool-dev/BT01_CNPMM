import CRUDService from '../services/userService';

let getHomePage = (req, res) => {
  return res.render('homepage.ejs');
}

let getCreatePage = (req, res) => {
  return res.render('crud.ejs');
}

let postCRUD = async (req, res) => {
  try {
    const { email, password, firstName, lastName, address, phoneNumber, gender, roleId } = req.body;

    if (!email || !password || !firstName || !lastName) {
      req.flash('error', 'Vui lòng điền đầy đủ các trường bắt buộc (Email, Mật khẩu, Họ, Tên)');
      return res.redirect('/crud');
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      req.flash('error', 'Định dạng email không hợp lệ');
      return res.redirect('/crud');
    }

    if (password.length < 6) {
      req.flash('error', 'Mật khẩu phải có ít nhất 6 ký tự');
      return res.redirect('/crud');
    }

    const result = await CRUDService.createNewUser(req.body);
    if (result.errCode !== 0) {
      req.flash('error', result.message);
      return res.redirect('/crud');
    }

    req.flash('success', 'Tạo người dùng thành công!');
    return res.redirect('/get-crud');
  } catch (e) {
    console.error(e);
    req.flash('error', 'Đã xảy ra lỗi, vui lòng thử lại');
    return res.redirect('/crud');
  }
}

let getFindAllCrud = async (req, res) => {
  try {
    const data = await CRUDService.getAllUser();
    return res.render('users/findAllUser.ejs', { datalist: data });
  } catch (e) {
    console.error(e);
    return res.render('users/findAllUser.ejs', { datalist: [] });
  }
}

let getEditCRUD = async (req, res) => {
  try {
    const userId = req.query.id;
    if (!userId) {
      req.flash('error', 'Không tìm thấy người dùng');
      return res.redirect('/get-crud');
    }
    const userData = await CRUDService.getUserInfoById(userId);
    if (!userData) {
      req.flash('error', 'Người dùng không tồn tại');
      return res.redirect('/get-crud');
    }
    return res.render('users/editUser.ejs', { data: userData });
  } catch (e) {
    console.error(e);
    req.flash('error', 'Đã xảy ra lỗi');
    return res.redirect('/get-crud');
  }
}

let putCRUD = async (req, res) => {
  try {
    const { firstName, lastName } = req.body;
    if (!firstName || !lastName) {
      req.flash('error', 'Họ và Tên không được để trống');
      return res.redirect(`/edit-crud?id=${req.body.id}`);
    }

    const result = await CRUDService.updateUser(req.body);
    if (result.errCode !== 0) {
      req.flash('error', result.message);
      return res.redirect(`/edit-crud?id=${req.body.id}`);
    }

    req.flash('success', 'Cập nhật người dùng thành công!');
    return res.redirect('/get-crud');
  } catch (e) {
    console.error(e);
    req.flash('error', 'Đã xảy ra lỗi khi cập nhật');
    return res.redirect('/get-crud');
  }
}

let deleteCRUD = async (req, res) => {
  try {
    const id = req.body.id;
    if (!id) {
      req.flash('error', 'Không tìm thấy người dùng');
      return res.redirect('/get-crud');
    }
    const result = await CRUDService.deleteUserById(id);
    if (result.errCode !== 0) {
      req.flash('error', result.message);
    } else {
      req.flash('success', 'Xóa người dùng thành công!');
    }
    return res.redirect('/get-crud');
  } catch (e) {
    console.error(e);
    req.flash('error', 'Đã xảy ra lỗi khi xóa');
    return res.redirect('/get-crud');
  }
}

module.exports = {
  getHomePage,
  getCreatePage,
  postCRUD,
  getFindAllCrud,
  getEditCRUD,
  putCRUD,
  deleteCRUD
}
