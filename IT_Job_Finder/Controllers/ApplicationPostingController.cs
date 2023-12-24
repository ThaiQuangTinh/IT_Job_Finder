using IT_Job_Finder.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace IT_Job_Finder.Controllers
{
    public class ApplicationPostingController : Controller
    {
        // GET: ApplicationPosting
        public ActionResult Index()
        {
            return View();
        }

        // GET: ApplicationPosting/Details/5
        public ActionResult Details(int jobId)
        {
            return View();
        }

        // GET: ApplicationPosting/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: ApplicationPosting/Create
        [HttpPost, ValidateInput(false)]
        public ActionResult PostApply(HttpPostedFileBase formFileInput)
        {
            int jobId = Convert.ToInt32(Request.Form["txtJobId"]);
            int candidateId = Convert.ToInt32(Request.Form["txtCandidateId"]);
            string coverLetter = Request.Form["txtCoverLetter"];
            string CvURL = Request.Form["txtCvURL"];
            IT_JOB_FINDEREntities db = new IT_JOB_FINDEREntities();

            if (formFileInput != null && formFileInput.ContentLength > 0)
            {
                var fileName = $"{jobId}_{candidateId}.pdf";
                var filePath = Path.Combine(Server.MapPath("~/Resource/Pdfs"), fileName);
                formFileInput.SaveAs(filePath);
            }

            db.JobApplications.Add(new JobApplication()
            {
                job_id = jobId,
                candidate_id = candidateId,
                cover_letter = coverLetter,
                date_applied = DateTime.Now,
                cvURL = CvURL
            });
            db.SaveChanges();

            return Redirect($"/JobDetails/Details/{jobId}");
        }

        // GET: ApplicationPosting/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: ApplicationPosting/Edit/5
        [HttpPost]
        public ActionResult Edit(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add update logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        // GET: ApplicationPosting/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: ApplicationPosting/Delete/5
        [HttpPost]
        public ActionResult Delete(int id, FormCollection collection)
        {
            try
            {
                // TODO: Add delete logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }
    }
}
