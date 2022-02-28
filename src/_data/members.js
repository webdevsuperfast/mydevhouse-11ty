const graphqlQuery = require('../_utils/graphql')

const getMembers = async () => {
  const data = await graphqlQuery({
    query: `query {
      teamMembers(where: {orderby: {field: MENU_ORDER, order: ASC}}) {
        nodes {
          content(format: RAW)
          slug
          teamMemberId
          title(format: RAW)
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

  return data.teamMembers.nodes
}

module.exports = getMembers
