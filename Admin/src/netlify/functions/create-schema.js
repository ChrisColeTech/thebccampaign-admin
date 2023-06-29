const { client, query, handleOptions } = require('./faunaClient');

const createFaunaDB = async function () {
  /* Based on your requirements, change the schema here */
  try {
    await client.query(query.CreateCollection({ name: 'comments' }))

    console.log('Created comments class')
    return await client.query(
      query.CreateIndex({
        name: 'all_comments',
        source: query.Collection('comments'),
        active: true,
      }),
    )
  } catch (error) {
    if (error.requestResult.statusCode === 400 && error.message === 'instance not unique') {
      console.log('DB already exists')
    }
    throw error
  }
}

createFaunaDB()
