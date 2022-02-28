const graphqlQuery = require('../_utils/graphql')

const getSite = async () => {
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

  return {
    googleVerify: data.seo.webmaster.googleVerify,
    title: data.settings.generalSettingsTitle,
    description: data.settings.generalSettingsDescription,
  }
}

module.exports = getSite
