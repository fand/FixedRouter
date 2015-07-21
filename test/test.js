'use strict';

var test    = require('tape');
var Promise = require('promise');

var Router  = require('../index.js');

var myController = new Promise(function (resolve) {
    setTimeout(function () {
        resolve('hahaha');
    }, 1000);
});

test('selectRoute after register', function (t) {
    t.plan(1);
    Router.register('before', myController);
    setTimeout(function () {
        Router.selectRoute('before').then(function (result) {
            t.equal(result, 'hahaha');
        });
    }, 100);
});

test('selectRoute before register', function (t) {
    t.plan(1);
    Router.selectRoute('after').then(function (result) {
        t.equal(result, 'hahaha');
    });
    setTimeout(function () {
        Router.register('after', myController);
    }, 100);
});
