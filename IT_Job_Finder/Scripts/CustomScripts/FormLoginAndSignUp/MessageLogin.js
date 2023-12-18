//Function used to hide login message when user signed in
const hideMessage = function(btn, message_box, containMesageBox) {
    document.getElementById(btn).addEventListener('click', function() {
        document.querySelector(message_box).style.animation = 'fadeOut 0.8s ease forwards';
        setTimeout(function() {
            document.querySelector(containMesageBox).style.display = 'none';
            document.querySelector(message_box).style.animation = 'fadeIn 0.8s ease forwards';
        }, 800);
    });
};

const loginMessage = function() {
    document.querySelector('.contain_message_box').style.display = 'flex';
};

// loginMessage();

hideMessage('btnOk_messBox', '.message_box', '.contain_message_box');

const logOut = function() {
    document.querySelector('.signup-link').addEventListener('click', function(e) {
        e.preventDefault();
        console.log('hihi');
        document.querySelector('.contain_logOut_message_box').style.display = 'flex';
    });
};

logOut();
hideMessage('btnLogoutCancel', '.message_box_logout', '.contain_logOut_message_box');