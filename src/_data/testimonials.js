const graphqlQuery = require('../_utils/graphql')

const flatCache = require('flat-cache')
const path = require('path')

const CACHE_KEY = 'testimonials'
const CACHE_FOLDER = path.resolve('./.cache')
const CACHE_FILE = 'testimonials.json'

const getTestimonials = async () => {
  const cache = flatCache.load(CACHE_FILE, CACHE_FOLDER)
  const cachedItems = cache.getKey(CACHE_KEY)

  const data = await graphqlQuery({
    query: `query {
      testimonials {
        nodes {
          content
          slug
          title
          testimonialInformation {
            company
          }
          id: testimonialId
          featuredImage: featuredImage {
            node {
              sourceUrl(size: THUMBNAIL)
            }
          }
        }
      }
    }`,
  })

  const testimonials = data.testimonials.nodes

  if (testimonials.length) {
    cache.setKey(CACHE_KEY, testimonials)
    cache.save(true)
  }

  return testimonials
}

module.exports = getTestimonials
