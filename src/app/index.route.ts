/** @ngInject */
export function routerConfig($stateProvider: ng.ui.IStateProvider,
  $urlRouterProvider: ng.ui.IUrlRouterProvider) {

  $urlRouterProvider.otherwise('/');
}
