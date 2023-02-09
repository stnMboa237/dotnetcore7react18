using System.Text;
using API.Services;
using Domain;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
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
                opt.User.RequireUniqueEmail = true;
            }).AddEntityFrameworkStores<DataContext>();

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["TokenKey"]));
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(opt => 
            {
                opt.TokenValidationParameters = new TokenValidationParameters {
                    ValidateIssuerSigningKey = true, /* validate if token is valid token!!! IMPORTANT!!! */
                    IssuerSigningKey = key,  /*the key here must be the same as into TokenServices.cs */
                    ValidateIssuer = false,  /*nous validons pas car nous voulons laisser la validation aussi basique que possible*/
                    ValidateAudience = false,/*nous validons pas car nous voulons laisser la validation aussi basique que possible*/

                };
            });
            services.AddScoped<TokenService>();

            return services;
        }
    }
}