import * as JsonModel from "./../../../json_model/json_model";

class User extends JsonModel.Base {
  profile: any;
  static url = 'https://api.scixiv.com/v1/users';
  static $callbacks = {afterSave: []};

  constructor(id: number|string) {
    this.profile = {};
    this.$relationships = {
      journals: {list: true, model: Journal},
      involved_journals: { list: true, model: Journal },
      posts: { list: true, model: Post },
    };
    super(id);
  }

  get type(): string {
    return 'users'
  }
}

class Post extends JsonModel.Base {
  mine: boolean;
  to_public: boolean;
  comments;
  static url = 'https://api.scixiv.com/v1/posts';
  static $callbacks = {afterSave: []};

  constructor(id: number|string) {
    this.mine = true;
    this.to_public = true;
    this.$relationships = {
      comments: {list: true, model: Post},
      posts: {list: true, model: Post},
      commented_pubs: {list: true, model: Publication},
      publications: {list: true, model: Publication},
      user: {list: false, model: User},
      authors: { list: true, model: User },
      editors: { list: true, model: User }
    }
    super(id);
  }

  $setCommentsUser() {
    for (var j = 0; j < this.comments.length; j++) {
      for (var i = 0; i < this.$included.length; i++) {
        if (this.$included[i].id === this.comments[j].user.id &&
            this.$included[i].type === this.comments[j].user.type) {
          this.comments[j].user.$decode({data: this.$included[i]});
        }
      }
    }
  }

  get type(): string {
    return 'posts'
  }
}


class Journal extends JsonModel.Base {
  to_public: boolean;
  static url = 'https://api.scixiv.com/v1/journals';
  static $callbacks = {afterSave: []};

  constructor(id: number|string) {
    this.to_public = true;
    this.$relationships = {
      issues: {list: true, model: Issue},
      pending_pubs: {list: true, model: Publication},
      creator: {list: false, model: User},
      admins: { list: true, model: User },
      editors: { list: true, model: User }
    };
    super(id);
  }

  get type(): string {
    return 'journals'
  }
}

class Issue extends JsonModel.Base {
  static url = 'https://api.scixiv.com/v1/issues';
  static $callbacks = {afterSave: []};

  constructor(id: number|string) {
    this.$relationships = {
      journal: {list: false, model: Journal},
      posts: {list: true, model: Post},
      publications: {list: true, model: Publication},
    };
    super(id);
  }

  get type(): string {
    return 'issues'
  }
}

class Publication extends JsonModel.Base {
  static url = 'https://api.scixiv.com/v1/publications';
  static $callbacks = {afterSave: []};

  constructor(id: number|string) {
    this.$relationships = {
      journal: {list: false, model: Journal},
      issue: {list: false, model: Issue},
      post: {list: false, model: Post},
      comments: {list: true, model: Post},
    };
    super(id);
  }

  get type(): string {
    return 'publications'
  }
}

/** @ngInject */
export function _User(): any {
  return User
}

/** @ngInject */
export function bloger($location: any, User: any): any {
  var user = new User();
  var users = User.$collection();
  var domain: string = $location.host();
  var domParts: any = $location.host().split('.');
  var subDomains: any = {www: 1, blog: 1};
  users.$on("afterFetchAll", function (self, res) {
    if (self.length > 0) {
      user.$decode(self[0].$encode());
      user.$fetch();
    } else if (domParts.length > 2 && domParts[0] in subDomains) {
      domain = domParts.slice(1).join('.');
      self.$callbacks = {};
      self.$on("afterFetchAll", function (self, res) {
        if (self.length > 0) {
          user.$decode(self[0].$encode());
          user.$fetch();
        }
      });
      self.$search({domain: domain});
    }
  });
  console.log('domain', domain);
  users.$search({domain: domain});
  return user;
}

/** @ngInject */
export function _Post(): any {
  return Post;
};

/** @ngInject */
export function _Journal(): any {
  return Journal;
};

/** @ngInject */
export function _Issue(): any {
  return Issue;
};

/** @ngInject */
export function _Publication(): any {
  return Publication;
};
