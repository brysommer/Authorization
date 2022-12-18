const express = require('express');
const router = express.Router();
const multer  = require('multer');
const storage = multer.memoryStorage();
const uploads = multer({ dest: 'public/img' });
const UserModel = require('../models/user');
const StrategiesModel = require('../models/strategies');

//create user
router.get('/createuser', async (req, res) => {
    let userID;
    let passwordId;
    const createUser = async () => {
        const doc = await UserModel.create({
            username: 'zhemha',
            name: 'Ivanna',
            surname: 'Zhemha',
        });
        userID = doc.id
        console.log(doc); 
        createPassword(doc);
    };
    const createPassword = async (doc) => {
      const docpassword = await StrategiesModel.create({
          userID: doc.id,
          password: 'password'
      })
      passwordId = docpassword.id;
    };    
    createUser();
    res.send(JSON.stringify('Користувача зареєстровано id: ' + userID + 'password id: ' + passwordId))
});

//authorize by passwords
router.post('/loginpass', uploads.none(), async (req, res) => {
  const userNotFined = (dbdata) => {
    if (!data) {
      console.log('not find')
      res.end(JSON.stringify('неправильний логін чи пароль'))
    }
  }
  const data = await UserModel.findOne({ username: req.body.username }).exec();
  await userNotFined(data);
  const password = await StrategiesModel.findOne({ userID: data._id }).exec();
  await userNotFined(password);
  const checkLogin = (password) => {
    if (password.password == req.body.password) {
      console.log('Login successfull');
      req.session.regenerate(function (err) {
        if (err) next(err)
        // store user information in session, typically a user id
        req.session.user = req.body.username;
        // save the session before redirection to ensure page
        // load does not happen before session is saved
        req.session.save(function (err) {
          if (err) return next(err)
          res.redirect('/')
        })
      })
    } else {
      console.log('Login and password doesnot fit')
    }
  };
  checkLogin(password);
});

//authorize by twitter
router.get('/classified/:id', (req, res) => {
    res.render('classifidecard');
});

//autorize by facebook
router.get('/filter/:id', (req, res) => {
    res.render('index');
});

//delate user
router.get('/json/:id', async (req, res) => {
    const { id } = req.params;
    let data = await PostModel.findOne({ _id: id } ).populate('keywords').populate('comments').exec();
    let promises = 
    data.comments.map(async element => {  
        return await CommentModel.findOne({ _id: element._id }).populate('reply')       
    });
    const result = await Promise.all(promises);
    data.comments = result;    
    res.send(JSON.stringify(data)); 
});

//Logout
router.get('/logout', function (req, res, next) {
  // logout logic

  // clear the user from the session object and save.
  // this will ensure that re-using the old session id
  // does not have a logged in user
  req.session.user = null
  req.session.save(function (err) {
    if (err) next(err)

    // regenerate the session, which is good practice to help
    // guard against forms of session fixation
    req.session.regenerate(function (err) {
      if (err) next(err)
      res.redirect('/')
    })
  })
})


router.get('/reply', async (req, res) => {
    const keysList = await CommentModel.find({}).populate('reply').exec();
    res.send(JSON.stringify(keysList));
})

module.exports = router;





