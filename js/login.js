// Elements của trang 
const formLogin = document.getElementById('formLogin');
const emailElement = document.getElementById('email');
const passwordElement = document.getElementById('password');
const alertError = document.getElementById('alertError');

function togglePassword(inputId) {
    const passwordField = document.getElementById(inputId);
    passwordField.type = passwordField.type === "password" ? "text" : "password";
}

//Lắng nghe sự kiến submit form đăng nhập tài khoản
formLogin.addEventListener("submit", function (e) {
    //Ngăn chặn sự kiện load lại trang
    e.preventDefault();

    // validate dữ liệu đầu vào

    // Lấy giá trị từ local về
    const userLocal = JSON.parse(localStorage.getItem("users")) || [];

    // Tìm kiếm email và password người dùng nhập vào có tồn tại trên local ?
    const findUser = userLocal.find(
        (user) => 
            user.email === emailElement.value && 
            user.password === passwordElement.value
        );

        if (!findUser){
            // Nếu không thì thông báo cho người dùng nhập lại dữ liệu
            alertError.style.display = 'block';
        }else{
            // Nếu có thì đăng nhập thành công và chuyển hướng về trang chủ
            window.location.href = 'index.html';

            // Lưu thông tin người dùng đã đăng nhập vào local storage
            localStorage.setItem("userLogin", JSON.stringify(findUser));
        }
});