//Function used to show list job by employer id
const showListJobByEmployer = function(id) {
    fetch(`http://localhost:56673/api/JobPostings/getJobPostingListInfor?employer_ID=${id}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            data.forEach(function(element) {
                document.querySelector('.al-job-container').innerHTML += `
                    <a class="card mb-3 al-job" href="/ApplyList/Details/${element.JobID}">
                        <div class="custom-image-container">
                            <img src="${element.ImageUrl}" />
                        </div>
                        <div class="card-body">
                            <div>
                                <span class="card-title font-bold">${element.Title}</span>
                            </div>
                            <div>
                                <span class="card-content">${element.Location}</span>
                            </div>
                            <div>
                                <span class="card-content al-job-salary">${element.Salary}</span>
                            </div>
                            <div>
                                <span class="card-content">${element.DatePosted}</span>
                            </div>
                        </div>
                    </a>
                `
            })
        })
};



const employer_id = document.getElementById('userId');
//Call function 
showListJobByEmployer(employer_id.value);