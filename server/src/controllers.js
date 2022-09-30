const knex = require('knex')(require('../knexfile.js')['development']);

const addUser = async items => {
  let results = items;
  for (let item of results) {
    let currentUser = await knex('user_table')
      .select('user_name', 'first_name', 'last_name')
      .where('id', item.user_id);

    item.user_info = currentUser[0];
  }
  return results;
};
// Items ////////////////////////////////////////
const getAllItems = async () => {
  let allItems = await knex('item').select('*');
  // console.log('add user');
  allItems = await addUser(allItems);
  return allItems;
};

const putItemById = async props => {
  const { item, id } = props;
  console.log(item);
  results = await knex('item').where('id', id).update(item, ['*']);
  return results;
};

const postItem = async newItem => {
  results = await knex('item').insert(newItem, ['*']);
  return results;
};

const deleteItemById = async delItem => {
  results = await knex('item').where('id', delItem).del();
  return results;
};

// user ////////////////////////////////////////
const postNewUser = async userInfo => {
  console.log(userInfo);
  results = await knex('user_table').insert(userInfo, ['*']);
  return results;
};

const userCheck = async username => {
  console.log(username);
  results = await knex('user_table').select('*').where('user_name', username);

  if (results[0] === undefined) {
    return null;
  } else {
    console.log('user found');
    return results[0];
  }
};

module.exports = {
  getAllItems,
  postNewUser,
  userCheck,
  putItemById,
  postItem,
  deleteItemById,
};
