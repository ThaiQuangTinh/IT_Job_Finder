using IT_Job_Finder.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Http.Controllers;

namespace IT_Job_Finder.Controllers_API
{
    public class EmployersController : ApiController
    {
        IT_JOB_FINDEREntities db = new IT_JOB_FINDEREntities();

        [HttpGet]
        public IHttpActionResult GetAllEmployers()
        {
           return Ok(db.Employers.ToList());
        }

        [HttpGet]
        public IHttpActionResult GetEmployerById(int id)
        {
            return Ok(db.Employers.FirstOrDefault(e => (e.employer_id == id)));
        }

        [HttpPut]
        public IHttpActionResult PutEployer()
        {
            var employer_id = Int32.Parse(HttpContext.Current.Request.Form["Employer_id"]);
            var employer = db.Employers.FirstOrDefault(e => e.employer_id == employer_id);
            if (employer == null)
            {
                return NotFound();
            }
            employer.company_name = HttpContext.Current.Request.Form["Company_name"];
            employer.industry = HttpContext.Current.Request.Form["Industry"];
            employer.website = HttpContext.Current.Request.Form["Website"];
            var img = HttpContext.Current.Request.Files["Image"];

            if(img != null && img.ContentLength > 0)
            {
                string extention = Path.GetExtension(img.FileName);
                string filename = employer.User.username + extention;
                string folderpath = HttpContext.Current.Server.MapPath("~/Resource/Images");
                string filepath = Path.Combine(folderpath, filename);
                img.SaveAs(filepath);
                employer.User.imageURL = $"../../../Resource/Images/{filename}";
            }
            else
            {
                employer.User.imageURL = null;
            }
            db.SaveChanges();

            return Ok(employer);
        }
    }

}
