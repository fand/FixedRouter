'use strict';
import EventEmitter from 'events';

const EVENT = (pageID) =>  'register:' + pageID;

class Router extends EventEmitter {
    constructor () {
        super();
        this.routes = {};
    }

    getController (pageID) {
        return new Promise((resolve) => {
            this.once(EVENT(pageID), () => {
                this.routes[pageID](() => resolve(true));
            });
        });
    }

    selectRoute (pageID) {
      var controller = this.getController(pageID);

      if (this.routes[pageID]) {
          this.emit(EVENT(pageID));
      }

      return controller();
    }

    register (pageID, controller) {
        this.routes[pageID] = controller;
        this.emit(EVENT(pageID));
    }
}

export default new Router();
