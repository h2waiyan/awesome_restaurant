const mongoose = require("mongoose");
const app = require("./app");

const port = process.env.PORT || 3000;

const uri =
  "mongodb+srv://<user>:<password>@awesomeres.0oaokrz.mongodb.net/awesomerestaurant?retryWrites=true&w=majority";

mongoose
  .connect(uri.replace(
    "<user>", process.env.DBUSER,
    "<password>", process.env.DBPASSWORD))
  .then((conn) => {
    // console.log(conn);
    console.log("Conntect to database");
  });

server = app.listen(port, () => {
  console.log(`App is runing on port ${port}`);
});

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  console.log("UnhandledRejection");
  server.close(() => {
    process.exit(1);
  });
});
