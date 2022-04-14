const graphqlQuery = require('../_utils/graphql')

const flatCache = require('flat-cache')
const path = require('path')

const CACHE_KEY = 'pages'
const CACHE_FOLDER = path.resolve('./.cache')
const CACHE_FILE = 'pages.json'

async function getPages() {
  const cache = flatCache.load(CACHE_FILE, CACHE_FOLDER)
  const cachedItems = cache.getKey(CACHE_KEY)

  if (cachedItems) {
    console.log(`Using cached ${CACHE_KEY}`)
    return cachedItems
  }

  const data = await graphqlQuery({
    query: `query {
      pages(
        where: {status: PUBLISH, nameIn: ["testimonials", "about-us", "portfolio", "contact", "services"]}
      ) {
        nodes {
          seo {
            title
            metaKeywords
            opengraphTitle
            metaDesc
            focuskw
            readingTime
          }
          pageId
          content(format: RENDERED)
          slug
          title
        }
      }
    }`,
  })

  return data.pages.nodes
  const pages = data.pages.nodes

  if (pages.length) {
    cache.setKey(CACHE_KEY, pages)
    cache.save(true)
  }

  return pages
}

module.exports = getPages
