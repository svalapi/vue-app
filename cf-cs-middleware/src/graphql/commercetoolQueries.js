const getCategoriesQuery = `
query categories($locale: Locale!) {
  categories(
    limit: 10
    where: "parent is not defined"
    sort: "orderHint asc"
  ) {
    results {
      ...MenuCategoryInfo
      children {
        ...MenuCategoryInfo
        children {
          ...MenuCategoryInfo
        }
      }
    }
  }
}
fragment MenuCategoryInfo on Category {
  id
  externalId
  name(locale: $locale)
  slug(locale: $locale)
  orderHint
}`;

module.exports = {
  getCategoriesQuery,
};
