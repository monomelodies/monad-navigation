
"use strict";

import Menu from './Menu';

let menus = {};
let $location = undefined;

let defaults = {
    authentication: undefined,
    notify: () => 0
};

/**
 * Service to handle navigatable menus in Monad.
 */
export default class Service {

    /**
     * Class constructor.
     *
     * @param object _$location_ Injected $location service.
     * @param object Authentication Injected default Authentication service.
     * @return void
     * @see Provider
     */
    constructor( _$location_, Authentication) {
        defaults.authentication = Authentication;
        $location = _$location_;
    }

    make(title) {
        menus[title] = new Menu(title, defaults);
        return menus[title];
    }

    /**
     * Getter for a specific menu.
     *
     * @param string title Usually taken from the `<monad-navigation
     *  menu="title">` attribute. If omitted returns the first defined menu (on
     *  the assumption that it is the main menu).
     * @return Menu menu An object of class Menu.
     * @see Menu
     */
    get(title = undefined) {
        if (title === undefined) {
            for (const title in menus) {
                return menus[title];
            }
        }
        if (!(title in menus)) {
            throw `No such menu: ${title}`;
        }
        return menus[title];
    }

    /**
     * Try to set "selected" status according to the current location.
     *
     * @return void
     */
    current() {
        for (let path in menus) {
            menus[path].options.map(item => item.selected = item.url != '/' && ('#' + $location.path()).indexOf(item.url) != -1);
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
        for (let path in menus) {
            menus[path].options.map(item => item.selected = false);
        }
        item.selected = true;
    }

}

Service.$inject = ['$location', 'Authentication'];

