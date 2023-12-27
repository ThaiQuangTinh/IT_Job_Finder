using IT_Job_Finder.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.UI.WebControls;

namespace IT_Job_Finder.Controllers_API
{
    public class JobPostingsController : ApiController
    {
        IT_JOB_FINDEREntities db = new IT_JOB_FINDEREntities();

        [HttpGet]
        public IHttpActionResult GetAllJobPostings()
        {
            // Get all job postings with their associated skills
            // Get all job postings and their associated skills
            var jobPostingsWithSkills = db.JobPostings
                .Include(p => p.JobSkills)
                .Include(e => e.Employer)
                .OrderBy(j => j.date_posted)
                .ToList();
            if (jobPostingsWithSkills == null && jobPostingsWithSkills.Count == 0)
            {
                return NotFound();
            }
            return Ok(jobPostingsWithSkills);
        }

        [HttpGet]
        public IHttpActionResult GetJobPosting(int id)
        {
            var jobPostingsWithSkill = db.JobPostings
                .Include(p => p.JobSkills)
                .Include(e => e.Employer)
                .Include(f => f.Favorites)
                .Where(j => (j.job_id == id))
                .Where(f => (f.job_id == id))
                .ToList();
            if (jobPostingsWithSkill == null && jobPostingsWithSkill.Count == 0)
            {
                return NotFound();
            }
            return Ok(jobPostingsWithSkill);
        }

        [HttpGet]
        public IHttpActionResult GetJobPostingSecure(int jobId, int employeeId)
        {
            var jobPosting = db.JobPostings
                .Where(j => j.job_id == jobId && j.Employer.employer_id == employeeId)
                .FirstOrDefault();
            if (jobPosting == null)
            {
                return NotFound();
            }
            return Ok(jobPosting);
        }

        [HttpGet]
        public IHttpActionResult SearchForJobPosting(string title, string location, decimal salary, string skill_name)
        {
            var jobPostings = db.JobPostings
                .Where(job => ((string.IsNullOrEmpty(title)? true : job.title.Contains(title))
                && (string.IsNullOrEmpty(location) ? true : job.location.Contains(location)) 
                && (job.salary >= salary) 
                && (string.IsNullOrEmpty(skill_name) ? true : job.JobSkills.Any(skill => skill.SkillRequirement.skill_name.Contains(skill_name)))))
                .OrderBy(j => j.date_posted)
                .ToList();
            if (jobPostings == null || jobPostings.Count == 0)
            {
                return NotFound();
            }
            return Ok(jobPostings);
        }

        [HttpGet]
        public IHttpActionResult GetJobPostingByEmployeeId(int id)
        {
            var jobPostings = db.JobPostings
                .Where(jb => jb.Employer.employer_id == id)
                .ToList();
            if(jobPostings == null)
            {
                return NotFound();
            }
            return Ok(jobPostings);
        }

        [HttpPut]
        public IHttpActionResult PutChangeJobPostingInfo()
        {
            int jobId = Int32.Parse(HttpContext.Current.Request.Form["JobId"]);
            var job = db.JobPostings.FirstOrDefault(jp => jp.job_id == jobId);
            db.JobSkills.RemoveRange(db.JobSkills.Where(js => js.job_id == jobId));
            job.title = HttpContext.Current.Request.Form["Title"];
            job.location = HttpContext.Current.Request.Form["Location"];
            job.level_id = Int32.Parse(HttpContext.Current.Request.Form["LevelId"]);
            job.contract_type = HttpContext.Current.Request.Form["ContractType"];
            job.description = HttpContext.Current.Request.Form["Description"]; 
            job.salary = Int32.Parse(HttpContext.Current.Request.Form["Salary"]);
            job.experience_year = Int32.Parse(HttpContext.Current.Request.Form["ExYear"]);
            var skills = HttpContext.Current.Request.Form["Skills"].Trim().Split(' ');
            foreach ( var skill in skills)
            {
                job.JobSkills.Add(new JobSkill()
                {
                    job_id = jobId,
                    skill_id = Int32.Parse(skill)
                });
            }
            db.SaveChanges();
            return Ok(job);
        }

        [HttpPut]
        public IHttpActionResult PostJobPosting()
        {
            int employerId = Int32.Parse(HttpContext.Current.Request.Form["UserId"]);
            db.JobPostings.Add(new JobPosting()
            {
                employer_id = employerId,
                title = HttpContext.Current.Request.Form["Title"],
                location = HttpContext.Current.Request.Form["Location"],
                salary = Int32.Parse(HttpContext.Current.Request.Form["Salary"]),
                description = HttpContext.Current.Request.Form["Description"],
                experience_year = Int32.Parse(HttpContext.Current.Request.Form["ExYear"]),
                level_id = Int32.Parse(HttpContext.Current.Request.Form["LevelId"]),
                contract_type = HttpContext.Current.Request.Form["ContractType"],
                date_posted = DateTime.Now,
            });
            db.SaveChanges();
            int jobId = db.JobPostings
                .Where(jb => jb.employer_id == employerId)
                .OrderByDescending(jb => jb.job_id)
                .FirstOrDefault().job_id;
            var skills = HttpContext.Current.Request.Form["Skills"].Trim().Split(' ');
            foreach ( var skill in skills)
            {
                db.JobSkills.Add(new JobSkill()
                {
                    job_id = jobId,
                    skill_id = Int32.Parse(skill)
                });
            }
            db.SaveChanges();
            return Ok();
        }

        [HttpDelete]
        public IHttpActionResult DeleteJobPosting(int id)
        {
            db.JobSkills.RemoveRange(db.JobSkills.Where(js => js.job_id == id));
            db.Favorites.RemoveRange(db.Favorites.Where(f => f.job_id == id));
            db.JobApplications.RemoveRange(db.JobApplications.Where(a => a.job_id == id));
            db.JobPostings.RemoveRange(db.JobPostings.Where(j => j.job_id == id));
            db.SaveChanges();
            return Ok();
        }


             //API used to get infor of job posting to display job posting list form employer id
        [HttpGet]
        public IHttpActionResult getJobPostingListInfor(int employer_ID)
        {
            var result = (from jp in db.JobPostings
                          join ep in db.Employers on jp.employer_id equals ep.employer_id
                          join us in db.Users on ep.employer_id equals us.user_id
                          where jp.employer_id == employer_ID
                          select new
                          {
                              JobID = jp.job_id,
                              EmployerID = jp.employer_id,
                              ImageUrl = us.imageURL,
                              Title = jp.title,
                              Location = jp.location,
                              Salary = jp.salary,
                              DatePosted = jp.date_posted
                          }
                           ).ToList();
            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);
        }

        //API used to get job posting details from job_id
        [HttpGet]
        public IHttpActionResult getJobPostingDetailFromID(int jobID)
        {
            //var jobPosting = db.JobPostings.FirstOrDefault(j => j.job_id == jobID);

            var jobPosting = (from jp in db.JobPostings
                              join lv in db.Levels on jp.level_id equals lv.level_id
                              where jp.job_id == jobID
                              select new
                              {
                                  JobID = jp.job_id,
                                  Title = jp.title,
                                  Location = jp.location,
                                  Salary = jp.salary,
                                  ExperienceYear = jp.experience_year,
                                  ContractType = jp.contract_type,
                                  Level = lv.level_name
                              }).ToList();
            if (jobPosting == null)
            {
                return NotFound();
            }
            return Ok(jobPosting);
        }

    }
}
