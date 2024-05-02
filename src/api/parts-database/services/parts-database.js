'use strict';

/**
 * parts-database service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::parts-database.parts-database');
