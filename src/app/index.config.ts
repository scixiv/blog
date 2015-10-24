/** @ngInject */
export function config($logProvider: ng.ILogProvider, $locationProvider: any,
  $mdThemingProvider: any) {
  // enable log
  $logProvider.debugEnabled(true);

  // enable html5 mode for url
  $locationProvider.html5Mode(true).hashPrefix('!');

  $mdThemingProvider.theme('scixiv')
    .primaryPalette('clean')
    .accentPalette('orange')
    .warnPalette('lime')
    .backgroundPalette('grey');

  var clean = $mdThemingProvider.extendPalette('grey', {
    '500': 'ffffff'
  });
  $mdThemingProvider.definePalette('clean', clean);
}
