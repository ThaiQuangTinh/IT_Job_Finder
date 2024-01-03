//Function used to get job id form url of browser
const getJobIfFromUrl = () => {
    const url = window.location.pathname;
    const parts = url.split('/');
    return parts[parts.length - 1];
}

//Function used to get job skill listof job posting of employer
const getJobSKillListOfJPE = (jobID) => {
    fetch(`http://localhost:56673/api/JobSkills/getSkillReqFromJobID?jobID=${jobID}`)
        .then(response => response.json())
        .then(data => {
            data.forEach(element => {
                document.querySelector('.skillReContainOFJobPosting').innerHTML += `
                    <a href="/Home/Index/${element.SkillID}" class="border-radius-5px">${element.SkillName}</a>
                `;
            });
        })
};
//Function used to fill data to common job posting
const fillDataToCommonJobPosting = (jobID) => {
    const url = window.location.pathname;
    const parts = url.split('/');
    if (parts.length === 5) {
        jobID = parts[parts.length - 2];
    } else {
        jobID = parts[parts.length - 1];
    }
    
    fetch(`http://localhost:56673/api/JobPostings/getJobPostingDetailFromID?jobID=${jobID}`)
        .then(response => response.json())
        .then(data => {
            data.forEach(element => {
                document.querySelector('.detail_nominee').innerText = element.Title;
                document.querySelector('.detail_location').innerText = element.Location;
                document.querySelector('.detail_salary').innerText = formatCurrency(element.Salary);
                document.querySelector('.detail_experienceYear').innerText = `Từ ${element.ExperienceYear} năm`;
                document.querySelector('.detail_level').innerText = element.Level;
                document.querySelector('.detail_contractType').innerText = element.ContractType;
                getJobSKillListOfJPE(jobID);
            });
        })
};

fillDataToCommonJobPosting(getJobIfFromUrl());

//Function used to split skilss of candidate
const splitSkilsOfCandidate = skills => skills.split(',');

//Function used to return skill html of candidate
const skillHtml = skills => {
    let html = '';
    splitSkilsOfCandidate(skills).forEach(skill => {
        html += `<p href="" class="border-radius-5px">${skill}</p>`;
    })

    return html;
};

//Function used to show basic information of canidate when them applied to employer
const showBasicInforCandidate = (jobID) => {
    fetch(`http://localhost:56673/api/JobApplications/getCandidateAppliedFromJobID?jobID=${jobID}`)
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                data.forEach(element => {
                    let candidate_applied_list_container = document.querySelector('.candidate_applied_list_container');
                    if (candidate_applied_list_container != null) {
                        candidate_applied_list_container.innerHTML += `
                        <a class="card mb-3 al-job" href="/ApplyList/Details/${getJobIfFromUrl()}/${element.CandidateID}">
                        <div class="custom-image-container">
                            <img src="${element.ImgaeUrl}" />
                        </div>
                        <div class="card-body">
                            <div>
                                <span class="card-title font-bold">${element.Fullname}</span>
                            </div>
                            <div>
                                <span class="card-content al-job-salary">${element.CandidateLevel}</span>
                            </div>
                            <div>
                                <span class="card-content">${element.DateApplied}</span>
                            </div>
                            <div class="skill-requirement-container skill_req_candidate" style="margin:0">
                                ${skillHtml(element.Skills)}
                            </div>
                        </div>
                    </a>
                    `;
                    }
                });
            } else {
                document.querySelector('.candidate_applied_list_container').innerHTML = `<h2 class = "message_applyList_null">Danh sách ứng viên trống</h2>`;
            }
        })
};

showBasicInforCandidate(getJobIfFromUrl());

//Handle for apply candidate 

const showApplyOfCandidate = (jobID, candidateID) => {
    if (jobID != null && jobID != 'Details' && candidateID != null) {
        fetch(`http://localhost:56673/api/JobApplications/getCandidateAppliedFromJobIdAndCdID?jobID=${jobID}&candidateID=${candidateID}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                data.forEach(element => {
                    document.querySelector('.apply_candidate_fullName').innerText = element.Fullname;
                    document.querySelector('.apply_candidate_skills_list').innerHTML = skillHtml(element.Skills);
                    document.querySelector('.apply_candidate_experience_year').innerText = element.Experience;
                    document.querySelector('.apply_candidate_education').innerText = element.Education;
                    document.querySelector('.apply_candidate_cover_letter').innerHTML = element.CoverLetter;
                    document.getElementById('cvViewerApplyCandidate').src = element.CvUrl;
                });
            })
    }
};

const appliCandidatePart = window.location.pathname.split('/');
const jobID = appliCandidatePart[appliCandidatePart.length - 2];
const candidateID = appliCandidatePart[appliCandidatePart.length - 1];
showApplyOfCandidate(jobID, candidateID);

//Function used to Processing recruitment requests
const btnPrimary = document.querySelector('.btn-primary');
const btnDeny = document.querySelector('.btn-danger');

const processingRecruitmentRequest = (resquest) => {
    let formData = new FormData();
    formData.append('candidateID', candidateID);
    formData.append('jobID', jobID);
    if (resquest === 'confirm') {
        fetch(`http://localhost:56673/api/JobApplications/confirmStatus`, {
                method: 'PUT',
                body: formData
            })
            .then(response => {
                if (response.ok) {
                    btnPrimary.innerText = 'Đã chấp nhận';
                    btnDeny.innerText = 'Từ chối';
                }
            })
    } else {
        fetch(`http://localhost:56673/api/JobApplications/denyStatus`, {
                method: 'PUT',
                body: formData
            })
            .then(response => {
                if (response.ok) {
                    btnDeny.innerText = 'Đã từ chối';
                    btnPrimary.innerText = 'Chấp nhận';
                }
            })
    }

};

if (btnPrimary != null) {
    btnPrimary.addEventListener('click', function() {
        processingRecruitmentRequest('confirm');
    });
}

if (btnDeny != null) {
    btnDeny.addEventListener('click', function() {
        processingRecruitmentRequest('deny');
    });
}


//Function used to show status confirm or deny
const showStatus = (jobID, candidateID) => {
    if (jobID != null && jobID != 'Details' && candidateID != null) {
        fetch(`http://localhost:56673/api/JobApplications/isPrimary?jobID=${jobID}&candidateID=${candidateID}`)
            .then(response => response.json())
            .then(data => {
                if (btnPrimary != null && btnDeny != null) {
                    if (data == true) {
                        btnPrimary.innerText = 'Đã chấp nhận';
                        btnDeny.innerText = 'Từ chối';
                    } else if (data == false) {
                        btnDeny.innerText = 'Đã từ chối';
                        btnPrimary.innerText = 'Chấp nhận';
                    } else {
                        btnDeny.innerText = 'Từ chối';
                        btnPrimary.innerText = 'Chấp nhận';
                    }
                }
            })
    }
};

showStatus(jobID, candidateID);