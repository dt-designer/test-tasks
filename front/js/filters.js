(function () {
    'use strict';

    angular
        .module('filters')
        .filter('search', function() {
            return function(serviceList, searchData) {
                if(!searchData.method || !searchData.word) {
                    return serviceList;
                } else {
                    var serviceListFiltered = [];
                    for(var i = 0, iCount = serviceList.length; i < iCount; i++) {
                        var source, word;
                        if(searchData.method == 'login') {
                            source = serviceList[i][searchData.method].toLowerCase();
                            word = searchData.word.toLowerCase();
                        } else {
                            source = serviceList[i][searchData.method];
                            word = searchData.word;
                        }
                        if(source.indexOf(word) != -1) serviceListFiltered.push(serviceList[i]);
                    }
                    return serviceListFiltered;
                }
            }
        });

})();
