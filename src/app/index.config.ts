/** @ngInject */
export function config($logProvider: ng.ILogProvider, $locationProvider: any) {
  // enable log
  $logProvider.debugEnabled(true);

  // enable html5 mode for url
  $locationProvider.html5Mode(true).hashPrefix('!');
}
