const express = require('express');
const router = express.Router();
const multer  = require('multer');
const storage = multer.memoryStorage();
const uploads = multer({ dest: 'public/img' });
const UserModel = require('../models/user');
const StrategiesModel = require('../models/strategies');
const bodyParser = require('body-parser');

//create user page
router.get('/signup', (req, res) => {
  res.render('singup')
})
//create user
router.post('/createuser', uploads.none(), async (req, res) => {
  console.log(req.body);
    let userID;
    let passwordId;
    const createUser = async () => {
        const doc = await UserModel.create({
            username: req.body.username,
            name: req.body.name,
            surname: req.body.surname,
            email: req.body.email,
            phone: req.body.phone,
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
        req.session.key = req.sessionID;
        // save the session before redirection to ensure page
        // load does not happen before session is saved
        req.session.save(function (err) {
          if (err) return next(err)
          res.redirect('/')
        })
      })
    } else {
      res.send(JSON.stringify('Не вірний логін чи пароль'))
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

//delate account
//привязати до фронту
router.get('/delete', bodyParser.urlencoded(),  async (req, res) => {
    console.log(req.body);
    const deleteUser = await UserModel.deleteOne({ _id: '639dbf9a8448913049bd223f' });
    if (deleteUser.deletedCount == 1) {
      res.send(JSON.stringify('Ваш аккаунт видалено'));
    } else {
      res.send(JSON.stringify('Видалення невдале'))
    }
})

module.exports = router;





