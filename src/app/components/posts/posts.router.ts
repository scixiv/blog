import {BaseController} from './../../utils/utils.controller'

/** @ngInject */
export function postsRouter($stateProvider: ng.ui.IStateProvider) {
  $stateProvider
    .state('posts', {
      url: '/articles',
      abstract: true,
      template: '<div ui-view></div>'
    })

    .state('posts.one',{
      url: '/:id',
      abstract: true,
      template: '<div ui-view></div>'
    })

    .state('posts.one.show',{
      url: '',
      templateUrl: 'app/components/posts/show.html',
      controller: PostShowController,
      controllerAs: 'Show'
    })
}

class PostNewController extends BaseController {
  public post: any;

  /* @ngnject */
  constructor ($stateParams: any, $state: any, Post: any) {
    super();
    this.post = new Post();
    this.post.$on('afterSave', function (self, res) {
      $state.go('posts.one.show', {id: res.data.data.id})
    });
  }
}

class PostShowController extends BaseController {
  public post: any;
  public comment: any;
  public publication: any;
  public Journal: any;
  public searchText: string;
  $q;

  newComment () {
    var that: any = this;
    that.comment = new that.post.comments.$model();
    that.comment.reply_only = true;
    that.comment.posts.push(that.post);
    that.comment.$on('afterSave', function(self, res) {
      that.post.comments.unshift(self);
      that.newComment();
    });
  }

  newPublication () {
    var that: any = this;
    that.searchText = '';
    that.publication = new that.post.publications.$model();
    that.publication.post = that.post;
    delete that.publication.journal
    that.publication.$on('afterSave', function(self, res) {
      that.post.publications.unshift(self);
      delete that.publication;
    });
  }

  queryJournals (text) {
    var deferred: any  = this.$q.defer();
    var list: any = this.Journal.$collection();
    list.$on('afterFetchAll', function(self, res) {
      deferred.resolve(self);
    });
    list.$search({q: text});
    return deferred.promise;
  }

  /* @ngInject */
  constructor ($q, $stateParams: any, $state: any, Post: any, Journal: any) {
    super();
    this.$q = $q;
    this.Journal = Journal;
    this.post = Post.$find($stateParams.id);
    var that = this;
    this.post.$then.then( function() {
      that.post.$setCommentsUser();
    })
    this.newComment();
  }
}

class PostEditController extends BaseController {
  public post: any;

  /* @ngInject */
  constructor ($stateParams: any, $state: any, Post: any) {
    super();
    this.post = Post.$find($stateParams.id);
    this.post.$on('afterSave', function (self, res) {
      $state.go('posts.one.show', {id: $stateParams.id})
    })
    this.post.$on('afterDestroy', function (self, res) {
      $state.go('posts.index')
    })

  }
}

class PostIndexController extends BaseController {
  public posts: any;

  /* @ngInject */
  constructor ($stateParams: any, $state: any, Post: any) {
    super();
    this.posts = Post.$search({reply_only: false});
  }
}

