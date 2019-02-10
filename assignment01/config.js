'use strict';

/**
 * Home assignment #1: Building a RESTful API
 * 
 */


let enviroment = {};

 enviroment.staging = {
  'httpPort' : 3000,
  'httpsPort' : 3001,
  'envName' : 'staging'
 };

 enviroment.production = {
  'httpPort' : 5000,
  'httpsPort' : 5001,
  'envName' : 'production'
 };

 const currentEnviroment = typeof(
   process.env.NODE_ENV) == 'string' ? 
   process.env.NODE_ENV.toLowerCase() : '';

 const enviromentToExport = typeof(
   enviroment[currentEnviroment]) == 'object' ? 
   enviroment[currentEnviroment] : enviroment.staging;

 module.exports = enviromentToExport;