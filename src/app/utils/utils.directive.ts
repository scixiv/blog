/** @ngInject */
export function match(): ng.IDirective {
  return {
    require: 'ngModel',
    link: matchLink
  };
}

/** @ngInject */
export function matchLink(scope: any, elem: any, attrs: any, ctrl: any): any {
  ctrl.$validators.match = function(modelValue, viewValue) {
    return scope.$eval(attrs.match) === modelValue;
  };
}

/** @ngInject */
export function diff(): ng.IDirective {
  return {
    require: 'ngModel',
    link: function(scope: any, elem: any, attrs: any, ctrl: any) {
      ctrl.$validators.diff = function(modelValue, viewValue) {
        return scope.$eval(attrs.diff) !== modelValue;
      };
    }
  };
}

/** @ngInject */
export function keepFalse(): ng.IDirective {
  return {
    require: 'ngModel',
    link: function(scope: any, elem: any, attrs: any, ctrl: any) {
      ctrl.$validators.keepFalse = function(modelValue, viewValue) {
        return true;
      };
    }
  };
}
