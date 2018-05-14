const assert = require('power-assert')
const func = require('../../../libs/sessions')
describe('libs/session.js', () => {
  describe('#getNextSessionTime()', () => {
    it('should return near session time', () => {
      const time = func.getNextSessionTime('10:30')
      assert.equal(time, '11:05')
    })
    it('should return near session time', () => {
      const time = func.getNextSessionTime('17:10')
      assert.equal(time, '17:20')
    })
    it('should return empty when the time is too late', () => {
      const time = func.getNextSessionTime('17:30')
      assert.equal(time, '')
    })
  })
  describe('#getSessionByTime()', () => {
    it('should has cafe restaurants at least one.', () => {
      const result = func.getSessionByTime('10:10')
      assert.notEqual(Object.keys(result).length, 0)
      assert.deepEqual(result, {
        '701': {
          title: 'WordPressのニュースのソース大全',
          speaker: 'ShinichiN'
        },
        '702': {
          title: '家族を養うブログを作るのに必要な知識、全部教えます。',
          speaker: '岡本恵典'
        },
        '703': {
          title: 'Serverless WordPess ―― 2018年のWebの話をしよう',
          speaker: '榊原昌彦'
        },
        '704': {
          title: '僕がWordPressでやったことヒストリー',
          speaker: '久次昌志'
        },
        '8階': {
          title: 'necco LunchをAlexaで入力！Woocommerce + Apple Pay + Pay with Googleで決済！',
          speaker: 'Fumito Abe'
        }
      })
    })
    it('should has cafe restaurants at least one.', () => {
      const result = func.getSessionByTime('14:10')
      assert.notEqual(Object.keys(result).length, 0)
      assert.deepEqual(result, {
        '701': {
          title: 'WordPressのニュースのソース大全',
          speaker: 'ShinichiN'
        },
        '702': {
          title: '家族を養うブログを作るのに必要な知識、全部教えます。',
          speaker: '岡本恵典'
        },
        '703': {
          title: 'Serverless WordPess ―― 2018年のWebの話をしよう',
          speaker: '榊原昌彦'
        },
        '704': {
          title: '僕がWordPressでやったことヒストリー',
          speaker: '久次昌志'
        },
        '8階': {
          title: 'necco LunchをAlexaで入力！Woocommerce + Apple Pay + Pay with Googleで決済！',
          speaker: 'Fumito Abe'
        }
      })
    })
  })
})
