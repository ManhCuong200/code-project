// Lấy ra elements của trang
const formRegister = document.getElementById('formRegister');
const userNameElement = document.getElementById('userName');
const emailElement = document.getElementById('email');
const passwordElement = document.getElementById('password');
const rePasswordElement = document.getElementById('rePassword');

// element hiển thị lỗi
const userNameError = document.getElementById('userNameError');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');
const rePasswordError = document.getElementById('rePasswordError');


// lấy dữ liêu từ localstorage
const userLocal = JSON.parse(localStorage.getItem("users")) || [];

function togglePassword(inputId) {
   const passwordField = document.getElementById(inputId);
   if (passwordField.type === "password") {
       passwordField.type = "text";
   } else {
       passwordField.type = "password";
   }
}

/**
 * validate địa chi email
 * @param {*} email: Chuỗi email người dùng nhập vào
 * @returns: Dữ liệu nếu email định dạng, undifined nếu email không đúng định dạng
 * author: Trương Mạnh Cường
 */
function validateEmail (email) {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
}

// Lắng nghe sự kiện submit form đăng ký tài khoản
formRegister.addEventListener("submit", function (e) {
    // Ngăn chặn sự kiện load lại trang
    e.preventDefault();

    // validate dữ liệu
     if (!userNameElement.value) {
        // Hiển thị thông báo lỗi
        userNameError.style.display = 'block';
     } else {
        // ẩn lỗi
        userNameError.style.display = 'none';
     }

     if (!emailElement.value) {
        // Hiển thị thông báo lỗi
        emailError.style.display = 'block';
     } else {
        // ẩn lỗi
        emailError.style.display = 'none';
          // Kiểm tra email định dạng email
        if (!validateEmail(emailElement.value)) {
            // Hiển thị thông báo lỗi
            emailError.style.display = 'block';
            emailError.innerHTML = 'Email không đúng định dạng';
        }
     }

     if (!passwordElement.value) {
        // Hiển thị thông báo lỗi
        passwordError.style.display = 'block';
     } else {
        // ẩn lỗi
        passwordError.style.display = 'none';
     }

     if (!rePasswordElement.value) {
        // Hiển thị thông báo lỗi
        rePasswordError.style.display = 'block';
     } else {
        // ẩn lỗi
        rePasswordError.style.display = 'none';
     }

     // kiểm tra mật khẩu và nhập lại mật khẩu có giống nhau không
     if (passwordElement.value !== rePasswordElement.value) {
        rePasswordError.style.display = 'block';
        rePasswordError.innerHTML = 'Mật khẩu không khớp';
     }

     // gửi dữ liệu từ form lên localstorage
     if (
        userNameElement.value &&
        emailElement.value && 
        passwordElement.value && 
        rePasswordElement.value && 
        passwordElement.value === rePasswordElement.value &&
        validateEmail(emailElement.value)
        ) {
        // Lấy dữ liệu từ form và gộp thành đối tượng user
        const user = {
            userId: Math.ceil(Math.random() * 100000000),
            userName: userNameElement.value,
            email: emailElement.value,
            password: passwordElement.value,
        };

        //push user vào mảng userLocal
        userLocal.push(user);

        // lưu trữ dữ liệu lên local
        localStorage.setItem("users", JSON.stringify(userLocal));

        // chuyển hướng trang đăng nhập sau 1s
      setTimeout(() => {
         window.location.href = "login.html";
      }, 1000);
    }
});