const graphqlQuery = require('../_utils/graphql')

const getProcess = async () => {
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

  return data.pageBy
}

module.exports = getProcess
