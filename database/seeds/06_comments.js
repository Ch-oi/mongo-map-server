exports.seed = function (knex) {
  // Deletes ALL existing entries

  // Inserts seed entries
  return knex('comments').insert([
    { id: 1, body: 'comment1', ref_comment_id: 1, user_id: 1, blog_id: 1 },
    { id: 2, body: 'comment2', ref_comment_id: 1, user_id: 1, blog_id: 1 },
    { id: 3, body: 'comment3', ref_comment_id: 1, user_id: 1, blog_id: 1 },
  ]);
};
