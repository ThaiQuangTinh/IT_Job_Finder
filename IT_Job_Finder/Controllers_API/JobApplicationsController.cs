using IT_Job_Finder.Models;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Configuration;
using System.Web.Http;

namespace IT_Job_Finder.Controllers_API
{
    //public class ApplyAndFile
    //{
    //    public IFormFile File { get; set; }
    //    public string Job_id { get; set; }
    //    public string Candidate_id { get; set; }
    //    public string Cover_letter { get; set; }
    //    public string CvURL { get; set; }
    //}
    public class JobApplicationsController : ApiController
    {
        IT_JOB_FINDEREntities db = new IT_JOB_FINDEREntities();

        [HttpGet]
        public IHttpActionResult GetAllJobApplications()
        {
            return Ok(db.JobApplications.ToList());
        }

        [HttpPost]
        public IHttpActionResult IsAppyed(JobApplication application)
        {
            int? job_id = application.job_id;
            int? candidate_id = application.candidate_id;
            var record = db.JobApplications.Where(c => (c.candidate_id == candidate_id && c.job_id == job_id))
                .FirstOrDefault();
            return Ok(record != null);
        }

        private async void Uploadfile(IFormFile file, int candidate_id, int job_id)
        {
            string fileName = $"{candidate_id}_{job_id}.pdf";
            string filePath = Path.Combine(Directory.GetCurrentDirectory(), "Resource\\Pdf");
            var exactPath = Path.Combine(Directory.GetCurrentDirectory(), "Resource\\Pdf", fileName);
            using (var stream = new FileStream(exactPath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }
        }

        [HttpGet]
        public IHttpActionResult GetJobApplicatedFromID(int id)
        {
            var result = (from ja in db.JobApplications
                          join cd in db.CandidateProfiles on ja.candidate_id equals cd.candidate_id
                          join jp in db.JobPostings on ja.job_id equals jp.job_id
                          join us in db.Users on jp.employer_id equals us.user_id
                          join emy in db.Employers on jp.employer_id equals emy.employer_id
                          where cd.candidate_id == id
                          select new
                          {
                              JobApplicationId = ja.job_application_id,
                              JobID = ja.job_id,
                              CandidateID = ja.candidate_id,
                              DateApplied = ja.date_applied,
                              Title = jp.title,
                              Location = jp.location,
                              Salary = jp.salary,
                              Description = jp.description,
                              ExperienceYear = jp.experience_year,
                              ImageUrl = us.imageURL,
                              CompanyName = emy.company_name
                          }).ToList();
            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);
        }

        [HttpDelete]
        public IHttpActionResult DeleteJobApplication(int id)
        {
            var ja = db.JobApplications.FirstOrDefault(j => j.job_application_id == id);
            if (ja == null)
            {
                return NotFound();
            }
            db.JobApplications.Remove(ja);
            db.SaveChanges();
            return Ok();
        }

        //API used to get job applications list of canidate applied to employer from Job ID
        [HttpGet]
        public IHttpActionResult getCandidateAppliedFromJobID(int jobID)
        {
            var result = (from ja in db.JobApplications
                          join cp in db.CandidateProfiles on ja.candidate_id equals cp.candidate_id
                          join us in db.Users on ja.candidate_id equals us.user_id
                          where ja.job_id == jobID
                          select new
                          {
                              CandidateID = us.user_id,
                              Fullname = us.full_name,
                              ImgaeUrl = us.imageURL,
                              Address = cp.address,
                              Skills = cp.skills,
                              Experience = cp.experience,
                              Education = cp.education,
                              DateApplied = ja.date_applied,
                              CoverLetter = ja.cover_letter,
                              CvUrl = ja.cvURL,
                              Status = ja.status
                          }).ToList();
            if (result == null)
            {
                return NotFound();
            }

            return Ok(result);
        }

        //API used to get job applications list of canidate applied to employer from Job ID and canidate id
        [HttpGet]
        public IHttpActionResult getCandidateAppliedFromJobIdAndCdID(int jobID, int candidateID)
        {
            var result = (from ja in db.JobApplications
                          join cp in db.CandidateProfiles on ja.candidate_id equals cp.candidate_id
                          join us in db.Users on ja.candidate_id equals us.user_id
                          where ja.job_id == jobID && cp.candidate_id == candidateID
                          select new
                          {
                              CandidateID = us.user_id,
                              Fullname = us.full_name,
                              ImgaeUrl = us.imageURL,
                              Address = cp.address,
                              Skills = cp.skills,
                              Experience = cp.experience,
                              Education = cp.education,
                              DateApplied = ja.date_applied,
                              CoverLetter = ja.cover_letter,
                              CvUrl = ja.cvURL,
                              Status = ja.status
                          }).ToList();
            if (result == null)
            {
                return NotFound();
            }

            return Ok(result);
        }

        //API used to change status
        [HttpPut]
        public IHttpActionResult confirmStatus()
        {
            int candidateID = int.Parse(HttpContext.Current.Request.Form["candidateID"]);
            int jobID = int.Parse(HttpContext.Current.Request.Form["jobID"]);

            var jobApplly = db.JobApplications.FirstOrDefault(ja => ja.job_id == jobID && ja.candidate_id == candidateID);
            if (jobApplly == null)
            {
                return NotFound();
            }

            jobApplly.status = true;
            db.SaveChanges();
            return Ok();
        }

        [HttpPut]
        public IHttpActionResult denyStatus()
        {
            int candidateID = int.Parse(HttpContext.Current.Request.Form["candidateID"]);
            int jobID = int.Parse(HttpContext.Current.Request.Form["jobID"]);

            var jobApplly = db.JobApplications.FirstOrDefault(ja => ja.job_id == jobID && ja.candidate_id == candidateID);
            if (jobApplly == null)
            {
                return NotFound();
            }

            jobApplly.status = false;
            db.SaveChanges();
            return Ok();
        }

        //API used to check status
        [HttpGet]
        public IHttpActionResult isPrimary(int jobID, int candidateID)
        {
            var jobApplly = db.JobApplications.FirstOrDefault(ja => ja.job_id == jobID && ja.candidate_id == candidateID);
            if (jobApplly == null)
            {
                return NotFound();
            }
            if (jobApplly.status == true)
            {
                return Ok(true);
            }
            else if (jobApplly.status == false)
            {
                return Ok(false);
            }
            else
            {
                return Ok("Wait");
            }
        }

        
    }
}
