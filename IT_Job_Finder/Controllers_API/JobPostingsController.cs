using IT_Job_Finder.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

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
        public IHttpActionResult SearchForJobPosting(string title, string location, decimal salary, string skill_name)
        {
            var jobPostings = db.JobPostings
                .Where(job => ((string.IsNullOrEmpty(title)? true : job.title.Contains(title))
                && (string.IsNullOrEmpty(location) ? true : job.location.Contains(location)) 
                && (job.salary >= salary) 
                && (string.IsNullOrEmpty(skill_name) ? true : job.JobSkills.Any(skill => skill.SkillRequirement.skill_name == skill_name))))
                .OrderBy(j => j.date_posted)
                .ToList();
            if (jobPostings == null && jobPostings.Count == 0)
            {
                return NotFound();
            }
            return Ok(jobPostings);
        }
    }
}
