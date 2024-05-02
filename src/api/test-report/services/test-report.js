'use strict';

/**
 * test-report service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::test-report.test-report');
