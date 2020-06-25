export function selectShoppingLists(reduxState) {
  return reduxState.shopping.details;
}

export function selectShoppingListId(reduxState) {
  return reduxState.shopping.shopping;
}
