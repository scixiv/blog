/// <reference path="../../.tmp/typings/tsd.d.ts" />

import { config } from './index.config';
import { routerConfig } from './index.route';
import { runBlock } from './index.run';
import { usersRouter } from '../app/components/users/users.router';
import { postsRouter } from '../app/components/posts/posts.router';
import { scAuthMenu } from '../app/components/navbar/navbar.directive';

import '../app/utils/utils.module';

module blog {
  'use strict';

  angular.module('blog', ['ngAnimate', 'ngMessages', 'ui.router', 'ngMaterial', 'scixiv.utils', 'textAngular'])
    .config(config)
    .config(routerConfig)
    .config(usersRouter)
    .config(postsRouter)
    .run(runBlock)
    .directive('scAuthMenu', scAuthMenu);
}
