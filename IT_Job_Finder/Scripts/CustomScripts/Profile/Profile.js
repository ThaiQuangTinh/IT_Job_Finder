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

//Event of cancel button
btn_cancel.addEventListener('click', function() {
    disable_element();
    document.querySelector('.ip_profile_rowIp_hide').style.display = 'none';
    btn_cancel.style.display = 'none';
    btn_save.style.display = 'none';
    btn_edit.style.display = 'block';
});

//

const japp_delete_icon = document.querySelectorAll('.japp_delete_icon');
const fav_delete_icon = document.querySelectorAll('.fav_delete_icon');
const btn_Edit_job_applicated = document.getElementById('btn_Edit_job_applicated');
const btn_cancel_edit_jpp = document.getElementById('btn_cancel_edit_jpp');
const btn_Edit_favourite_job = document.getElementById('btn_Edit_favourite_job');
const btn_cancel_edit_fav = document.getElementById('btn_cancel_edit_fav');



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

btn_Edit_job_applicated.addEventListener('click', function() {
    show_icon_delete(btn_Edit_job_applicated, btn_cancel_edit_jpp, japp_delete_icon);
});

btn_cancel_edit_jpp.addEventListener('click', function() {
    hide_icon_delete(btn_Edit_job_applicated, btn_cancel_edit_jpp, japp_delete_icon);
});

btn_Edit_favourite_job.addEventListener('click', function() {
    show_icon_delete(btn_Edit_favourite_job, btn_cancel_edit_fav, fav_delete_icon);
});

btn_cancel_edit_fav.addEventListener('click', function() {
    hide_icon_delete(btn_Edit_favourite_job, btn_cancel_edit_fav, fav_delete_icon);
});