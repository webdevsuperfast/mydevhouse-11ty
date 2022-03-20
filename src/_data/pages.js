const graphqlQuery = require('../_utils/graphql')

async function getPages() {
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
}

module.exports = getPages
