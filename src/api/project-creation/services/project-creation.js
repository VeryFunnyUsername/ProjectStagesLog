'use strict';

/**
 * project-creation service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::project-creation.project-creation');
