
"use strict";

let $uibModal = undefined;

class controller {

    constructor(_Authentication_, _$uibModal_, MONAD_VERSION, MONAD_COPYRIGHT) {
        Authentication = _Authentication_;
        $uibModal = _$uibModal_;
        this.version = MONAD_VERSION;
        this.copyright = MONAD_COPYRIGHT;
    }
    
    license() {
        $uibModal.open({
            templateUrl: 'Monad/templates/license.html',
            controller: ['$uibModalInstance', '$scope', function ($uibModalInstance, $scope) {
                $scope.ok = () => $uibModalInstance.dismiss();
            }]
        });
    }
    
    get authenticated() {
        return Authentication.check;
    }
    
    revoke() {
        return Authentication.revoke();
    }
    
};

controller.$inject = ['Authentication', '$uibModal', 'MONAD_VERSION', 'MONAD_COPYRIGHT'];

export default angular.module('monad.navigation.footer', ['monad.cms'])
    .component('monadFooter', {
        templateUrl: 'Monad/Navigation/Footer/template.html',
        controller
    })
    .name;

