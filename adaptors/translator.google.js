'use strict';

import Hope from 'hope';
import GoogleTranslate from 'google-translate-api';
// -- Internal
import Ava from '../modules/ava';

const LANGUAGE = 'en';

export default (request) => {
  let promise = new Hope.Promise();
  Ava.searching();

  if (request.language.code === LANGUAGE) {
    promise.done(null, request);
  } else {
    GoogleTranslate(request.sentence, {from: request.language.code, to: LANGUAGE}).then(response => {
      request.sentence = response.text;
      request.translator.google = {language: response.from.language.iso, sentence: response.text};
      promise.done(null, request);
    }).catch(error => {
      promise.done(error, null);
    });
  }

  return promise;
}
