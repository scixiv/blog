/** @ngInject */
export function routerConfig($stateProvider: ng.ui.IStateProvider, $urlRouterProvider: ng.ui.IUrlRouterProvider) {
  $stateProvider
    .state('home', {
      url: '/',
      abstract: true,
      templateUrl: 'app/main/main.html'
    });

  $urlRouterProvider.otherwise('/');
}
