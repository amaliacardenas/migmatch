var mongoose = require('mongoose');

var User = require('../models/user');
var Refugee = require('../models/Refugee');

mongoose.connect('mongodb://localhost:27017/refugee-app');

User.collection.drop();
Refugee.collection.drop();

name: String,
avatar: String,
images: String,
story: String,
lat: String,
lng: String,
location: String,
language: String,
user: { type: mongoose.Schema.ObjectId, ref: 'User' }



User.create([{
  username: "amalia",
  email: "amalia@gmail.com",
  password:'password',
  passwordConfirmation: "password"

},{
  username: "danielle",
  email: "danielle@gmail.com",
  password:'password',
  passwordConfirmation: "password"

},{
  username: "Ilan",
  email: "Ilan@gmail.com",
  password:'password',
  passwordConfirmation: "password"

}], function(err, users){
  if (err) console.error(err);

  Refugee.create([{
    brand: "Nike",
    material:"leather",
    color:"red",
    image:"http://images.footlocker.com/pi/99728021/zoom/nike-roshe-one-boys-grade-school"
  },
  {
      brand: "NO LOGO",
      material:"cloth",
      color:"purple",
      image:"http://a66c7b.medialib.glogster.com/media/63/637f449f647be21bca929211a84c556b1314352716b2477e13c6f07cf62714a7/fool-tsa-with-these-shoes-jpg.jpg"
    },
    {
        brand: "Turtle",
        material:"sand",
        color:"brown",
        image:"http://www.polyvore.com/cgi/img-thing?.out=jpg&size=l&tid=15325924"
      }

  ], function(err, refugees){
    if(err) console.error(err);
    console.log(refugees, users);
    mongoose.connection.close();
  });
  
})