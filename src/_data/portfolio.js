const graphqlQuery = require('../_utils/graphql')

const getPortfolio = async () => {
  const data = await graphqlQuery({
    query: `query {
      featuredPortfolio: allPortfolio(first: 3) {
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
      portfolioItems: allPortfolio {
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

  for (const item of data.portfolioItems.nodes) {
    categories = []
    for (i = 0; i < item.terms.nodes.length; i++) {
      categories[i] = item.terms.nodes[i].slug
    }

    item.categories = categories.join(' ')
  }

  return {
    portfolioItems: data.portfolioItems.nodes,
    featuredPortfolio: data.featuredPortfolio.nodes,
  }
}

module.exports = getPortfolio
