
"use strict";

import Service from './Service';
import '../lib/template';

export default angular.module('monad.navigation', ['monad.cms', 'monad.navigation.templates'])
    .service('monadNavigation', Service)
    .component('monadNavigation', {
        templateUrl: 'Monad/Navigation/template.html',
        controller: ['monadNavigation', 'monadLocation', function (Service, monadLocation) {
            this.$onInit = () => {
                this.menu = Service.get(this.menu);
            };
            this.select = item => Service.select(item);
            this.url = url => monadLocation.make(url);
        }],
        bindings: {menu: '@', main: '@'}
    })
    .name
    ;

