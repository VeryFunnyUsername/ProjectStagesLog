'use strict';

/**
 * persons-database controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::persons-database.persons-database');
