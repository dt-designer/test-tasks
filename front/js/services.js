(function () {
	'use strict';

	angular
		.module('services')
		.factory('api', api);

	api.$inject = ['$http', '$window', '$injector', '$location'];

	function api($http, $window, $injector, $location) {
		var api = {
			get: get,
			post: post
		};

		return api;

		function get(method, params) {
            $http.defaults.headers.common['Api-Session'] = $window.localStorage.getItem('token');
			return $http.get('http://localhost:81/'+method, {
                params: params
			}).then(SuccessFn, ErrorFn);

			function SuccessFn(response) {
                return response;
			}

            function ErrorFn(response) {
                if(response.status == 403) {
                    $('#myModal').modal('hide');
                    $window.localStorage.setItem('token', '');
                    $location.path('auth');
                    console.log(response);
                    return response;
                } else {
                    console.log(response);
                }
            }
		}

		function post(method, params) {
            $http.defaults.headers.common['Api-Session'] = $window.localStorage.getItem('token');
			return $http.post('http://localhost:81/'+method, {
				params: params
			}).then(SuccessFn, ErrorFn);

			function SuccessFn(response) {
                return response;
			}

            function ErrorFn(response) {
                if(response.status == 403) {
                    $('#myModal').modal('hide');
                    $window.localStorage.setItem('token', '');
                    $location.path('auth');
                    console.log(response);
                    return response;
                } else {
                    console.log(response);
                }
            }
		}

	}
})();
