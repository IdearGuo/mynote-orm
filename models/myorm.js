/**
 * Created by Guozhuanzhuan on 16/5/10.
 */

var Waterline = require('waterline');
var mysqlAdapter = require('sails-mysql');
var mongoAdapter = require('sails-mongo');

// Create the waterline instance.
var waterline = new Waterline();

// Create a specification for a User model.
var userCollection = Waterline.Collection.extend({
    identity: 'users',
    connection: 'default',
    attributes: {
        username: {
            type: 'string',
            required: true
        },
        password: 'string',
        email: 'string'
    }
});

// Create a specification for a Note model.
var noteCollection = Waterline.Collection.extend({
    identity: 'notes',
    connection: 'default',
    attributes: {
        title: {
            type: 'string',
            required: true
        },
        author: 'string',
        tag: 'string',
        content: 'string'
    }
});

// Add the models to the waterline instance.
waterline.loadCollection(userCollection);
waterline.loadCollection(noteCollection);

// Set up the storage configuration for waterline.
var config = {
    adapters: {
        'mongo': mongoAdapter,
        'mysql': mysqlAdapter,
        default: 'mysql'
    },

    connections: {
        default: {
            adapter: 'mysql',
            url:'mysql://root:@localhost/test'
        },
        mongo: {
            adapter: 'mongo',
            url: 'mongodb://localhost/test'
        },
        mysql: {
            adapter: 'mysql',
            url: 'mysql://root:@localhost/test'
        }
    }
};

exports.config = config;
exports.waterline = waterline;