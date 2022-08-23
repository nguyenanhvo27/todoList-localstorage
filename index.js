const MongoClient = require("mongodb").MongoClient;

MongoClient.connect("mongodb://localhost:27017", (err, client) => {
  if (err) {
    return console.log(err);
  }
  console.log("da ket noi voi database thanh cong");

  var dbo = db.db("todolist");
  dbo.createCollection("person", (err, res) => {
    if (err) throw err;

    console.log("tao bang thanh cong");
  });
});
