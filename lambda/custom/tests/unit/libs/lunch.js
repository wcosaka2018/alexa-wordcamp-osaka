const assert = require('power-assert')
const func = require('../../../libs/lunch')
describe('libs/lunch.js', () => {
  describe('#getLunchRestaurants()', () => {
    it('should has cafe restaurants at least one.', () => {
      const result = func.getLunchRestaurants()
      assert.notEqual(result['カフェ'].length, 0)
    })
  })
  describe('#getLunchRestaurantsByType()', () => {
    it('should has cafe restaurants at least one.', () => {
      const result = func.getLunchRestaurantsByType('カフェ')
      assert.notEqual(result.length, 0)
    })
  })
  describe('#getRandomLunchRestaurant()', () => {
    it('should has cafe restaurants at least one.', () => {
      assert.notEqual(func.getRandomLunchRestaurant('カフェ'), '')
    })
  })
})
