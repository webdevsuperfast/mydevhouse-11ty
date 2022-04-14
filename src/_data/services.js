const graphqlQuery = require('../_utils/graphql')

const flatCache = require('flat-cache')
const path = require('path')

const CACHE_KEY = 'services'
const CACHE_FOLDER = path.resolve('./.cache')
const CACHE_FILE = 'services.json'

const getServices = async () => {
  const cache = flatCache.load(CACHE_FILE, CACHE_FOLDER)
  const cachedItems = cache.getKey(CACHE_KEY)

  if (cachedItems) {
    console.log(`Using cached ${CACHE_KEY}`)
    return cachedItems
  }

  const data = await graphqlQuery({
    query: `query {
      services {
        nodes {
          slug
          title
          id
          content,
          excerpt
        }
      }
    }`,
  })

  const services = data.services.nodes

  if (services.length) {
    cache.setKey(CACHE_KEY, services)
    cache.save(true)
  }

  return services
}

module.exports = getServices
