using System;
using IT_Job_Finder.Models;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Threading.Tasks;
using System.Web.Http.Controllers;

namespace IT_Job_Finder.Controllers_API
{
    public class LevelsController : ApiController
    {
        private IT_JOB_FINDEREntities db = new IT_JOB_FINDEREntities();
        
        [HttpGet]
        public IHttpActionResult GetAllLevels()
        {
            var list = db.Levels.ToList();
            return Ok(list);
        }
    }
}
