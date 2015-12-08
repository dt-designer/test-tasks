(function () {
	'use strict';

	angular
		.module('controllers')
		.controller('authCtrl', authCtrl)
		.controller('dashboardCtrl', dashboardCtrl);

	authCtrl.$inject = ['api', '$window', '$scope', '$location'];
	function authCtrl(api, $window, $scope, $location) {

        $scope.submit=function() {
            var method = 'auth',
                params = {
                    login: $scope.authLogin,
                    pass: $scope.authPass
                };
            var request = api.post(method, params);
            request.then(function(request) {
                if(request.data.status && request.data.status == 'success') {
                    $window.localStorage.setItem('token', request.headers('api-session'));
                    $location.path('dashboard');
                } else {
                    alert(request.data.error);
                }
            });
        };

	}


	dashboardCtrl.$inject = ['api', '$window', '$scope', '$location', '$timeout'];
	function dashboardCtrl(api, $window, $scope, $location, $timeout) {

		var token = $window.localStorage.getItem('token');
		if(!token) {
			$location.path('auth');
		}

        var method = 'list',
            params = {};
        var request = api.get(method, params);
        request.then(function(request) {
            if(request && request.data.status == 'success') {
                $scope.serviceList = request.data.list;
            }
        });

        $scope.addNewService=function() {
            var method = 'addService',
                params = {
                    idp: $scope.addServiceIdp,
                    login: $scope.addServiceLogin
                };
            var request = api.post(method, params);
            request.then(function(request) {
                if(request.data.status == 'success') {
                    $scope.serviceList.push(request.data.service);
                    $scope.addServiceIdp = '';
                    $scope.addServiceLogin = '';
                    $scope.successMessage = true;
                    $scope.successMessageText = 'Сервис успешно добавлен!';
                    $timeout(function() { $scope.successMessage = false; }, 4000);
                }
            });
        };

        $scope.removeServices=function() {
            if($scope.removeServiceId) {
                var method = 'removeService',
                    params = {
                        id: $scope.removeServiceId,
                    };
                var request = api.post(method, params);
                request.then(function (request) {
                    if (request.data.status == 'success') {
                        for(var i = 0, iCount = $scope.serviceList.length; i < iCount; i++) {
                            if($scope.serviceList[i].id == $scope.removeServiceId) {
                                $scope.serviceList.splice(i, 1);
                            }
                        }
                        $scope.successMessage = true;
                        $scope.successMessageText = 'Сервис успешно удален!';
                        $timeout(function() { $scope.successMessage = false; }, 4000);
                    }
                });
            }
        };

        $scope.openPopUP=function(id) {
            $('#myModal').modal('show');
            var method = 'service',
                params = {
                    id: id
                };
            var request = api.get(method, params);
            request.then(function(request) {
                if(request && request.data.status == 'success') {
                    $scope.serviceDataTrue = true;
                    $scope.service = request.data.service;
                    $scope.editServiceLogin = request.data.service.login;
                    $scope.editServicePartnerIDP = request.data.service.idp;
                    $scope.editServiceDLRmethod = request.data.service.dlr;
                    $scope.editServiceDirDataSet = request.data.service.dir;
                    $scope.editServiceRateType = request.data.service.rate;
                    $scope.editServiceRateBank = request.data.service.bank;
                    $scope.editServiceNotification = request.data.service.notif;
                    $scope.editServiceSMSreport = request.data.service.sms;
                    $scope.editServiceCredit = request.data.service.credit;
                    $scope.editServiceEmail = request.data.service.email;
                    if (!request.data.service.lastPay.date) {
                        $scope.service.lastPay.date = '-';
                    } else {
                        var date = new Date();
                        date.setTime(request.data.service.lastPay.date);
                        $scope.service.lastPay.date = date.getDate()+'.'+date.getMonth()+'.'+date.getFullYear();
                        $scope.service.lastPay.time = date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
                    }
                    if (!request.data.service.lastPay.sum) $scope.service.lastPay.sum = '-';
                    if (!request.data.service.lastPay.course) $scope.service.lastPay.course = '-';
                    if (!request.data.service.lastPay.comment) $scope.service.lastPay.comment = '-';
                }
            });
        };

        $scope.editServices=function() {
            var method = 'editService',
                params = {
                    id: $scope.service.id,
                    login: $scope.editServiceLogin,
                    idp: $scope.editServicePartnerIDP,
                    dlr: $scope.editServiceDLRmethod,
                    dir: $scope.editServiceDirDataSet,
                    sms: $scope.editServiceSMSreport,
                    rate: $scope.editServiceRateType,
                    bank: $scope.editServiceRateBank,
                    notif: $scope.editServiceNotification,
                    credit: $scope.editServiceCredit,
                    email: $scope.editServiceEmail,
                    balance: $scope.service.balance,
                    paySum: $scope.editPaySum,
                    payCourse: $scope.editPayCourse,
                    payComment: $scope.editPayComment
                };
            var request = api.post(method, params);
            request.then(function(request) {
                if (request.data.status == 'success') {
                    for(var i = 0, iCount = $scope.serviceList.length; i < iCount; i++) {
                        if($scope.serviceList[i].id == $scope.service.id) {
                            $scope.serviceList[i] = request.data.service;
                        }
                    }
                    $('#myModal').modal('hide');
                    $scope.successMessage = true;
                    $scope.successMessageText = 'Сервис успешно Отредактирован!';
                    $timeout(function() { $scope.successMessage = false; }, 4000);
                }
            });
        };


        $scope.logout=function() {
            var method = 'logout',
                params = {};
            api.post(method, params);
            $window.localStorage.setItem('token', '');
            $location.path('auth');
        };

        $scope.messageClose=function() {
            $scope.successMessage = false;
            $scope.successMessageText = '';
            $scope.errorMessage = false;
            $scope.errorMessageText = '';
        }

	}

})();
