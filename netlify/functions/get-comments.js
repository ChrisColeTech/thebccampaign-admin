const { client, query } = require('./faunaClient');

const handler = async (event) => {
  try {
    const response = await client.query(
      query.Map(
        query.Paginate(query.Documents(query.Collection('comments'))),
        query.Lambda((x) => query.Get(x))
      )
    );

    const comments = response.data.map((comment) => comment.data);

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*', // Allow requests from any origin
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
      },
      body: JSON.stringify(comments),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};

module.exports = { handler };
