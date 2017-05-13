
"use strict";

import Service from './Service';
import '../lib/template';

export default angular.module('monad.navigation', ['monad.cms', 'monad.navigation.templates'])
    .service('monadNavigationService', Service)
    // Backwards compat with 2.x:
    .service('moNavigation', Service)
    .component('monadNavigation', {
        templateUrl: 'Monad/Navigation/template.html',
        controller: ['monadNavigationService', 'monadLocation', function (Service, monadLocation) {
            this.$onInit = () => {
                this.path = this.path || 'main';
                this.options = Service.getPath(this.path);
            };
            this.select = item => Service.select(item);
            this.url = url => monadLocation.make(url);
        }],
        bindings: {path: '@'}
    })
    .name
    ;

