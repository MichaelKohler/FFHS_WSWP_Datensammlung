'use strict';

angular.module('ffhsWswpDatensammlungApp')
  .factory('GitHubCommits', function ($rootScope, $q, $http) {
    var url = 'https://api.github.com/repos/mozilla-b2g/gaia/commits';

    return {
      currentPage: 0,

      getNextCommits: function (pageNumber) {
        console.log('getting next page.. ' + pageNumber);
        var deferred = $q.defer();
        this.currentPage = pageNumber;

        var _this = this;
        $http({
          url: url,
          method: 'GET',
          params: {
            since: '2013-07-02T00:00:00Z',
            until: '2015-03-31T23:59:59Z',
            per_page: 100,
            page: this.currentPage
          },
          headers: {
            'Content-Type':'application/json; charset=UTF-8'
          }
        }).success(function (data) {
          deferred.resolve(data);
        }).error(function (err) {
          _this.currentPage--;
          deferred.reject(err);
        });

        return deferred.promise;
      }
    };
  });
