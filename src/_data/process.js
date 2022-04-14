const graphqlQuery = require('../_utils/graphql')

const flatCache = require('flat-cache')
const path = require('path')

const CACHE_KEY = 'process'
const CACHE_FOLDER = path.resolve('./.cache')
const CACHE_FILE = 'process.json'

const getProcess = async () => {
  const cache = flatCache.load(CACHE_FILE, CACHE_FOLDER)
  const cachedItems = cache.getKey(CACHE_KEY)

  if (cachedItems) {
    console.log(`Using cached ${CACHE_KEY}`)
    return cachedItems
  }

  const data = await graphqlQuery({
    query: `
    query {
      pageBy(pageId: 640) {
        id
        content
        slug
        seo {
          metaDesc
          title
        }
        title
        builder {
          section {
            ... on Page_Builder_Section_Featured {
              heading
              content
              featured {
                image {
                  mediaItemUrl
                }
              }
            }
          }
        }
      }
    }
  `,
  })

  const pageBy = data.pageBy

  if (pageBy.length) {
    cache.setKey(CACHE_KEY, pageBy)
    cache.setKey()
    cache.save(true)
  }

  return pageBy
}

module.exports = getProcess
