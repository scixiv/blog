import {Base} from "./../../../json_model/json_model";

/** @ngInject */
export function JsonConfig ($http: any) {
  Base.http = $http;
}
