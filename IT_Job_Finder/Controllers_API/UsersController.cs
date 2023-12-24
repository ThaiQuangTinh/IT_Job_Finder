using IT_Job_Finder.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace IT_Job_Finder.Controllers_API
{
    public class UsersController : ApiController
    {
        private IT_JOB_FINDEREntities db = new IT_JOB_FINDEREntities();

        [HttpGet]
        public IHttpActionResult GetAllUsers()
        {
            var user_list = (from user in db.Users select user).ToList();
            if (user_list == null || user_list.Count == 0)
            {
                return NotFound();
            }
            else
            {
                return Ok(user_list);
            }
        }

        [HttpGet]
        public IHttpActionResult GetUserByID(string id)
        {
            var user_list = (from user in db.Users where(user.username == id) select user).ToList();
            if (user_list == null || user_list.Count == 0)
            {
                return NotFound();
            }
            else
            {
                return Ok(user_list);
            }
        }

        [HttpGet]
        public IHttpActionResult GetAllUsernames()
        {
            var usernames_list = (from item in db.Users select item.username).ToList();
            if (usernames_list == null || usernames_list.Count == 0)
            {
                return NotFound();
            }
            else
            {
                return Ok(usernames_list);
            }
        }

        [HttpPost]
        public int getIdByUsername(string username)
        {
            using (var db = new IT_JOB_FINDEREntities())
            {
                var user = db.Users.FirstOrDefault(u => u.username == username);
                return user.user_id;
            }
        }

        public void saveDataUserType(string role, int id)
        {
            if (role == "Candidate")
            {
                db.CandidateProfiles.Add(new CandidateProfile()
                {
                    candidate_id = id,
                    address = "",
                    gender = false,
                    skills = "",
                    experience = "",
                    education = ""
                });
                db.SaveChanges();
            }
            else
            {
                db.Employers.Add(new Employer()
                {
                    employer_id = id,
                    company_name = "",
                    industry = "",
                    website = ""
                });
                db.SaveChanges();
            }
        }

        [HttpPost]
        public IHttpActionResult PostNewUser(User user)
        {
            if (!ModelState.IsValid)
            {
                BadRequest(ModelState);
            }

            db.Users.Add(new User()
            {
                username = user.username,
                password = user.password,
                email = user.email,
                full_name = user.full_name,
                role = user.role,
                imageURL = user.imageURL
            });
            db.SaveChanges();
            saveDataUserType(user.role, getIdByUsername(user.username));
            return Ok("User added successfully");
        }
    }
}

