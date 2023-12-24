using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using IT_Job_Finder.Models;

namespace IT_Job_Finder.Controllers
{
    public class AccountController : Controller
    {
        [HttpPost]
        public ActionResult LoginHome(string txtUserName_Login)
        {
            // Gán giá trị cho session
            Session["Username"] = txtUserName_Login;
            Session["Userid"] = GetUserByUsername(txtUserName_Login);
            return RedirectToAction("Index", "Home");
        }

        [HttpPost]
        public ActionResult LoginJobApplication(string txtUserName_Login, string jobAppID)
        {
            // Gán giá trị cho session
            Session["Username"] = txtUserName_Login;
            Session["Userid"] = GetUserByUsername(txtUserName_Login);
            return RedirectToAction("Details", "JobDetails", new { id = jobAppID});
        }


        public ActionResult LogOutHome()
        {
            if (Session["Username"] != null)
            {
                Session.Remove("Username");
            }
            return RedirectToAction("Index", "Home");
        }

        public ActionResult LogOutJobApplication()
        {
            if (Session["Username"] != null)
            {
                Session.Remove("Username");
            }
            return RedirectToAction("Details", "JobDetails");
        }

        public ActionResult SignUp()
        {
            return View("SignUp");
        }


        public ActionResult ForgotPW()
        {
            return View("ForgotPW");
        }

        public string GetFullName(string Username)
        {
            if (Username != "")
            {
                using (var db = new IT_JOB_FINDEREntities())
                {
                    var user = db.Users.FirstOrDefault(u => u.username == Username);
                    return user.full_name;
                }
            }
            return null;
        }

        public int GetUserByUsername(string Username)
        {
            if (Username != "")
            {
                using (var db = new IT_JOB_FINDEREntities())
                {
                    var user = db.Users.FirstOrDefault(u => u.username == Username);
                    return user.user_id;
                }
            }
            return -1;
        }

        public string GetRole(string Username)
        {
            if (Username != "")
            {
                using (var db = new IT_JOB_FINDEREntities())
                {
                    var user = db.Users.FirstOrDefault(u => u.username == Username);
                    return user.role;
                }
            }
            return null;
        }


        public ActionResult redirectToAccount (string Username)
        {
            string role = GetRole(Username);
            if (role == "Candidate")
            {
                return RedirectToAction("Index", "MaintainCandidate");
            }
            else
            {
                return RedirectToAction("Index", "Business");
            }
        } 
    }
}