using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace IT_Job_Finder.Controllers
{
    public class AccountController : Controller
    {
        // GET: Account
        public ActionResult SignUp()
        {
            return View("SignUp");
        }

        public ActionResult ForgotPW()
        {
            return View("ForgotPW");
        }
    }
}