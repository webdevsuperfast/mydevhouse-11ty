const graphqlQuery = require('../_utils/graphql')

const flatCache = require('flat-cache')
const path = require('path')

const CACHE_KEY = 'portfolio'
const CACHE_FOLDER = path.resolve('./.cache')
const CACHE_FILE = 'portfolio.json'

const getPortfolio = async () => {
  const cache = flatCache.load(CACHE_FILE, CACHE_FOLDER)
  const cachedItems = cache.getKey(CACHE_KEY)

  if (cachedItems) {
    console.log(`Using cached ${CACHE_KEY}`)
    return cachedItems
  }

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

  const portfolio = {
    portfolioItems: data.portfolioItems.nodes,
    featuredPortfolio: data.featuredPortfolio.nodes,
  }

  if (portfolio) {
    cache.setKey(CACHE_KEY, portfolio)
    cache.save(true)
  }

  return portfolio
}

module.exports = getPortfolio
