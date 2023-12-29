//Disable all input of profile
const list_element_disable = document.querySelectorAll('.disabled');
//Function used to disable elements
const disable_element = function() {
    list_element_disable.forEach(function(element) {
        element.disabled = true;
        element.classList.add('delete_disable_effect');
    });
};

disable_element();

//Declare buttons
const btn_edit = document.getElementById('btn_edit');
const btn_cancel = document.getElementById('btn_cancel');
const btn_save = document.getElementById('btn_save');

//Event of edit button
btn_edit.addEventListener('click', function() {
    list_element_disable.forEach(function(element) {
        element.disabled = false;
        element.classList.remove('delete_disable_effect');
    });
    document.querySelector('.ip_profile_rowIp_hide').style.display = 'block';
    btn_cancel.style.display = 'block';
    btn_save.style.display = 'block';
    btn_edit.style.display = 'none';
});

//Function used to cancel form
const candidateInforEditCancel = function() {
    disable_element();
    document.querySelector('.ip_profile_rowIp_hide').style.display = 'none';
    btn_cancel.style.display = 'none';
    btn_save.style.display = 'none';
    btn_edit.style.display = 'block';
}

//Event of cancel button
btn_cancel.addEventListener('click', function() {
    candidateInforEditCancel();
});

// Function used to listen change event input
const fileInput = document.getElementById('ip_txtImageUrl');
fileInput.addEventListener('change', function(event) {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const previewImage = document.querySelector('.avatar_Profile');
            previewImage.src = event.target.result;
        };
        // Đọc tệp như là một URL
        reader.readAsDataURL(selectedFile);
    }
});

// ========= CANDIATE INFORMATION ========
// Function used to show basic candidate information
function fillCandidateInfor(data) {
    document.getElementById('candidate_id_hide').value = data.ID;
    if (data.ImgaeUrl === '') {
        document.querySelector('.avatar_Profile').src = '../../Resource/Image/avatar.png';
    } else {
        document.querySelector('.avatar_Profile').src = data.ImgaeUrl;
    }
    // document.querySelector('.avatar_Profile').src = '~/Resource/Image/laulili.jpg';
    document.getElementById('avatar_name_id').innerHTML = data.Fullname;
    document.getElementById('ip_txtFullName').value = data.Fullname;
    document.getElementById('ip_txtEmail').value = data.Email;
    if (data.Gender === false) {
        document.getElementById('radioFemale').checked = true;
    } else {
        document.getElementById('radioMale').checked = true;
    }
    document.getElementById('ip_txtAddress').value = data.Address;
    document.getElementById('ip_txtSkills').value = data.Skills;
    document.getElementById('ip_txtExpericence').value = data.Experience;
    document.getElementById('ip_txtEducation').value = data.Education;
}

//Function used to show cadidate information
function showCandidateInfor(callback) {
    fetch('http://localhost:56673/api/CandidateProfiles/GetFullInforOfCandidate')
        .then(function(res) {
            return res.json();
        })
        .then(function(data) {
            data.forEach(user => {
                if (user.Username === document.getElementById('username_hide').value) {
                    callback(user);
                    const Candidate_ID = user.ID;
                    getJopApplicationFromID(Candidate_ID);
                    getFavoriteJobFromID(Candidate_ID);
                }
            });
        });
};

//Call function used to show candidate information
showCandidateInfor(fillCandidateInfor);

//Function used to get candidate information from form 
const getCandidateInforFromForm = function() {
    return {
        candidate_id: document.getElementById('candidate_id_hide').value,
        Fullname: document.getElementById('ip_txtFullName').value,
        Email: document.getElementById('ip_txtEmail').value,
        Gender: document.getElementById('radioFemale').checked ? 'false' : 'true',
        Address: document.getElementById('ip_txtAddress').value,
        Skills: document.getElementById('ip_txtSkills').value,
        Experience: document.getElementById('ip_txtExpericence').value,
        Education: document.getElementById('ip_txtEducation').value
    }
}

//Function used to put data of canidate profile
const putCandidateInfor = function() {
    let newCandidate = getCandidateInforFromForm();
    let formData = new FormData();
    formData.append('candidate_id', newCandidate.candidate_id);
    formData.append('Fullname', newCandidate.Fullname);
    formData.append('Email', newCandidate.Email);
    formData.append('Gender', newCandidate.Gender);
    formData.append('Address', newCandidate.Address);
    formData.append('Skills', newCandidate.Skills);
    formData.append('Experience', newCandidate.Experience);
    formData.append('Education', newCandidate.Education);
    let inputFileImage = document.getElementById('ip_txtImageUrl');
    if (inputFileImage.files.length > 0) {
        formData.append('ImageUrl', inputFileImage.files[0]);
    }
    fetch('http://localhost:56673/api/CandidateProfiles/PutCandidateInfor', {
            method: 'PUT',
            body: formData
        })
        .then(function(response) {
            if (response.ok) {
                candidateInforEditCancel();
                showCandidateInfor(fillCandidateInfor);
                location.reload(true);
            }
        })
};

