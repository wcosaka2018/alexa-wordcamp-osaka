const { randomResponse } = require('ask-utils')
const { getRestaurantNotFoundResponse } = require('./notFound')
const getLunchRestaurants = () => require('../assets/lunch')
module.exports.getLunchRestaurants = getLunchRestaurants

const getLunchRestaurantsByType = (type = 'カフェ') => {
  const lists = getLunchRestaurants()
  if (lists[type]) return lists[type]
  return []
}
module.exports.getLunchRestaurantsByType = getLunchRestaurantsByType

const getRandomLunchRestaurant = (type = 'カフェ') => {
  const lists = getLunchRestaurantsByType(type)
  if (lists.length === 0) return getRestaurantNotFoundResponse()
  return randomResponse.getRandomMessage(lists)
}
module.exports.getRandomLunchRestaurant = getRandomLunchRestaurant
