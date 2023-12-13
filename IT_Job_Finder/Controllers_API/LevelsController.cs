using System;
using IT_Job_Finder.Models;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace IT_Job_Finder.Controllers_API
{
    public class LevelsController : ApiController
    {
        private IT_JOB_FINDEREntities db = new IT_JOB_FINDEREntities();
        
        [HttpGet]
        public IHttpActionResult GetAllLevels()
        {
            return Ok(db.Levels.ToList());
        }
    }
}
