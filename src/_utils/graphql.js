const axios = require('axios')

const { WP_SITE_URL } = require('../../env')

const GRAPHQL_URL = `${WP_SITE_URL}/graphql`

async function graphqlQuery({ query }) {
  const response = await axios.post(GRAPHQL_URL, {
    query: query,
  })

  if (response.status === 200) {
    return response.data.data
  }
}

module.exports = graphqlQuery
