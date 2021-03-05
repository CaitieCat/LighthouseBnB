const properties = require('./json/properties.json');
const users = require('./json/users.json');

const { Pool } = require('pg');

const pool = new Pool({
  user: 'caitie',
  password: '123',
  host: 'localhost',
  database: 'lighthouse_bnb'
});

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */

const getUserWithEmail = function(email) {
  return pool.query(`
  SELECT * FROM users
  WHERE email = $1
  `, [`${email}`])
  .then(res => 
    console.log(res.rows)
  );
  
  
  /*let user;
  for (const userId in users) {
    user = users[userId];
    if (user.email.toLowerCase() === email.toLowerCase()) {
      break;
    } else {
      user = null;
    }
  }
  return Promise.resolve(user);*/
}
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  return pool.query(`
  SELECT * FROM users
  WHERE id = $1
  `, [`id`])
 .then(res => {
    console.log(res.rows);
  });

  return Promise.resolve(users[id]);
}
exports.getUserWithId = getUserWithId;


/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser =  function(user) {
  return pool.query(`
  INSERT INTO users (name, email, password)
  VALUES ($1, $2, $3)
  RETURNING *
  `, [user.name, user.email, user.password])
 .then(res => {
    console.log(res.rows);
  });

  /*const userId = Object.keys(users).length + 1;
  user.id = userId;
  users[userId] = user;
  return Promise.resolve(user);*/
}
exports.addUser = addUser;

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  return pool.query(`SELECT properties.*, reservations.*, avg(rating) as average_rating
FROM reservations
JOIN properties ON reservations.property_id = properties.id
JOIN property_reviews ON properties.id = property_reviews.property_id 
WHERE reservations.guest_id = 1 AND reservations.end_date < now()::date
GROUP BY properties.id, reservations.id
ORDER BY reservations.start_date`, [limit])
.then(res => {
  console.log(res.rows);
});

  
  return getAllProperties(null, 2);
}
exports.getAllReservations = getAllReservations;

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function(options, limit = 10) {
 // 1
 const queryParams = [];
 // 2
 let queryString = `
 SELECT properties.*, avg(property_reviews.rating) as average_rating
 FROM properties
 JOIN property_reviews ON properties.id = property_id
 `;

 // 3
 if (options.city) {
   queryParams.push(`%${options.city}%`);
   queryString += `WHERE city LIKE $${queryParams.length} `;
 }

 // 4
 queryParams.push(limit);
 queryString += `
 GROUP BY properties.id
 ORDER BY cost_per_night
 LIMIT $${queryParams.length};
 `;

 if (options.minimum_price_per_night && options.maximum_price_per_night) {
  queryParams.push(`%${options.minimum_price_per_night}%`);
  queryParams.push(`%${options.maximum_price_per_night}%`);
  queryString += `WHERE city > $1 AND < $2 `;
} else if (options.minimum_price_per_night && !options.maximum_price_per_night){
  queryParams.push(`%${options.minimum_price_per_night}%`);
  queryString += `WHERE city > $1`;
}

 // 5
 console.log(queryString, queryParams);

 // 6
 return pool.query(queryString, queryParams)
 .then(res => res.rows);
}
exports.getAllProperties = getAllProperties;

/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  return pool.query(`
  INSERT INTO properties (id, owner_id, title, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active)
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
  RETURNING *
  `, [id, owner_id, title, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code, active])
 .then(res => (res.rows)
  );

  /*const propertyId = Object.keys(properties).length + 1;
  property.id = propertyId;
  properties[propertyId] = property;
  return Promise.resolve(property);*/
}
exports.addProperty = addProperty;