const router = require('express').Router();


class UserRouter {
  constructor(passport,userService) {
    this.userService = userService;
    this.passport = passport
    this.router = router;
  }
  route() {
    this.router.get('/all', this.listUsers.bind(this));
    this.router.get('/one/:id', this.passport.authenticate('token', { session: false }),this.getUser.bind(this));
    this.router.get('/one/:id/districts', this.getUserLocations.bind(this));
    this.router.get('/one/:id/favoriteBlogs', this.getUserFavBlogs.bind(this));

    this.router.get('/authorized/:id/chatrooms',this.getUserChatrooms.bind(this));
    this.router.get('/authorized/:uid/chatroom/:cid',this.getUserChatroomRecords.bind(this));
    // this.router.post('/signup', this.addUser.bind(this));
    this.router.post('/authorized/:uid/blog/:bid',this.addUserFavBlog.bind(this));
    this.router.post('/authorized/:uid/district/:did',this.addUserLocation.bind(this));


    return this.router;
  }

  listUsers(req, res) {
    return this.userService
      .listUsers()
      .then((users) => {
        res.send(users);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  getUser(req, res) {
    let user_id = req.params.id;
    return this.userService
      .getUser(user_id)
      .then((user) => {
        res.send(user);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getUserLocations(req, res) {
    let user_id = req.params.id;
    return this.userService
      .getUserLocations(user_id)
      .then((userLocationsBlogs) => {
        res.send(userLocationsBlogs);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  getUserFavBlogs(req, res) {
    let user_id = req.params.id;
    return this.userService
      .getUserFavBlogs(user_id)
      .then((favBlogs) => {
        res.send(favBlogs);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  getUserChatrooms(req, res) {
    let user_id = req.params.id;
    return this.userService
      .getUserChatrooms(user_id)
      .then((chatrooms) => {
        res.send(chatrooms);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  getUserChatroomRecords(req, res) {
    let user_id = req.params.uid;
    let chatroom_id = req.params.cid;
    return this.userService
      .getUserChatroomRecords(user_id, chatroom_id)
      .then((chatRecords) => {
        res.send(chatRecords);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // addUser(req, res) {
  //   let new_user = {
  //     ...req.body,
  //   };
  //   return this.userService
  //     .addUser(new_user)
  //     .then((newUser) => {
  //       res.send(newUser);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }

  addUserFavBlog(req, res) {
    let user_id = req.params.uid;
    let blog_id = req.params.bid;
    return this.userService
      .addUserFavBlog(user_id, blog_id)
      .then((results) => {
        res.send(results);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  addUserLocation(req, res) {
    let user_id = req.params.uid;
    let district_id = req.params.did;
    return this.userService
      .addUserLocation(user_id, district_id)
      .then((results) => {
        res.send(results);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  

  
}

module.exports = UserRouter;
