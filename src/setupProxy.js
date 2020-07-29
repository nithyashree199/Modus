const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    createProxyMiddleware("/rest/userinfo", {
      target: "https://modus-services-testing.azurewebsites.net",
      secure: false,
      changeOrigin: true
    })
  );
  //divya
  app.use(
    createProxyMiddleware("/rest/systemadmin", {
      target: "https://modus-services-testing.azurewebsites.net",
      secure: false,
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware("/rest/systemadmins", {
      target: "https://modus-services-testing.azurewebsites.net",
      secure: false,
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware("/rest/organization/users/", {
      target: "https://modus-services-testing.azurewebsites.net",
      secure: false,
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware("/rest/organization/user/", {
      target: "https://modus-services-testing.azurewebsites.net",
      secure: false,
      changeOrigin: true,
    })
  );
  app.use(
    createProxyMiddleware("/rest/organizations", {
      target: "https://modus-services-testing.azurewebsites.net",
      secure: false,
      changeOrigin: true
    })
  );
  app.use(
    createProxyMiddleware("/rest/organization", {
      target: "https://modus-services-testing.azurewebsites.net",
      secure: false,
      changeOrigin: true
    })
  );

  app.use(
    createProxyMiddleware("/rest/facilities/", {
      target: "https://modus-services-testing.azurewebsites.net",
      secure: false,
      changeOrigin: true
    })
  );
  app.use(
    createProxyMiddleware("/rest/facility", {
      target: "https://modus-services-testing.azurewebsites.net",
      secure: false,
      changeOrigin: true
    })
  );

  app.use(
    createProxyMiddleware("/rest/facility/users/", {
      target: "https://modus-services-testing.azurewebsites.net",
      secure: false,
      changeOrigin: true
    })
  );
  app.use(
    createProxyMiddleware("/rest/facility/user", {
      target: "https://modus-services-testing.azurewebsites.net",
      secure: false,
      changeOrigin: true
    })
  );
  app.use(
    createProxyMiddleware("/rest/modus/roles", {
      target: "https://modus-services-testing.azurewebsites.net",
      secure: false,
      changeOrigin: true
    })
  );

};
