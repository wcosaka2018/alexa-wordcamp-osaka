const { randomResponse } = require('ask-utils')
const moment = require('moment')
const { getRestaurantNotFoundResponse } = require('./notFound')
const getSessionLists = () => require('../assets/sessions')
module.exports.getSessionLists = getSessionLists

const getSessionTimeLists = () => {
  const lists = getSessionLists()
  return Object.keys(lists)
}

const sessionSearchTime = (time = '') => {
  const targetTime = handleTimeAlias(time)
  if (!/^0/.test(targetTime)) return targetTime
  const hhmm = targetTime.split(':')
  const hh = Number(hhmm[0])
  if (hh > 8) return targetTime
  const patchHour = hh + 12
  return `${patchHour}:${hhmm[1]}`
}
module.exports.sessionSearchTime = sessionSearchTime

const handleTimeAlias = (time) => {
  switch (time) {
    case 'MO':
      return '10:00'
    case 'AF':
      return '12:00'
    default:
      return time || moment().add(9, 'hours').format('HH:mm')
  }
}

const getNextSessionTime = (time = '') => {
  const target = moment(sessionSearchTime(time), 'HH:mm')
  const timeLists = getSessionTimeLists()
  for (let i = 0; i < timeLists.length; i++) {
    const time = timeLists[i]
    if (target.diff(moment(time, 'HH:mm')) > 0) continue
    return time
  }
  return ''
}
module.exports.getNextSessionTime = getNextSessionTime

const getSessionByTime = (time = '') => {
  const nextSessionTime = getNextSessionTime(time)
  const sessionLists = getSessionLists()
  if (sessionLists[nextSessionTime] && Object.keys(sessionLists[nextSessionTime]).length > 0) return sessionLists[nextSessionTime]
  return {}
}
module.exports.getSessionByTime = getSessionByTime

const getSessionAnnounceTexts = (time = '') => {
  const nextSessionTime = getNextSessionTime(time)
  const sessions = getSessionByTime(time)
  if (!sessions || Object.keys(sessions).length === 0) return 'その時間以降に開催されるセッションが見つかりませんでした。他の時間でお試しください。'
  const text = Object.keys(sessions).map(room => {
    const session = sessions[room]
    if (!session || Object.keys(session).length === 0 || !session.title) return ''
    const speaker = session.speaker ? `${session.speaker}さんによる` : ''
    return `${room}では、${speaker}「${session.title}」が予定されています。`
  })
  return `${nextSessionTime}から始まるセッションは、次の通りです。${text}`
}
module.exports.getSessionAnnounceTexts = getSessionAnnounceTexts
