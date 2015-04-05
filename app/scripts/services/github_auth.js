'use strict';

angular.module('ffhsWswpDatensammlungApp')
  .factory('GitHubAuth', function ($rootScope, $q, $http) {
    var url = 'https://api.github.com/authorizations';
    var user = 'MichaelKohler';

    var auth = {};
    auth.token = '';

    auth.authenticate = function () {
      if (auth.token === '') {
        var password = prompt('Password for GitHub');
        auth.token = btoa(user + ':' + password);
      }

      var deferred = $q.defer();

      $http.defaults.headers.common['Authorization'] = 'Basic ' + auth.token;
      $http.post(url,
            {
              "scopes": [
                'public_repo'
              ],
              "note": 'get more requests..'
            }
      ).success(function (data) {
        $http.defaults.headers.common['Authorization'] = 'Basic ' + data.token;
        deferred.resolve(data);
      }).error(function (err) {
        deferred.reject(err);
      });

      return deferred.promise;
    };

    return auth;
  });
