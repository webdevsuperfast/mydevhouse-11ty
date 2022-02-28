const graphqlQuery = require('../_utils/graphql')

async function getNavigation() {
  const data = await graphqlQuery({
    query: `query {
      menu(id: "Side Navigation", idType: NAME) {
        menuItems {
          nodes {
            id
            url
            path
            label
          }
        }
      }
    }`,
  })

  return data.menu.menuItems.nodes
}

module.exports = getNavigation
