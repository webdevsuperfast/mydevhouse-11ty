const graphqlQuery = require('../_utils/graphql')

const getPortfolio = async () => {
  const data = await graphqlQuery({
    query: `query {
      allPortfolio {
        nodes {
          slug
          title
          terms {
            nodes {
              name
              slug
            }
          }
          id: portfolioId
          featuredImage {
            node {
              id
              altText
              thumbnail: sourceUrl(size: SLIDER_THUMBNAIL)
              featuredImage: sourceUrl
            }
          }
        }
      }
    }`,
  })

  return data.allPortfolio.nodes
}

module.exports = getPortfolio
