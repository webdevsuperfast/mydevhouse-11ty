const graphqlQuery = require('../_utils/graphql')

const flatCache = require('flat-cache')
const path = require('path')

const CACHE_KEY = 'site'
const CACHE_FOLDER = path.resolve('./.cache')
const CACHE_FILE = 'site.json'

const getSite = async () => {
  const cache = flatCache.load(CACHE_FILE, CACHE_FOLDER)
  const cachedItems = cache.getKey(CACHE_KEY)

  if (cachedItems) {
    console.log(`Using cached ${CACHE_KEY}`)
    return cachedItems
  }

  const data = await graphqlQuery({
    query: `query {
      seo: seo {
        webmaster {
          googleVerify
        }
      }
      settings: allSettings {
        generalSettingsDescription
        generalSettingsTitle
      }
    }`,
  })

  const siteData = {
    googleVerify: data.seo.webmaster.googleVerify,
    title: data.settings.generalSettingsTitle,
    description: data.settings.generalSettingsDescription,
  }

  if (siteData.length) {
    cache.setKey(CACHE_KEY, siteData)
    cache.save(true)
  }

  return siteData
}

module.exports = getSite
