'use strict';

/**
 * persons-database router
 */

const { createCoreRouter } = require('@strapi/strapi').factories;

module.exports = createCoreRouter('api::persons-database.persons-database');
