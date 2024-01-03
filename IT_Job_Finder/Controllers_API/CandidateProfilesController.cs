using IT_Job_Finder.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;

namespace IT_Job_Finder.Controllers_API
{
    public class CandidateProfilesController : ApiController
    {
        IT_JOB_FINDEREntities db = new IT_JOB_FINDEREntities();

        [HttpGet]
        public IHttpActionResult GetAllCandidateProfiles()
        {
            return Ok(db.CandidateProfiles.ToList());
        }

        [HttpGet]
        public IHttpActionResult GetCandidateProfileById(int id)
        {
            if (!ModelState.IsValid)
            {
                BadRequest(ModelState);
            }
            var candidateProfile = db.CandidateProfiles
                .Where(c => c.candidate_id == id)
                .SingleOrDefault();
            if (candidateProfile == null)
            {
                return NotFound();
            }
            return Ok(candidateProfile);
        }

        //Mehod get full information of candidates
        [HttpGet]
        public IHttpActionResult GetFullInforOfCandidate()
        {
            var result = (from cd in db.CandidateProfiles
                          join users in db.Users on cd.candidate_id equals users.user_id
                          select new
                          {
                              ID = cd.candidate_id,
                              Username = users.username,
                              Email = users.email,
                              Fullname = users.full_name,
                              ImgaeUrl = users.imageURL,
                              Address = cd.address,
                              Gender = cd.gender,
                              Skills = cd.skills,
                              Experience = cd.experience,
                              Education = cd.education,
                              CandidateLevel = cd.candidate_level
                          }).ToList();
            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);
        }

        //Method put used to update information of candidate
        [HttpPut]
        public IHttpActionResult PutCandidateInfor()
        {
            var candidate_id = int.Parse(HttpContext.Current.Request.Form["candidate_id"]);
            var imageUrl = HttpContext.Current.Request.Files["ImageUrl"];

            var candidate_infor = db.CandidateProfiles.FirstOrDefault(cd => cd.candidate_id == candidate_id);
            var userInfor = db.Users.FirstOrDefault(us => us.user_id == candidate_id);
            if (candidate_infor == null || userInfor == null)
            {
                return NotFound();
            }

            userInfor.email = HttpContext.Current.Request.Form["Email"];
            userInfor.full_name = HttpContext.Current.Request.Form["Fullname"];

            if (imageUrl != null && imageUrl.ContentLength > 0)
            {
                string extension = Path.GetExtension(imageUrl.FileName);
                var fileName = $"{userInfor.username}" + extension;
                var folderPath = HttpContext.Current.Server.MapPath("~/Resource/Images/");
                var filePath = Path.Combine(folderPath, fileName);

                imageUrl.SaveAs(filePath);
                userInfor.imageURL = "../../Resource/Images/" + fileName; // Lưu đường dẫn trong cơ sở dữ liệu
            }

            // Tiếp tục cập nhật thông tin của candidate
            candidate_infor.address = HttpContext.Current.Request.Form["Address"];
            candidate_infor.gender = bool.Parse(HttpContext.Current.Request.Form["Gender"]);
            candidate_infor.skills = HttpContext.Current.Request.Form["Skills"];
            candidate_infor.experience = HttpContext.Current.Request.Form["Experience"];
            candidate_infor.education = HttpContext.Current.Request.Form["Education"];
            candidate_infor.candidate_level = HttpContext.Current.Request.Form["CandidateLevel"];

            db.SaveChanges();
            return Ok();
        }
    }
}
