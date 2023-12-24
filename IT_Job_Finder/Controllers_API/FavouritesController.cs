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
        public IHttpActionResult DeleteFavorite(Favorite favorite) {
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
    }
}
