const { randomResponse } = require('ask-utils')
const getRestaurantNotFoundResponse = () => {
  const lists = require('../assets/notFound')
  return randomResponse.getRandomMessage(lists)
}
module.exports.getRestaurantNotFoundResponse = getRestaurantNotFoundResponse
