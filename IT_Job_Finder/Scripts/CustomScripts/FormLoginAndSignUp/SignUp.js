//Function show and hide password
const show_Hidde_Password = function(obj_Input, obj_eye) {
    obj_Input.addEventListener('input', function() {
        if (obj_Input.value !== '') {
            obj_eye.style.display = 'block';
        } else {
            obj_eye.style.display = 'none';
        }
    });

    obj_eye.addEventListener('click', function() {
        if (obj_Input.Value !== '') {
            if (obj_Input.type === 'password') {
                obj_Input.type = 'text';
            } else {
                obj_Input.type = 'password';
            }
        }
    });
};


//Call function for sign up form
const fullName = document.getElementById('ipFullname_SignUp');
const email = document.getElementById('ipEmail_SignUp');
const username = document.getElementById('ipUserName_SignUp');
const passowrd = document.getElementById('ipPassword_SignUp')
const rePassword = document.getElementById('ipRePassword_SignUp');
const chk_CreateAgree = document.getElementById('chk_CreateAgree');
const roleSelect = document.getElementById('role_SignUp');
const error_message = document.querySelector('.error_message');


if (passowrd !== null && rePassword !== null) {
    show_Hidde_Password(passowrd, document.getElementById('eye1_in_FormSignUp'));
    show_Hidde_Password(rePassword, document.getElementById('eye2_in_FormSignUp'));
}

//Function used to check email valid 
const isValidEmail = function(data) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(data);
};

//Function used to check username valid
const isValidUsername = function(data, username) {
    return data.some(element => element === username);
}

//Function used to create user
const creatUser = function(data) {
    return new Promise((resolve, reject) => {
        let option = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // Đảm bảo đặt đúng header
            },
            body: JSON.stringify(data)
        };
        fetch('http://localhost:56673/api/Users/PostNewUser', option)
            .then(function(response) {
                if (response.ok) {
                    resolve(true);
                } else {
                    resolve(false);
                }
            })
            .catch(function(error) {
                reject(error);
            });
    });
};

//Function used to get id job application details form url of browser
const getJobApplicationID = function() {
    var url = window.location.href;
    var segments = url.split('/');
    var id = segments.pop() || segments.pop();
    return id;
}

//Function used to get user information from sign-up form
const getUserData = function() {
    return {
        username: username.value,
        password: passowrd.value,
        email: email.value,
        full_name: fullName.value,
        role: roleSelect.value,
        imageURL: '../../../Resource/Images/avatar.png'
    }
}



document.getElementById('btnSignUpForm').addEventListener('click', function(e) {
    if (fullName.value !== '' && email.value !== '' && username.value !== '' && passowrd.value !== '' && rePassword.value !== '' && roleSelect.value !== '') {
        e.preventDefault();
        if (chk_CreateAgree.checked) {
            fetch('http://localhost:56673/api/Users/GetAllUsernames')
                .then(function(response) {
                    return response.json();
                })
                .then(function(data) {
                    if (!isValidUsername(data, username.value)) {
                        if (isValidEmail(email.value)) {
                            if (passowrd.value === rePassword.value) {
                                creatUser(getUserData())
                                    .then(function(success) {
                                        if (success) {
                                            document.querySelector('.form_SignUp').reset();
                                            error_message.innerHTML = '';
                                            document.querySelector('.contain_message_success_signup').style.display = 'flex';
                                        } else {
                                            error_message.innerHTML = 'Tạo tài khoản thất bại';
                                        }
                                    })
                            } else {
                                error_message.innerHTML = 'Mật khẩu không khớp';
                            }
                        } else {
                            error_message.innerHTML = 'Email không đúng định dạng';
                        }
                    } else {
                        error_message.innerHTML = 'Tên đăng nhập đã tồn tại';
                    }
                });
        } else {
            error_message.innerHTML = 'Bạn vui lòng ấn xác nhận tạo tài khoản';
        }
    } else {
        e.preventDefault();
        error_message.innerHTML = 'Bạn vui lòng nhập đầy đủ thông tin';
    }
});