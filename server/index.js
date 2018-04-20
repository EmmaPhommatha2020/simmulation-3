require('dotenv').config();
const express = require('express')
const bodyParser = require('body-parser')
const passport = require('passport')
const Auth0Strategy = require('passport-auth0')
const massive = require('massive')
const session = require('express-session');

const app = express();

const {
  SERVER_PORT,
  SECRET,
  CONNECTION_STRING
} = process.env;

massive(CONNECTION_STRING).then( db => {
  app.set('db', db);
  // console.log("massive--->", db)
}) 

app.use(session({
  secret: SECRET,
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/../build'));


app.post('/api/auth/register', (req, res) => {
  const { username, password, profile_pic } = req.body;
  app.get('db').create_user([username, password, profile_pic]).then((res) => {
    res.status(200).send(res)
  })
});

app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;
  app.get('db').login_user([username, password]).then((res) => {
    res.status(200).send(res)
  })
});

// end points
app.get('/api/posts/:userid', (req, res) => {
  const { userid } = req.params;
  const { search, myposts } = req.query;
  // console.log(search, myposts)

  // first time user login
  if ((myposts === "false" && search === '') || (myposts === undefined && search === undefined) || 
  (myposts === "true" && search === undefined) 
) {
    app.get('db').get_all_posts().then(posts => {
      res.status(200).send(posts)
    })
  } 
  
  // post from user
  else if (myposts === 'true' && search === '') {
    app.get('db').get_all_user_posts([userid]).then(posts => {
      res.status(200).send(posts);
    })
  }

  // filtering the post
  else if (myposts === "true" && search !== '') {
      app.get('db').get_user_posts([userid, search]).then(posts => {
        res.status(200).send(posts);
      })
    } 

  //  filtering other people's post
  else if (myposts === "false" && search.length !== 0) {
    app.get('db').search_post([userid, search]).then(posts => {
      res.status(200).send(posts)
    })
  }   
})

  app.get('/api/post/:postid', (req, res) => {
    const { postid } = req.params;
    app.get('db').get_single_post([postid]).then(post => {
      res.status(200).send(post);
    })
  })

  app.post('/api/post/:userid', (req, res) => {
    const { userid } = req.session.userid;
    const { title, img, content } = req.body;
    app.get('db').create_new_post([title, img, content, userid]).then(info => {
      res.status(200).send(info);
    })
  })

app.listen(SERVER_PORT , () => {
  console.log(`Server is up: ${SERVER_PORT}`);
})