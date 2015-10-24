/** @ngInject */
export function scAuthMenu(bloger: any): ng.IDirective {

  return {
    restrict: 'AC',
    link: function (scope: any) {
      scope.vm = {} ;
      scope.vm.bloger = bloger;
    }
  };
}
