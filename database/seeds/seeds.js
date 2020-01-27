
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, username: 'A', password: 'auncle' },
        {id: 2, username: 'B', password: 'buncle' },
        {id: 3, username: 'C', password: 'cuncle' },
        {id: 4, username: 'D', password: 'duncle' }
        
      ]);
    });
};
