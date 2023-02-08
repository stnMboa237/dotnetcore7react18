using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Persistence;

namespace API.Extensions
{
    public static class IdentityServiceExtensions
    {
        public static IServiceCollection AddIdentityServices(this IServiceCollection services, IConfiguration config) {
            services.AddIdentityCore<AppUser>(opt => {
                /*here we are setting up the complexeness of a password from opt.Password.<option name>*/
                opt.Password.RequireDigit = true;
                opt.Password.RequireNonAlphanumeric = false;
            }).AddEntityFrameworkStores<DataContext>();
            services.AddAuthentication();
            return services;
        }
    }
}