//Function used to hide login message when user signed in
const hideMessage = function(btn, message_box, containMesageBox) {
    document.getElementById(btn).addEventListener('click', function() {
        // document.querySelector(message_box).style.animation = 'fadeOutLogOut 0.8s ease forwards';
        // setTimeout(function() {
        document.querySelector(containMesageBox).style.display = 'none';
        document.querySelector(message_box).style.animation = 'fadeInLogout 0.8s ease forwards';
        // }, 800);
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
        document.querySelector('.contain_logOut_message_box').style.display = 'flex';
    });
};

logOut();
hideMessage('btnLogoutCancel', '.message_box_logout', '.contain_logOut_message_box');

// Display mini avatar of user
const showMiniAvar = (fullName) => {
    fetch('http://localhost:56673/api/Users/GetAllUsers')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            data.forEach(element => {
                if (element.full_name.trim() == fullName && element.imageURL != '') {
                    document.querySelector('.avatar_mini').src = element.imageURL;
                } else if (element.full_name.trim() == fullName && element.imageURL == '') {
                    document.querySelector('.avatar_mini').src = '../../Resource/Images/avatar.png';
                }
            });
        })
}

// showMiniAvar('Liliana');
const full_name_mini = document.querySelector('.fullName_mini');
if (full_name_mini) {
    showMiniAvar(full_name_mini.innerText.trim());
}