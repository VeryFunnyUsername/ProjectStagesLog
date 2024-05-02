'use strict';

/**
 * persons-database service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::persons-database.persons-database');
