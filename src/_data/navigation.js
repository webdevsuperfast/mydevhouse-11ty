const graphqlQuery = require('../_utils/graphql')

const flatCache = require('flat-cache')
const path = require('path')

const CACHE_KEY = 'navigation'
const CACHE_FOLDER = path.resolve('./.cache')
const CACHE_FILE = 'navigation.json'

async function getNavigation() {
  const cache = flatCache.load(CACHE_FILE, CACHE_FOLDER)
  const cachedItems = cache.getKey(CACHE_KEY)

  if (cachedItems) {
    console.log(`Using cached ${CACHE_KEY}`)
    return cachedItems
  }

  const data = await graphqlQuery({
    query: `query {
      menu(id: "Side Navigation", idType: NAME) {
        menuItems {
          nodes {
            id
            url
            path
            label
          }
        }
      }
    }`,
  })

  const menuItems = data.menu.menuItems.nodes

  if (menuItems.length) {
    cache.setKey(CACHE_KEY, menuItems)
    cache.save(true)
  }

  return menuItems
}

module.exports = getNavigation
