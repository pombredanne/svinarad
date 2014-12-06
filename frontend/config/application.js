/* Exports a function which returns an object that overrides the default &
 *   plugin grunt configuration object.
 *
 * You can familiarize yourself with Lineman's defaults by checking out:
 *
 *   - https://github.com/linemanjs/lineman/blob/master/config/application.coffee
 *   - https://github.com/linemanjs/lineman/blob/master/config/plugins
 *
 * You can also ask Lineman's about config from the command line:
 *
 *   $ lineman config #=> to print the entire config
 *   $ lineman config concat.js #=> to see the JS config for the concat task.
 */
module.exports = function(lineman) {
	var source_map = lineman.config.application.concat_sourcemap;
	return {
		loadNpmTasks: lineman.config.application.loadNpmTasks.concat(['grunt-jade', 'grunt-livescript']),
		concat_sourcemap: {
			js: {
				src: source_map.js.src.concat(['<%= files.livescript.generated %>'])
			}
		},
		jade: {
		  html: {
			  files: {
				  'generated/templates/': ['<%= files.jade.app %>']
			  },
			  options: {
				  basePath: '<%= files.jade.base %>',
				  client: false
			  }
		  }
		},
		rename : {
			jade : {
				src: "<%= files.jade.base %>/**/*.html",
				dest: "<%= files.jade.generated %>"
			}
		},
		ngtemplates : {
			options: {
				module: "appls"
			},
			app: {
				options: {
					base: "<%= files.jade.generated %>"
				},
				src: "<%= files.jade.generated %>**/*.html",
				dest: "<%= files.ngtemplates.dest %>"
			}
		},
		livescript: {
			app: {
				files: {
					'<%= files.livescript.generated %>': ['<%= files.livescript.app %>']
				}
			},
			spec: {
				files: {
					'spec/spec.ls.js': ['spec/**/*spec.ls']
				}
			}
		},
		watch: {
			jade: {
				files: ['<%= files.jade.app %>'],
				tasks: ['jade:html', 'ngtemplates:app', 'concat_sourcemap:js']
			},
			livescript: {
				files: ['<%= files.livescript.app %>'],
				tasks: ['livescript:app', 'concat_sourcemap']
			},
			livescriptSpec: {
				files: ['<%= files.livescript.spec %>'],
				tasks: ['livescript:spec']
			},
			ngtemplates: {
				files: ['<%= files.jade.generated %>/**/*.html'],
				tasks: ["ngtemplates", "concat_sourcemap:js"]
			},	
			options: {
				livereload: 35729
			}
		},
		prependTasks: {
			common: lineman.config.application.prependTasks.common.concat(['livescript', 'jade', 'ngtemplates:app'])
		},
		removeTasks: {
		  common: ["coffee", "handlebars", "jst"]
		},
		server: {
			pushState: true,
			apiProxy: {
				enabled: true,
				host: 'localhost',
				port: 8080,
				prefix: 'api'
			}
		},
		'spec-ci': {
			options: {
				reporter: {
					type: 'tap',
					dest: 'fantasy-tests.tap'
				}
			}
		}
	};

};
