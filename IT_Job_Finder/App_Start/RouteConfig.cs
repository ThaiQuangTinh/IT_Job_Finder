using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace IT_Job_Finder
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
                name: "ApplyListController_Detail",
                url: "ApplyList/Details/{jobId}",
                defaults: new { controller = "ApplyList", action = "Details", jobId = UrlParameter.Optional }
            );

            routes.MapRoute(
                name: "ApplyListController_ApplyCandidate",
                url: "ApplyList/Details/{jobId}/{candidateId}",
                defaults: new { controller = "ApplyList", action = "ApplyCandidate", jobId = UrlParameter.Optional, candidateId = UrlParameter.Optional }
            );

            routes.MapRoute(
                name: "Default",
                url: "{controller}/{action}/{id}",
                defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
            );
        }
    }
}
