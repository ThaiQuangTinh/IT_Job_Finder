//
document.getElementById('btnResetPassword').addEventListener('click', function(e) {
    e.preventDefault();
    if (document.getElementById('ipEmail_FpForm').value === 'tinh') {
        const contain_ForgotPW = document.querySelector('.contain_ForgotPW');
        contain_ForgotPW.style.animation = 'contain_ForgotPW ease 1s';
        setTimeout(function() {
            contain_ForgotPW.style.display = 'none';
            document.querySelector('.contain_ChangePassword').classList.add('show_contain_changePassword');
        }, 400);
    }
});

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

show_Hidde_Password(document.getElementById('ipPassword_FpForm'), document.getElementById('eye1_in_FormSignUp'));
show_Hidde_Password(document.getElementById('ipRePassword_FpForm'), document.getElementById('eye2_in_FormSignUp'));