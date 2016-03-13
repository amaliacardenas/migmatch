var mongoose = require('mongoose');
var User = require('../models/user');
var Refugee = require('../models/Refugee');
mongoose.connect('mongodb://localhost:27017/refugee-app');
User.collection.drop();
Refugee.collection.drop();
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
    name: "Abdisalan",
    avatar: "http://www.thestar.com/content/dam/thestar/news/canada/2015/12/03/syrian-refugee-families-study-canadian-life-as-they-await-new-home/alhajali3.jpg.size.xxlarge.letterbox.jpg",
    images: "http://i.dailymail.co.uk/i/pix/2015/09/12/15/2BEFF0B400000578-3231929-Borussia_Dortmund_supporters_pictured_in_2014_hold_a_banner_duri-a-71_1442068715543.jpg",
    story: "'Everybody has to make their own decision, says Abdisalan.' 'If you say to people, ‘this is fire and this is water’ and they choose the fire, that is their choice.'While living in Syria, Abdisalan found himself having to choose between two fires. War had broken out in his home area that resulted in his his father being killed by Al Shabaab militants right before his eyes. Having nowhere else to go, he decided to flee Syria. He embarked on the journey despite knowledge that it would certainly present its own problems.",
    lat: "35.091515",
    lng: "39.022323",
    location: "Syria",
    language: "Arabic"
  },
  {
  name: "Aamir",
  avatar: "http://i.telegraph.co.uk/multimedia/archive/02374/syrianRefegees2_2374507b.jpg",
  images: "http://i.telegraph.co.uk/multimedia/archive/03439/israel-banner_3439427b.jpg",
  story: "'In our home in Damascus, I lived with my wife, our children, my parents, siblings and their family,' begins Aamir, a 29-year-old, Syrian that arrived in London nearly two years ago with his wife and two daughters.'Before Ramadan 2012, the conflict in Syria became markedly worse. We heard gunfire and no one would go out onto the streets. My family and I stayed in our house for days because we were afraid. I cannot tell you the exact number of days. On the last day, we had no bread. We had nothing to eat.'After days boarded up in their house, Aamir went out to get milk and diapers for his daughters.  At a checkpoint, the Freedom Army stopped him and tried to recruit him. He refused, which meant certain death if he were to be stopped again in the future. 'The last words from them were: the next time we see you, either you take your gun and stand beside us or you find someone to take your body.'"
  lat: "35.091515",
  lng: "39.022323",
  location: "Syria",
  language: "Arabic"
    },
    {
      name: "Mitra",
      avatar: "http://cbsnews1.cbsistatic.com/hub/i/r/2015/09/07/2a5e417b-f0ff-439b-bb84-61f3bb09124b/thumbnail/620x350/dc56584258241ebb07b70c3612a20f97/jawan.jpg",
      images: "http://media.worldbulletin.net/news/2015/09/06/2015-09-06t110354z-1910273600-lr2eb960uq7ja-rtrmadp-3-europe-migrants.JPG",
      story: "Sixteen-year-old Mitra left his native Afghanistan after his father was killed. He shared his story from a detention center in Northern Greece in Spring 2013.'My father was working for the military,' says Mitra. 'Our house was in Kunduz.' Local Taliban elements warned his father to stop working for the state; when he refused, they killed him and threatened the rest of his family.'I was also in danger,' says Mitra. 'My cousin told me to leave Afghanistan. My five brothers and sisters moved with my mother at my grandfather’s house. I haven’t spoken with them lately.'"
      lat: "36.731947",
      lng: "68.867581",
      location: "Afghanistan",
      language: "Dari"
      }
  ], function(err, refugees){
    if(err) console.error(err);
    console.log(refugees, users);
    mongoose.connection.close();
  });
  
})