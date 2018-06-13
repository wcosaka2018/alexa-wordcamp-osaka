const assert = require('power-assert')
const func = require('../../../libs/sessions')
describe('libs/session.js', () => {
  describe('#sessionSearchTime()', () => {
    it('should return pm time when given 0 pm', () => {
      assert.equal(func.sessionSearchTime('00:30'), '12:30')
    })
    it('should return pm time when given 5 pm', () => {
      assert.equal(func.sessionSearchTime('05:30'), '17:30')
    })
    it('should return pm time', () => {
      assert.equal(func.sessionSearchTime('09:00'), '09:00')
    })
    it('should return pm time', () => {
      assert.equal(func.sessionSearchTime('12:00'), '12:00')
    })
  })
  describe('#getNextSessionTime()', () => {
    it('should return near session time', () => {
      const time = func.getNextSessionTime('01:30')
      assert.equal(time, '13:40')
    })
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
          speaker: 'にしかわしんいち'
        },
        '702': {
          title: '家族を養うブログを作るのに必要な知識、全部教えます。',
          speaker: '岡本恵典'
        },
        '703': {
          title: 'サーバーレス WordPress ―― 2018年のウェブの話をしよう',
          speaker: '榊原昌彦'
        },
        '704': {
          title: '僕がWordPressでやったことヒストリー',
          speaker: 'ひさつぐ昌志'
        },
        '8階': {
          title: 'necco LunchをAlexaで入力！ウーコマース + Apple Pay + Pay with Googleで決済！',
          speaker: 'あべふみと'
        }
      })
    })
    it('should has cafe restaurants at least one.', () => {
      const result = func.getSessionByTime('14:10')
      assert.notEqual(Object.keys(result).length, 0)
      assert.deepEqual(result, {
        '701': {
          title: '中規模案件のこなしかた DockerとCI、テスト',
          speaker: 'yousan'
        },
        '702': {
          title: '「ブログを1年継続する」という壁を越えるために',
          speaker: 'you'
        },
        '703': {
          title: 'Gutenbergで作るランディングページ',
          speaker: '小野隆士'
        },
        '704': {
          title: 'レンタルサーバを落とさない、WordPressとレンサバのお付き合いのコツ',
          speaker: '谷口元紀'
        },
        '8階': {
          title: '100%GPLの有料テーマ販売をビジネスとして成立させるための挑戦',
          speaker: 'キタジマタカシ'
        }
      })
    })
  })
})