document.getElementById('btn_save').addEventListener('click', function() {
    putCandidateInfor();
});

// == FUNCTION USED TO SHOW AND HIDE DELETE ICON ==
const show_icon_delete = function(btn_edit_elememt, btn_cancel_element, icon_element) {
    icon_element.forEach(function(element) {
        element.style.display = 'block';
    });
    btn_edit_elememt.style.display = 'none';
    btn_cancel_element.style.display = 'block';
};

const hide_icon_delete = function(btn_edit_elememt, btn_cancel_element, icon_element) {
    icon_element.forEach(function(element) {
        element.style.display = 'none';
    });
    btn_edit_elememt.style.display = 'block';
    btn_cancel_element.style.display = 'none';
};

//Function used to show animation after delete item
const showAnimationDelete = array => {
    array.forEach(element => {
        if (element.getAttribute('dataID') == id) {
            element.style.animation = 'deleteItem .7s linear';
            setTimeout(function() {
                element.remove();
            }, 800)
        }
    })
}

//Function used to delete job applicated and favourite job via api
const deleteItem = function(event, id, type) {
    event.stopPropagation();
    let apiUrl = '';
    if (type === 'jobApplication') {
        apiUrl = `http://localhost:56673/api/JobApplications/DeleteJobApplication/${id}`;
    } else if (type === 'favouriteJob') {
        apiUrl = `http://localhost:56673/api/Favourites/DeleteFavourites/${id}`;
    }

    fetch(apiUrl, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                if (type === 'jobApplication') {
                    const job_app = document.querySelectorAll('.job_applicated_item');
                    job_app.forEach(element => {
                        if (element.getAttribute('dataID') == id) {
                            element.style.animation = 'deleteItem .7s linear';
                            setTimeout(function() {
                                element.remove();
                                showMessageWhenNullLisy(document.getElementById('candidate_id_hide').value, 'jobApp');
                            }, 800);
                        }
                    })
                } else {
                    const job_fav = document.querySelectorAll('.fouvarite_job_item');
                    job_fav.forEach(element => {
                        if (element.getAttribute('dataID') == id) {
                            element.style.animation = 'deleteItem .7s linear';
                            setTimeout(function() {
                                element.remove();
                                showMessageWhenNullLisy(document.getElementById('candidate_id_hide').value, 'favJob');
                            }, 800)
                        }
                    })
                }
            } else {
                console.log('Deleted failed');
            }
        })
        .catch(error => console.error('Error:', error));
};



// ==== FUNCTIONS LIST USED TO HANDEL FOR JOB APPLICATED
//Function used to show status job application 
const showStatus = status => {
    if (status == true) {
        return '<span class = "status_value" style="background-color: #2ed529;">Đã được chấp nhận</span> ';
    } else if (status == false) {
        return '<span class = "status_value" style="background-color: #eb2424;">Đã bị từ chối</span> ';
    } else {
        return '<span class = "status_value" style="background-color: blue;">Đang chờ xử lí</span> ';
    }
};

//Function used to riderect to job details page
const redirectToJobDetail = (jobID) => {
    console.log(jobID);
    window.location.href = `http://localhost:56673/JobDetails/Details/${jobID}`;
}

