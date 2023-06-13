
"use strict";

const wm = new WeakMap();

class controller {

    constructor(Authentication, $uibModal, MONAD_VERSION, MONAD_COPYRIGHT) {
        wm.set(this, {Authentication, $uibModal});
        this.version = MONAD_VERSION;
        this.copyright = MONAD_COPYRIGHT;
    }
    
    license() {
        wm.get(this).$uibModal.open({
            templateUrl: 'Monad/templates/license.html',
            controller: ['$uibModalInstance', '$scope', function ($uibModalInstance, $scope) {
                $scope.ok = () => $uibModalInstance.dismiss();
            }]
        });
    }
    
    get authenticated() {
        return wm.get(this).Authentication.check;
    }
    
    revoke() {
        return wm.get(this).Authentication.revoke();
    }
    
};

controller.$inject = ['Authentication', '$uibModal', 'MONAD_VERSION', 'MONAD_COPYRIGHT'];

export default angular.module('monad.navigation.footer', ['monad.cms'])
    .component('monadFooter', {
        templateUrl: 'Monad/Navigation/Footer/template.html',
        controller
    })
    .name;

