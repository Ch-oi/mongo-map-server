exports.seed = function (knex) {
  // Deletes ALL existing entries

  // Inserts seed entries
  return knex("chatrooms")
    .insert([
      { room_name: "Capstone Project", descriptions: "des1" },
      { room_name: "Dragonback trail", descriptions: "des2" },
      { room_name: "Lion Rock trail", descriptions: "des3" },
    ])
    .then(function () {
      // Inserts seed entries
      return knex("chatrooms_users").insert([
        { chatroom_id: 1, user_id: 1 },
        { chatroom_id: 1, user_id: 2 },
        { chatroom_id: 3, user_id: 1 },
        { chatroom_id: 3, user_id: 2 },
        { chatroom_id: 2, user_id: 3 },
        { chatroom_id: 2, user_id: 2 },
      ]);
    })
    .then(function () {
      // Inserts seed entries
      return knex("chat_records").insert([
        { body: "Hi, where are you!", chatroom_user_id: 1 },
        { body: "I am Five thank you", chatroom_user_id: 1 },
        { body: "asdasdqwdqwfqf", chatroom_user_id: 2 },
        { body: "Why are you speaking Korean?", chatroom_user_id: 2 },
        { body: "JINSDJASDIOAJDO", chatroom_user_id: 3 },
        { body: "HELLO", chatroom_user_id: 5 },
        { body: "YOYYO", chatroom_user_id: 4 },
        { body: "AJIDOAKS", chatroom_user_id: 2 },
      ]);
    })
    .then(function () {
      // Inserts seed entries
      return knex("chatrooms_locations").insert([
        { chatroom_id: 1, location_id: 1, trip_date: "2017-01-30 16:49:19" },
        { chatroom_id: 2, location_id: 2, trip_date: "2017-01-30 16:49:19" },
        { chatroom_id: 3, location_id: 3, trip_date: "2017-01-30 16:49:19" },
      ]);
    });
};