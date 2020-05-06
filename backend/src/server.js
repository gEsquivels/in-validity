const app = require('./app');

const serverConfig = require('./config/server');

app.listen(serverConfig.PORT, err => {
  if(err) throw err
  console.log(`Server is running in http://${serverConfig.host}:${serverConfig.PORT}`);
});
