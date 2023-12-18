using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace IT_Job_Finder.Controllers
{
    public class JobDetailsController : Controller
    {
        // GET: JobDetails
        public ActionResult Index()
        {
            return View();
        }

        // GET: JobDetails/Details/5
        public ActionResult Details(int id)
        {
            return View();
        }

        // GET: JobDetails/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: JobDetails/Create
        [HttpPost]
        public ActionResult Create(FormCollection collection)
        {
            try
            {
                // TODO: Add insert logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

        // GET: JobDetails/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: JobDetails/Edit/5
        //[HttpPost]
        //public ActionResult Edit(int id, FormCollection collection)
        //{
        //    try
        //    {
        //        // TODO: Add update logic here

        //        return RedirectToAction("Index");
        //    }
        //    catch
        //    {
        //        return View();
        //    }
        //}

        // GET: JobDetails/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: JobDetails/Delete/5
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
