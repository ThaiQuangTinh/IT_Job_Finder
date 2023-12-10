using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace IT_Job_Finder.Controllers
{
    public class ApplyListController : Controller
    {
        // GET: ApplyList
        public ActionResult Index()
        {
            return View();
        }

        // GET: ApplyList/Details/5
        public ActionResult Details(int jobId)
        {
            return View();
        }

        public ActionResult ApplyCandidate(int jobId, int candidateId)
        {
            return View();
        }

        // GET: ApplyList/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: ApplyList/Create
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

        // GET: ApplyList/Edit/5
        public ActionResult Edit(int id)
        {
            return View();
        }

        // POST: ApplyList/Edit/5
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

        // GET: ApplyList/Delete/5
        public ActionResult Delete(int id)
        {
            return View();
        }

        // POST: ApplyList/Delete/5
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
