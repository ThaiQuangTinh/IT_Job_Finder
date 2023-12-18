//Declare functions
//Function show form Login, Sign Up
const sticky_top_application = document.querySelector('._JobApplicationLayout-main');
const show_Form = function(buttonActive, containerForm, Form) {
    // Show login form when user clicks on button 
    buttonActive.addEventListener('click', function(e) {
        e.preventDefault();
        if (sticky_top_application !== null) {
            sticky_top_application.classList.add('hide-jobApp-main');
        }
        if (containerForm.style.display !== 'flex') {
            containerForm.style.display = 'flex';
            Form.style.animation = 'formLogSign_Show ease 1.5s';
            containerForm.style.animation = 'containerLogSign_Show ease 1s';
        }
    });
};

//Function hide form Login, Sign Up
const hide_Form = function(containerForm, Form) {
    containerForm.addEventListener('click', function() {
        if (containerForm.style.display === 'flex') {
            Form.style.animation = 'formLogSign_Hide ease 0.8s';
            containerForm.style.animation = 'containerLogSign_Hide ease 0.8s';
            setTimeout(function() {
                containerForm.style.display = 'none';
            }, 600);

            setTimeout(function() {
                if (sticky_top_application !== null) {
                    if (sticky_top_application.classList.contains('hide-jobApp-main')) {
                        sticky_top_application.classList.remove('hide-jobApp-main');
                    }
                }
            }, 600);
            document.getElementById('id_login_form').reset();
            document.querySelector('.error_message').innerHTML = '';
        }
    });
}

//Function prevent event bubbling
const prevent_Event_Bubbling = function(obj) {
    obj.addEventListener('click', function(e) {
        e.stopPropagation();
    });
};

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

//Decalare variablee
const btnLogin = document.querySelector('.login-link');
const containerLogin = document.querySelector('.container_Login');
const formLogin = document.querySelector('.form_Login');

//Call function for login form
if (containerLogin !== null && formLogin !== null) {
    prevent_Event_Bubbling(formLogin);
    show_Form(btnLogin, containerLogin, formLogin);
    hide_Form(containerLogin, formLogin);
    show_Hidde_Password(document.getElementById('ipPassword_Login'), document.getElementById('eye_in_FormLogin'));
}

//Call function for sign up form
const ipPassword_SignUp = document.getElementById('ipPassword_SignUp')
const ipRePassword_SignUp = document.getElementById('ipRePassword_SignUp');

if (ipPassword_SignUp !== null && ipRePassword_SignUp !== null) {
    show_Hidde_Password(ipPassword_SignUp, document.getElementById('eye1_in_FormSignUp'));
    show_Hidde_Password(ipRePassword_SignUp, document.getElementById('eye2_in_FormSignUp'));
}


//Function used to create cookie
const createCookieAccount = function(username, password) {
    let expiryDate = new Date();
    expiryDate.setTime(expiryDate.getTime() + (720 * 60 * 1000));
    let expires = "expires=" + expiryDate.toUTCString();
    document.cookie = `usernameCK=${username}; ${expires}`;
    document.cookie = `passwordCK=${password}; ${expires}`;
};
//Function used to check cookie of users
const isValidCookie = function(cookieNames) {
    let cookies = document.cookie.split(';').map(cookie => cookie.trim());
    let cookiesMap = {};

    cookies.forEach(cookie => {
        const parts = cookie.split('=');
        const key = parts[0];
        const value = parts[1];
        cookiesMap[key] = value;
    });

    return cookieNames.every(cookieName => cookiesMap.hasOwnProperty(cookieName));
};
//Function used to get cookie value of users
const getCookieValue = function(cookieName) {
    const cookies = document.cookie.split(';').map(cookie => cookie.trim());
    for (let cookie of cookies) {
        const [name, value] = cookie.split('=');
        if (name === cookieName) {
            return value;
        }
    }
    return null;
};

//Function used to enter date into the input username and passowrd form cookie of users
const loginFormLoaded = function() {
    if (formLogin) {
        if (formLogin.style.display !== 'none') {
            if (isValidCookie(['usernameCK', 'passwordCK'])) {
                document.getElementById('ipPassword_Login').value = getCookieValue('passwordCK');
                document.getElementById('ipUserName_Login').value = getCookieValue('usernameCK');
            }
        }
    }
};

//Function used to get id job application details form url of browser
const getJobApplicationID = function() {
        var url = window.location.href;
        var segments = url.split('/');
        var id = segments.pop() || segments.pop();
        return id;
    }
    //Call function login form loaded
loginFormLoaded();

//Event when user clicked login button
const login = function() {
    document.getElementById('btnLoginForm').addEventListener('click', function(e) {
        let password = document.getElementById('ipPassword_Login').value;
        let userName = document.getElementById('ipUserName_Login').value;
        let error_message = document.querySelector('.error_message');
        let login_form = document.getElementById('id_login_form');
        if (userName !== '' && password !== '') {
            e.preventDefault();
            fetch('http://localhost:56673/api/Users/GetAllUsers')
                .then(function(response) {
                    return response.json();
                })
                .then(function(data) {
                    let flag = false;
                    data.forEach(element => {
                        if (element.username === userName && element.password === password) {
                            flag = true;
                        }
                    });
                    if (flag) {
                        if (document.getElementById('chk_RememberMe').checked) {
                            createCookieAccount(userName, password);
                        }
                        document.getElementById('hiden_id').value = getJobApplicationID();
                        login_form.submit();
                    } else {
                        error_message.innerHTML = 'Tài khoản hoặc mật khẩu không chính xác';
                    }
                });
        } else {
            e.preventDefault();
            error_message.innerHTML = 'Vui lòng nhập đầy đủ thông tin';
        }
    });
};

login();