//Function used to show job applicated of canđiate form candidate id
const getJopApplicationFromID = function(id) {
    fetch(`http://localhost:56673/api/JobApplications/GetJobApplicatedFromID/${id}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data.length > 0) {
                document.querySelector('.btn_edit_list').style.display = 'block';
                data.forEach(element => {
                    document.querySelector('.job_applicated_list').innerHTML +=
                        `
                        <div class="job_applicated_item" dataID = "${element.JobApplicationId}"  onclick="redirectToJobDetail(${element.JobID})">
                            <div class="logo_company">
                                <img src="${element.ImageUrl}" alt="" class="img_employer">
                            </div>
                            <div class="content_job_applicated_item">
                                <div class="job_title row_content">${element.Title}</div>
                                <div class="employeer_name row_content">${element.CompanyName}</div>
                                <div class="employeer_location row_content main_contain">
                                    <i class="fa-solid fa-location-dot location_icon"></i> ${element.Location}
                                </div>
                                <div class="employeer_salary row_content main_contain">
                                    <i class="fa-solid fa-dollar-sign dolar_icon"></i> ${element.Salary}
                                </div>
                                <div class="employer_description row_content main_contain">${element.Description}</div>
                                <div style="margin-bottom: 15px;"> <span style="font-weight: bold;">Trạng thái: </span> 
                                    ${showStatus(element.Status)}
                                </div>
                            </div>
                            <div class="japp_delete_icon" onclick="deleteItem(event, ${element.JobApplicationId}, 'jobApplication')"><i class="fa-regular fa-trash-can"></i></div>
                        </div>
                    `;
                });
            } else {
                document.querySelector('.job_applicated_list').innerHTML = '<h2 class = "title_list_null">Bạn chưa ứng tuyển công việc nào</h2>';
                document.querySelector('.btn_edit_list').style.display = 'none';
            }

            const japp_delete_icon = document.querySelectorAll('.japp_delete_icon');
            const btn_Edit_job_applicated = document.getElementById('btn_Edit_job_applicated');
            const btn_cancel_edit_jpp = document.getElementById('btn_cancel_edit_jpp');
            btn_Edit_job_applicated.addEventListener('click', function() {
                show_icon_delete(btn_Edit_job_applicated, btn_cancel_edit_jpp, japp_delete_icon);
            });

            btn_cancel_edit_jpp.addEventListener('click', function() {
                hide_icon_delete(btn_Edit_job_applicated, btn_cancel_edit_jpp, japp_delete_icon);
            });

        })
        .catch(error => console.error('Error:', error));
};

//Function use to check count job applicated of candidate
const showMessageWhenNullLisy = (id, type) => {
    let api = `http://localhost:56673/api/JobApplications/GetJobApplicatedFromID/${id}`;
    if (type === 'favJob') {
        api = `http://localhost:56673/api/Favourites/GetFavouriteJobFromID/${id}`;
    }
    fetch(api)
        .then(response => response.json())
        .then(data => {
            if (data.length == 0) {
                if (type === 'favJob') {
                    document.getElementById('btn_Edit_favourite_job').style.display = 'none';
                    document.getElementById('btn_cancel_edit_fav').style.display = 'none';
                    document.querySelector('.job_favourite_list').innerHTML = '<h2 class = "title_list_null">Bạn chưa yêu thích công việc nào</h2>';
                } else {
                    document.getElementById('btn_Edit_job_applicated').style.display = 'none';
                    document.getElementById('btn_cancel_edit_jpp').style.display = 'none';
                    document.querySelector('.job_applicated_list').innerHTML = '<h2 class = "title_list_null">Bạn chưa ứng tuyển công việc nào</h2>';
                }
            }
        })
};


//Function used to show favourited job of candidate from candidate id
const getFavoriteJobFromID = function(id) {
    fetch(`http://localhost:56673/api/Favourites/GetFavouriteJobFromID/${id}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data.length > 0) {
                data.forEach(element => {
                    document.querySelector('.job_favourite_list').innerHTML +=
                        `   
                        <div class="fouvarite_job_item" dataID = "${element.FavouriteId}" onclick="redirectToJobDetail(${element.JobID})">
                            <div class="logo_company">
                                <img src="${element.ImageUrl}" alt="">
                            </div>
                            <div class="content_favourite_job_item" >
                                <div class="job_title row_content">${element.Title}</div>
                                <div class="employeer_name row_content">${element.CompanyName}</div>
                                <div class="employeer_location row_content main_contain">
                                    <i class="fa-solid fa-location-dot location_icon"></i> ${element.Location}
                                </div>
                                <div class="employeer_salary row_content main_contain">
                                    <i class="fa-solid fa-dollar-sign dolar_icon"></i> ${element.Salary}
                                </div>
                                <div class="employer_description row_content main_contain">
                                    ${element.Description}
                                </div>
                            </div>
                            <div class="fav_delete_icon" onclick="deleteItem(event, ${element.FavouriteId}, 'favouriteJob')"><i class="fa-regular fa-trash-can"></i></div>
                        </div>
                    `;
                    const fav_delete_icon = document.querySelectorAll('.fav_delete_icon');
                    const btn_Edit_favourite_job = document.getElementById('btn_Edit_favourite_job');
                    const btn_cancel_edit_fav = document.getElementById('btn_cancel_edit_fav');
                    btn_Edit_favourite_job.addEventListener('click', function() {
                        show_icon_delete(btn_Edit_favourite_job, btn_cancel_edit_fav, fav_delete_icon);
                    });

                    btn_cancel_edit_fav.addEventListener('click', function() {
                        hide_icon_delete(btn_Edit_favourite_job, btn_cancel_edit_fav, fav_delete_icon);
                    });
                })
            } else {
                document.querySelector('.job_favourite_list').innerHTML = '<h2 class = "title_list_null">Bạn chưa yêu thích công việc nào</h2>';
                document.querySelector('#btn_Edit_favourite_job').style.display = 'none';
            }
        })
        .catch(error => console.error('Error:', error));
}


//Log out
//Function used to hide login message when user signed in
const hideMessage = function(btn, message_box, containMesageBox) {
    document.getElementById(btn).addEventListener('click', function() {
        // document.querySelector(message_box).style.animation = 'fadeOut 0.8s ease forwards';
        // setTimeout(function() {
        document.querySelector(containMesageBox).style.display = 'none';
        document.querySelector(message_box).style.animation = 'fadeIn 0.8s ease forwards';
        // }, 600);
    });
};

const logOut = function() {
    document.querySelector('.signup-link').addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector('.contain_logOut_message_box').style.display = 'flex';
    });
};
logOut();
hideMessage('btnLogoutCancel', '.message_box_logout', '.contain_logOut_message_box');