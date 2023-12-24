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

        //[HttpPost]
        //public async Task<IHttpActionResult> PostApplication(ApplyAndFile model) {
        //    if (!ModelState.IsValid)
        //    {
        //        BadRequest(ModelState);
        //    }
        //    if(model == null)
        //    {
        //        return NotFound();
        //    }
        //    db.JobApplications.Add(new JobApplication()
        //    {
        //        job_id = Int32.Parse(model.Job_id),
        //        candidate_id = Int32.Parse(model.Candidate_id),
        //        date_applied = DateTime.Now,
        //        cover_letter = model.Cover_letter,
        //        cvURL = model.CvURL,
        //    });
        //    await db.SaveChangesAsync();
        //    if (model.File != null)
        //    {
        //        Uploadfile(model.File, Int32.Parse(model.Candidate_id), Int32.Parse(model.Job_id));
        //    }
        //    return Ok(model);
        //}
        
        private async void Uploadfile(IFormFile file, int candidate_id, int job_id)
        {
            string fileName = $"{candidate_id}_{job_id}.pdf";
            string filePath = Path.Combine(Directory.GetCurrentDirectory(),"Resource\\Pdf");
            var exactPath = Path.Combine(Directory.GetCurrentDirectory(), "Resource\\Pdf", fileName);
            using (var stream = new FileStream(exactPath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }
        }
    }
}
