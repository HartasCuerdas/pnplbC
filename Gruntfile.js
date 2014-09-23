module.exports = function(grunt) {
  grunt.initConfig({
    loopback_sdk_angular: {
      services: {
        options: {
          input: '../../node/pnplb/server/server.js',
          output: 'app/pnp-services.js',
          ngModuleName: 'pnpServices',
          apiUrl: 'http://localhost:3000/api'
        }
      }
    },
    docular: {
      showAngularDocs: false,
      groups: [
        {
          groupTitle: 'LoopBack',
          groupId: 'loopback',
          sections: [
            {
              id: 'pnpServices',
              title: 'PnP Services',
              scripts: [ 'app/pnp-services.js' ]
            }
          ]
        }
      ]
    }
  });
 
  // Load the plugin that provides the "loopback-angular" and "grunt-docular" tasks.
  grunt.loadNpmTasks('grunt-loopback-sdk-angular');
  grunt.loadNpmTasks('grunt-docular');
  // Default task(s).
  grunt.registerTask('default', ['loopback_sdk_angular', 'docular']);
};