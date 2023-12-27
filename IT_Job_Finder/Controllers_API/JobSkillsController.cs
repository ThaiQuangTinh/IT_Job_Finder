using IT_Job_Finder.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace IT_Job_Finder.Controllers_API
{
    public class JobSkillsController : ApiController
    {
        IT_JOB_FINDEREntities db = new IT_JOB_FINDEREntities();

        [HttpGet]
        public IHttpActionResult GetAllJobSkilss()
        {
            return Ok(db.JobSkills.ToList());
        }

              //API used to get skill requirements from job ID
        [HttpGet]
        public IHttpActionResult getSkillReqFromJobID(int jobID)
        {
            var result = (from js in db.JobSkills
                          join sr in db.SkillRequirements on js.skill_id equals sr.skill_id
                          join jp in db.JobPostings on js.job_id equals jp.job_id
                          where js.job_id == jobID
                          select new
                          {
                              JobSkillID = js.job_skill_id,
                              JobID = js.job_id,
                              SkillID = js.skill_id,
                              SkillName = sr.skill_name
                          }).ToList();
            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);
        }

    }
}
