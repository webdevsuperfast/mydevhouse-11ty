const flatCache = require('flat-cache')
const path = require('path')
const graphqlQuery = require('../_utils/graphql')

const CACHE_KEY = 'members'
const CACHE_FOLDER = path.resolve('./.cache')
const CACHE_FILE = 'members.json'

const getMembers = async () => {
  const cache = flatCache.load(CACHE_FILE, CACHE_FOLDER)
  const cachedItems = cache.getKey(CACHE_KEY)

  if (cachedItems) {
    console.log(`Using cached ${CACHE_KEY}`)
    return cachedItems
  }

  const data = await graphqlQuery({
    query: `query {
      teamMembers(where: {orderby: {field: MENU_ORDER, order: ASC}}) {
        nodes {
          content(format: RENDERED)
          slug
          teamMemberId
          title
          featuredImage {
            node {
              sourceUrl
            }
          }
          thumbnail: featuredImage {
            node {
              sourceUrl(size: THUMBNAIL)
            }
          }
          memberInformation {
            position
            skills {
              skillName
              skillPercentage
            }
            social {
              facebook
              github
              instagram
              linkedin
              twitter
            }
          }
        }
      }
    }`,
  })

  const teamMembers = data.teamMembers.nodes
  if (teamMembers.length) {
    cache.setKey(CACHE_KEY, teamMembers)
    cache.save(true)
  }

  return teamMembers
}

module.exports = getMembers
