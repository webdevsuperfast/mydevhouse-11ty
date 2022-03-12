const graphqlQuery = require('../_utils/graphql')

const getServices = async () => {
  const data = await graphqlQuery({
    query: `query {
      services {
        nodes {
          slug
          title
          id
        }
      }
    }`,
  })

  return data.services.nodes
}

module.exports = getServices
