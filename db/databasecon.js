const mongoose = require("mongoose");

const databsecon = () => {
  mongoose
    .connect(
      `mongodb+srv://shihabmoni15:PJDhr0tMiH0oz46G@cluster0.c0tr6qk.mongodb.net/?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .then((res) => {
      console.log("Databse connected");
    })
    .catch((err) => {
      console.log(err);
    });
};
module.exports = databsecon;
