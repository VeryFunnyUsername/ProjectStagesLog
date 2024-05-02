'use strict';

/**
 * material-database service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::material-database.material-database');
