const graphqlQuery = require('../_utils/graphql')

const getTestimonials = async () => {
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

  return data.testimonials.nodes
}

module.exports = getTestimonials
