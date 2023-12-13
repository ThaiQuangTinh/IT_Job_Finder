using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace IT_Job_Finder.App_Start
{
    public class WebApiConfig
    {
         public static void Register(HttpConfiguration config)
        {
            config.MapHttpAttributeRoutes();

            //config.Routes.MapHttpRoute(
            //    name: "DefaultHelloApi",
            //    routeTemplate: "api/Users/{action}/{id}",
            //    defaults: new { controller = "Users", action = "GetAllUsers", id = RouteParameter.Optional }
            //);

            config.Routes.MapHttpRoute(
                name: "defaultapi",
                routeTemplate: "api/{controller}/{action}/{id}",
                defaults: new { id = RouteParameter.Optional }
            );
        }
    }
}