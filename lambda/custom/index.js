/* eslint-disable  func-names */
/* eslint-disable  no-console */

const Alexa = require('ask-sdk-core');
const { randomResponse, intentHandlers } = require('ask-utils')

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
}

const LaunchRequestHandler = {
  canHandle(handlerInput) {
    return intentHandlers.canHandle(handlerInput, 'LaunchRequest')
  },
  handle(handlerInput) {
    const speechText = 'ワードキャンプ大阪スキルへようこそ。ランチ情報とか聞けるよ。';

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(getRepromptText())
      .withSimpleCard('Hello World', speechText)
      .getResponse();
  },
};

const YesIntentHandler = {
  canHandle(handlerInput) {
    return intentHandlers.canHandle(handlerInput, 'IntentRequest', 'AMAZON.YesIntent')
  },
  handle(handlerInput) {
    const speechText = 'なにについて聞きたいですか？'

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(getRepromptText())
      .withSimpleCard('準備中やねん', speechText)
      .getResponse();
  },
};

const AskLunchIntentHandler = {
  canHandle(handlerInput) {
    return intentHandlers.canHandle(handlerInput, 'IntentRequest', 'AskLunchIntent')
  },
  handle(handlerInput) {
    const { getRandomLunchRestaurant } = require('./libs/lunch')
    const lunchType = 'カフェ'
    const speechText = getRandomLunchRestaurant(lunchType);
    const ask = getAskAnyMoreQuestion()
    const reprompt = getRepromptText()

    return handlerInput.responseBuilder
      .speak(`${speechText}${ask}`)
      .reprompt(speechText)
      .withSimpleCard('準備中やねん', speechText)
      .getResponse();
  },
};

const HelpIntentHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
  },
  handle(handlerInput) {
    const speechText = 'You can say hello to me!';

    return handlerInput.responseBuilder
      .speak(speechText)
      .reprompt(getRepromptText())
      .withSimpleCard('Hello World', speechText)
      .getResponse();
  },
};

const CancelAndStopIntentHandler = {
  canHandle(handlerInput) {
    if (intentHandlers.canHandle(handlerInput, 'IntentRequest', 'AMAZON.NoIntent')) return true
    if (intentHandlers.canHandle(handlerInput, 'IntentRequest', 'AMAZON.CancelIntent')) return true
    if (intentHandlers.canHandle(handlerInput, 'IntentRequest', 'AMAZON.StopIntent')) return true
    return false
  },
  handle(handlerInput) {
    const speechText = 'じゃあの。';

    return handlerInput.responseBuilder
      .speak(speechText)
      .withSimpleCard('Hello World', speechText)
      .getResponse();
  },
};

const SessionEndedRequestHandler = {
  canHandle(handlerInput) {
    return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
  },
  handle(handlerInput) {
    console.log(`Session ended with reason: ${handlerInput.requestEnvelope.request.reason}`);

    return handlerInput.responseBuilder.getResponse();
  },
};

const ErrorHandler = {
  canHandle() {
    return true;
  },
  handle(handlerInput, error) {
    console.log(`Error handled: ${error.message}`);

    return handlerInput.responseBuilder
      .speak('Sorry, I can\'t understand the command. Please say again.')
      .reprompt(getRepromptText())
      .getResponse();
  },
};

const skillBuilder = Alexa.SkillBuilders.custom();

exports.handler = skillBuilder
  .addRequestHandlers(
    LaunchRequestHandler,
    AskLunchIntentHandler,
    YesIntentHandler,
    HelpIntentHandler,
    CancelAndStopIntentHandler,
    SessionEndedRequestHandler
  )
  .addErrorHandlers(ErrorHandler)
  .lambda();
