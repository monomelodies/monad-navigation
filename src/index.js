
"use strict";

import Service from './Service';
import '../lib/template';

export default angular.module('monad.navigation', ['monad.cms', 'monad.navigation.templates'])
    .service('monadNavigationService', Service)
    // Backwards compat with 2.x:
    .service('moNavigation', Service)
    .component('monadNavigation', {
        templateUrl: 'Monad/Navigation/template.html',
        controller: ['monadNavigationService', function (Service) {
            this.$onInit = () => {
                this.menu = this.menu || 'main';
                this.options = Service.getPath(this.menu);
            };
            this.select = item => Service.select(item);
        }],
        bindings: {path: '@'}
    })
    .name
    ;

