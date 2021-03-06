import {BaseController} from './../../utils/utils.controller'

/** @ngInject */
export function usersRouter($stateProvider: ng.ui.IStateProvider) {
  $stateProvider
    .state('user', {
      url: '/',
      abstract: true,
      templateUrl: 'app/components/users/show.html',
      controller: UserController,
      controllerAs: 'Show'
    })

    .state('user.posts', {
      url: '',
      templateUrl: 'app/components/users/posts.html'
    })

}

class UserController extends BaseController {
  public user: any;

  /* @ngInject */
  constructor ($stateParams: any, $state: any, bloger: any) {
    super();
    this.user = bloger;
  }
}
