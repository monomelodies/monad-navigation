
"use strict";

let paths = {};

let defaults = {
    authentication: undefined,
    notify: () => {}
};

/**
 * Service to handle navigatable menus in Monad.
 */
export default class Menu {

    /**
     * Class constructor.
     *
     * @param string title The title of this menu.
     * @param object _defaults_ Object of default properties for options in this
     *  menu. Is passed from the Menu Service.
     * @param array options Optional options for this menu. Options may be
     *  passed during construction or by calling the `Menu.option()` method.
     * @return void
     */
    constructor(title, _defaults_, options = []) {
        this.title = title;
        defaults = angular.extend(defaults, _defaults_);
        this.options = options;
    }

    /**
     * Register an option on this menu
     *
     * @param string title The title of the option (e.g. "Edit").
     * @param string url The URL the option should point to (e.g. "/edit/").
     * @param oject options Hash of settings for this menu option.
     * @return self The Menu itself, for chaining (cfg. `$routerProvider.when()`
     *  from Angular).
     */
    option(title, url, options = {}) {
        this.options.push(angular.extend({}, defaults, options, {title, url}));
        return this;
    }

    /**
     * Try to set "selected" status according to the current location.
     *
     * @return void
     */
    current() {
        for (let path in paths) {
            //paths[path].map(item => item.selected = item.url != '/' && ('#' + $location.path()).indexOf(item.url) != -1);
        }
    }

    /**
     * Select the specified item.
     *
     * @param object item Optional item to select. If none is passed, nothing is
     *  selected.
     * @return void
     */
    select(item = {}) {
        for (let path in paths) {
            paths[path].map(item => item.selected = false);
        }
        item.selected = true;
    }

}

