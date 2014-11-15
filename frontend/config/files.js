/* Exports a function which returns an object that overrides the default &
 *   plugin file patterns (used widely through the app configuration)
 *
 * To see the default definitions for Lineman's file paths and globs, see:
 *
 *   - https://github.com/linemanjs/lineman/blob/master/config/files.coffee
 */
module.exports = function(lineman) {
  //Override file patterns here
  return {
	typescript: {
		app: "app/js/**/*.ts",
		spec: "spec/**/*.ts",
		specHelpers: "spec/helpers/**/*.ts",
		generated: "generated/js/app.ts.js",
		generatedSpec: "generated/js/spec.ts.js",
		generatedSpecHelpers: "generated/js/spec-helpers.ts.js"
	},
	livescript: {
		app: "app/js/**/*.ls",
		spec: "spec/**/*.ls",
		specHelpers: "spec/helpers/**/*.ls",
		generated: "generated/js/app.ls.js",
		generatedSpec: "generated/js/spec.ls.js",
		generatedSpecHelpers: "generated/js/spec-helpers.ls.js"
	},
	jade : {
		app: "app/templates/**/*.jade",
		base: "app/templates",
		generated: "generated/templates/"
	},
    js: {
      vendor: [
	  	"vendor/js/jquery.js",
		"vendor/js/bootstrap.js",
		"vendor/js/moment-w-locales.js",
		"vendor/js/hammer.js",
		"vendor/js/angular.js",
		"vendor/js/rx.lite.js",

		"vendor/js/**/*.js"
      ]
    },

    less: {
      compile: {
        options: {
          paths: ["vendor/css/normalize.css", "vendor/css/**/*.css", "app/css/**/*.less"]
        }
      }
    }
  };
};
