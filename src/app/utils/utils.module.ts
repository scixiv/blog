import { match, diff, keepFalse } from './utils.directive';
import { JsonConfig } from './utils.config';
import * as factrs from './utils.factory';

export default angular.module('scixiv.utils', [])
  .run(JsonConfig)
  .directive('match', match)
  .directive('diff', diff)
  .directive('keepFalse', keepFalse)
  .factory('User', factrs._User)
  .factory('bloger', factrs.bloger)
  .factory('Post', factrs._Post)
  .factory('Journal', factrs._Journal)
  .factory('Issue', factrs._Issue)
  .factory('Publication', factrs._Publication)
