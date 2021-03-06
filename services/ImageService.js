const knex = require("../database/config").knex;
const axios = require("axios");
const { response } = require("express");
require("dotenv").config();

class ImageService {
  constructor() {
    axios.defaults.headers.common[
      "Authorization"
    ] = `Client-ID ${process.env.IMGUR_CLIENT_ID}`;
  }

  async getAllImages() {
    let images = await knex("users_locations")
      .innerJoin("images", "users_locations.id", "images.user_location_id")
      .where("private", false)
      .catch((err) => console.log(err));

    let imagesDetailed = await this.compileLocBlog(images);

    return imagesDetailed;
  }

  async compileLocBlog(images) {
    let imagesDetailed = [];

    for (let img of images) {
      let UserLocation = [];
      if (img.blog_id) {
        let blog = await this.getBlog(img.blog_id);
        img.blog = blog;
        UserLocation = await this.getUserLocation(img.blog.user_location_id);
      } else {
        UserLocation = await this.getUserLocation(img.user_location_id);
      }

      img.userName = UserLocation[0].user_name;
      img.locationName = UserLocation[0].en;
      imagesDetailed.push(img);
    }
    return imagesDetailed;
  }

  async getBlog(blog_id) {
    let res = await knex("blogs")
      .select("title", "user_location_id")
      .where("id", blog_id)
      .catch((err) => console.log(err));

    return res[0];
  }

  async getUserLocation(user_location_id) {
    let results = await knex("users_locations")
      .innerJoin("users", "user_id", "users.id")
      .innerJoin("locations", "locations.id", "location_id")
      .select("user_name", "en")
      .where("users_locations.id", user_location_id)
      .catch((err) => console.log(err));

    return results;
  }

  // Private images that have userId and chatroomId
  // Image parameter should be base64 string
  async uploadToChatroom(img, currentRoomId, chatroomUserId, userId) {
    console.log("uploadToChatroom method is invoked");

    let imgurURL = await axios
      .post("https://api.imgur.com/3/image", {
        image: img,
      })
      .then((response) => {
        return response.data.data.link;
      })
      .catch((err) => console.log(err));

    knex("images")
      .insert({
        user_id: userId,
        url: imgurURL,
      })
      .then(() => {
        knex("chat_records")
          .insert({ url: imgurURL, chatroom_user_id: 1 })
          .then(() => {
            console.log("image is inserted into chat_records");
            return imgurURL;
          });
      })
      // TODO: handle the error
      .catch((err) => console.log(err));

    return imgurURL;
  }

  // Loading images according to room id
  loadChatroomImages(chatroomId) {
    let query = knex("images")
      .innerJoin("chatrooms_users", "chatrooms_users.id", "chatroom_user_id")
      .where({ chatroom_id: chatroomId });

    return query.then((data) => data).catch((err) => console.log(err));
  }

  // Uploading images that belong to a location
  async uploadToLocation(chatroomId) {
    console.log("ImageService is invoked");
    let imgurURL = await axios
      .post("https://api.imgur.com/3/image", {
        image: img,
      })
      .then((response) => {
        console.log("Axios is called");
        return response.data.data.link;
      })
      .catch((err) => console.log(err));

    console.log("Inserting into database...");

    let insertion = knex("images")
      .insert({
        user_id: userId,
        url: imgurURL,
        chatroom_id: chatroomId,
      })
      .innerJoin("chatrooms-users", "chatrooms-users.id", "chatroomUser_id")
      // TODO: handle the error
      .catch((err) => console.log(err));

    // TODO: return something meaningful
    return "Success";
  }

  // Loading images from a location
  loadLocationImages(locationId) {
    let query = knex("images")
      .innerJoin("users_locations", "users_locations.id", "user_location_id")
      .select()
      .where({ location_id: locationId });
    return query.then((data) => data).catch((err) => console.log(err));
  }

  // Rmove an image
  removeImage(imageId) {
    let query = knex("images").select().where({ id: imageId }).del();
    return query.then((data) => {
      return "Success";
    });
  }
}

module.exports = ImageService;
