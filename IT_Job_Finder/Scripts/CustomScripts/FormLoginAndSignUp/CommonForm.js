//Declare functions
//Function show form Login, Sign Up
const sticky_top_application = document.querySelector('._JobApplicationLayout-main');
const show_Form = function (buttonActive, containerForm, Form) {
    // Show login form when user clicks on button 
    buttonActive.addEventListener('click', function (e) {
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
const hide_Form = function (containerForm, Form) {
    containerForm.addEventListener('click', function () {
        if (containerForm.style.display === 'flex') {
            Form.style.animation = 'formLogSign_Hide ease 0.8s';
            containerForm.style.animation = 'containerLogSign_Hide ease 0.8s';
            setTimeout(function () {
                containerForm.style.display = 'none';
            }, 600);

            setTimeout(function () {
                if (sticky_top_application !== null) {
                    if (sticky_top_application.classList.contains('hide-jobApp-main')) {
                        sticky_top_application.classList.remove('hide-jobApp-main');
                    }
                }
            }, 600);
        }
    });
}

//Function prevent event bubbling
const prevent_Event_Bubbling = function (obj) {
    obj.addEventListener('click', function (e) {
        e.stopPropagation();
    });
};

//Function show and hide password
const show_Hidde_Password = function (obj_Input, obj_eye) {
    obj_Input.addEventListener('input', function () {
        if (obj_Input.value !== '') {
            obj_eye.style.display = 'block';
        } else {
            obj_eye.style.display = 'none';
        }
    });

    obj_eye.addEventListener('click', function () {
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


