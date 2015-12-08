(function () {
	'use strict';

	angular
		.module('App', [
			'routes',
			'auth',
			'dashboard'
		]);

	angular.module('routes', ['ngRoute']);

	angular.module('auth', []);

	angular.module('dashboard', []);

})();