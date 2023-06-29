const { Client, query } = require('faunadb');
const { handleOptions } = require('./handleOptions');

const client = new Client({ secret: 'fnAFG-Ky5LAATX9wNckFUbX0ngbxY2jv_PlqSUVN' });

module.exports = { client, query, handleOptions };
