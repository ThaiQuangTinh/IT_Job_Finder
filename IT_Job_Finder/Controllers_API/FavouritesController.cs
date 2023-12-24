using IT_Job_Finder.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace IT_Job_Finder.Controllers_API
{
    public class FavouritesController : ApiController
    {
        IT_JOB_FINDEREntities db = new IT_JOB_FINDEREntities();

        [HttpGet]
        public IHttpActionResult GetAllFavourites()
        {
            return Ok(db.Favorites.ToList());
        }

        [HttpPost]
        public IHttpActionResult PostFavorite(Favorite favorite)
        {
            if (!ModelState.IsValid)
            {
                BadRequest(ModelState);
            }
            db.Favorites.Add(new Favorite
            {
                candidate_id = favorite.candidate_id,
                job_id = favorite.job_id
            });
            db.SaveChanges();
            return Ok("Add Favorite suscess");
        }

        [HttpDelete]
        public IHttpActionResult DeleteFavorite(Favorite favorite)
        {
            if (!ModelState.IsValid)
            {
                BadRequest(ModelState);
            }
            favorite = db.Favorites
                .Where(f => f.candidate_id == favorite.candidate_id && f.job_id == favorite.job_id)
                .ToList()[0];
            db.Favorites.Remove(favorite);
            db.SaveChanges();
            return Ok("Delete Favorite suscess");
        }


        [HttpGet]
        public IHttpActionResult GetFavouriteJobFromID(int id)
        {
            var result = (from fv in db.Favorites
                          join cd in db.CandidateProfiles on fv.candidate_id equals cd.candidate_id
                          join jp in db.JobPostings on fv.job_id equals jp.job_id
                          join us in db.Users on jp.employer_id equals us.user_id
                          join emy in db.Employers on jp.employer_id equals emy.employer_id
                          where cd.candidate_id == id
                          select new
                          {
                              FavouriteId = fv.favorite_id,
                              Title = jp.title,
                              Location = jp.location,
                              Salary = jp.salary,
                              Description = jp.description,
                              ExperienceYear = jp.experience_year,
                              ImageUrl = us.imageURL,
                              CompanyName = emy.company_name
                          }).ToList();
            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);
        }

        [HttpDelete]
        public IHttpActionResult DeleteFavourites(int id)
        {
            var fv = db.Favorites.FirstOrDefault(f => f.favorite_id == id);
            if (fv == null)
            {
                return NotFound();
            }
            db.Favorites.Remove(fv);
            db.SaveChanges();
            return Ok();
        }
    }
}
