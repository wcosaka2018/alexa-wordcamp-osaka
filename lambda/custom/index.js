/* eslint-disable  func-names */
/* eslint-disable  no-console */

const Alexa = require('ask-sdk-core')
const { randomResponse, intentHandlers, slotManager } = require('ask-utils')
const { getResolutionSlotParam, getSlotByName } = slotManager

const ASK_ANY_MORE_TEXT = '他に聞きたいことはありますか？'

const getAskAnyMoreQuestion = () => {
  const messages = [
    '他に聞きたいことがあれば、きいてね。',
    'ほかに質問あれば、どうぞ',
    '他に何か聞く？',
    'ほかなんかある？'
  ]
  return randomResponse.getRandomMessage(messages)
}
const getRepromptText = () => {
  const messages = [
    '聞きたいことがあれば話しかけてね。何もなければ、「終了」と言ってね。',
    '何もなければ、「終了」と言ってね。',
    'ききたいことない？なかったら「終了」て言ってくれたら終わるで。'
  ]
  return randomResponse.getRandomMessage(messages)
}
/* [start] Utility function before added ask-utils */
const getRequest = handlerInput => {
  if (
    handlerInput &&
    handlerInput.requestEnvelope &&
    handlerInput.requestEnvelope.request
  ) {
    return handlerInput.requestEnvelope.request
  }
  return {}
}
const getDialogState = (handlerInput) => {
  const request = getRequest(handlerInput)
  console.log(request)
  const { dialogState } = request
  return dialogState || ''
}
const getIntent = handlerInput => {
  const request = getRequest(handlerInput)
  if (request && Object.keys(request).length > 0 && request.intent) return request.intent
  return {}
}
const getSlotValue = (handlerInput, name) => {
  const slot = getSlotByName(handlerInput, name)
  const resolutionSlot = getResolutionSlotParam(slot)
  const slotValue = resolutionSlot && Object.keys(resolutionSlot).length === 0 ? slot.value : resolutionSlot
  return slotValue
}
const getErrorMessage = handlerInput => {
  const request = getRequest(handlerInput)
  if (request && Object.keys(request).length > 0) {
    return request.error || {}
  }
  return {}
}
/* [end] Utility function before added ask-utils */

const LaunchRequestHandler = {
  canHandle (handlerInput) {
    return intentHandlers.canHandle(handlerInput, 'LaunchRequest')
  },
  handle (handlerInput) {
    const messages = [
      '「次のセッションを教えて。」と聞いてみてください。',
      'ランチ情報とか聞けるよ。',
      '「近くのお店を教えて。」と聞くと、お店の情報をおしらせします。'
    ]
    const speechText = 'ワードキャンプ大阪スキルへようこそ。' + randomResponse.getRandomMessage(messages)

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(getRepromptText())
      .withSimpleCard('Hello World', speechText)
      .getResponse()
  }
}

const YesIntentHandler = {
  canHandle (handlerInput) {
    return intentHandlers.canHandle(handlerInput, 'IntentRequest', 'AMAZON.YesIntent')
  },
  handle (handlerInput) {
    const speechText = 'なにについて聞きたいですか？'

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(getRepromptText())
      .withSimpleCard('準備中やねん', speechText)
      .getResponse()
  }
}

const AskSessionIntentHandler = {
  canHandle (handlerInput) {
    return intentHandlers.canHandle(handlerInput, 'IntentRequest', 'AskSessionIntent')
  },
  handle (handlerInput) {
    const { getSessionAnnounceTexts } = require('./libs/sessions')
    const time = getSlotByName(handlerInput, 'time')
    console.log(time)
    const speechText = getSessionAnnounceTexts(time.value)
    return handlerInput.responseBuilder
      .speak(speechText + '他に聞きたいことはありますか？')
      .reprompt(getRepromptText())
      .getResponse()
  }
}

const AskLunchIntentHandler = {
  canHandle (handlerInput) {
    return intentHandlers.canHandle(handlerInput, 'IntentRequest', 'AskLunchIntent')
  },
  handle (handlerInput) {
    const lunchType = slotManager.getSlotValueByName(handlerInput, 'lunchType') || 'カフェ'
    const { getRandomLunchRestaurant } = require('./libs/lunch')
    const speechText = getRandomLunchRestaurant(lunchType)
    const ask = getAskAnyMoreQuestion()
    const reprompt = getRepromptText()

    return handlerInput.responseBuilder
      .speak(`${speechText}${ask}`)
      .reprompt(reprompt)
      .withSimpleCard('準備中やねん', speechText)
      .getResponse()
  }
}

const HelpIntentHandler = {
  canHandle (handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest' &&
      handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent'
  },
  handle (handlerInput) {
    const messages = [
      '「次のセッションを教えて。」と聞いてみてください。',
      'ランチ情報とか聞けるよ。',
      '「近くのお店を教えて。」と聞くと、お店の情報をおしらせします。'
    ]
    const speechText = 'ワードキャンプ大阪について紹介するスキルです。' + randomResponse.getRandomMessage(messages)
    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(getRepromptText())
      .withSimpleCard('Hello World', speechText)
      .getResponse()
  }
}

const CancelAndStopIntentHandler = {
  canHandle (handlerInput) {
    if (intentHandlers.canHandle(handlerInput, 'IntentRequest', 'AMAZON.NoIntent')) return true
    if (intentHandlers.canHandle(handlerInput, 'IntentRequest', 'AMAZON.CancelIntent')) return true
    if (intentHandlers.canHandle(handlerInput, 'IntentRequest', 'AMAZON.StopIntent')) return true
    return false
  },
  handle (handlerInput) {
    const messages = [
      'じゃあの',
      'ありがとう。楽しんでください。',
      'また次のセッションが気になった時はぜひ遊びに来てください。'
    ]
    const speechText = randomResponse.getRandomMessage(messages)

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard('Hello World', speechText)
      .getResponse()
  }
}

const SessionEndedRequestHandler = {
  canHandle (handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest'
  },
  handle (handlerInput) {
    console.log(getErrorMessage(handlerInput))
    console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`)

    return handlerInput.responseBuilder.getResponse()
  }
}

const ErrorHandler = {
  canHandle () {
    return true
  },
  handle (handlerInput, error) {
    console.log(handlerInput)
    console.log(getErrorMessage(handlerInput))
    console.log(`Error handled: ${error.message}`)

    return handlerInput.responseBuilder
      .speak('ごめんなさい。ちょっと聞き取れませんでした。')
      .reprompt(getRepromptText())
      .getResponse()
  }
}

const skillBuilder = Alexa.SkillBuilders.custom()

exports.handler = skillBuilder
  .addRequestHandlers(
    LaunchRequestHandler,
    AskSessionIntentHandler,
    AskLunchIntentHandler,
    YesIntentHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda()
