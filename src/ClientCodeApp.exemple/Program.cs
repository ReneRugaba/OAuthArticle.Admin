using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Net.Http.Headers;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddRazorPages();
builder.Services.AddServerSideBlazor();

builder.Services.AddHttpContextAccessor();

builder.Services.AddHttpClient("IDPClient", client =>
{
    client.BaseAddress = new Uri("https://localhost:44303/");
    client.DefaultRequestHeaders.Clear();
    client.DefaultRequestHeaders.Add(HeaderNames.Accept, "application/json");
});

builder.Services.AddAuthentication(opt =>
{
    opt.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
    opt.DefaultChallengeScheme = "OAuth2";
})
.AddCookie(CookieAuthenticationDefaults.AuthenticationScheme)
.AddOAuth("OAuth2", opt =>
{
    opt.ClientId = "client_id_codeflow";
    opt.ClientSecret = "client_secret_codeflow";
    opt.CallbackPath = "/callback";
    opt.AuthorizationEndpoint = "https://localhost:44310/connect/authorize";
    opt.TokenEndpoint = "https://localhost:44310/connect/token";
    opt.UserInformationEndpoint = "https://localhost:44310/connect/userinfo";
    opt.Scope.Add("rewardsApi.read");
    opt.SaveTokens = true;
    opt.UsePkce = true;
});

builder.Services.AddAuthorizationCore(opt =>
{
    opt.FallbackPolicy = new AuthorizationPolicyBuilder()
        .RequireAuthenticatedUser()
        .Build();
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();

app.UseStaticFiles();

app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

app.MapBlazorHub();
app.MapFallbackToPage("/_Host");

app.Run();
