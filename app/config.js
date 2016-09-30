var path = require('path');
// var knex = require('knex')({
//   client: 'sqlite3',
//   connection: {
//     filename: path.join(__dirname, '../db/shortly.sqlite')
//   }
// });
// var db = require('bookshelf')(knex);

var mongoose = require('mongoose');
var Schema = mongoose.Schema, ObjectId = Schema.ObjectId;
mongoose.connect('mongodb://localhost/myDB');//자기 호스트 연결 
//var db = mongoose.connection;

//db.on('err', console.err.bind(console,'connection err'));
//db.once('open',function(){
  
    var urls = new Schema({
      url : String,
      baseUrl: String,
      code: String,
      title: String,
      visits: { type: Number, default:0 }, 
      time: { type: Date, default:Date.now }
    });

    var users = new Schema({
      username : { type: String, required: true, unique: true },
      password:{ type: String, required: true },
      time: { type: Date, default:Date.now }
    });

})

// db.knex.schema.hasTable('urls').then(function(exists) {
//   if (!exists) {
//     db.knex.schema.createTable('urls', function (link) {
//       link.increments('id').primary();
//       link.string('url', 255);
//       link.string('baseUrl', 255);
//       link.string('code', 100);
//       link.string('title', 255);
//       link.integer('visits');
//       link.timestamps();
//     }).then(function (table) {
//       console.log('Created Table', table);
//     });
//   }
// });

// db.knex.schema.hasTable('users').then(function(exists) {
//   if (!exists) {
//     db.knex.schema.createTable('users', function (user) {
//       user.increments('id').primary();
//       user.string('username', 100).unique();
//       user.string('password', 100);
//       user.timestamps();
//     }).then(function (table) {
//       console.log('Created Table', table);
//     });
//   }
// });

module.exports = {
  user: users,
  url: urls
};
