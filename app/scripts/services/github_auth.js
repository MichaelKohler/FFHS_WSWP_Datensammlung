'use strict';

angular.module('ffhsWswpDatensammlungApp')
  .factory('GitHubAuth', function ($rootScope, $q, $http) {
    var url = 'https://api.github.com/authorizations';

    // WARNING: DO NOT PUT THIS ONLINE OTHERWISE YOUR SECRET WILL BE LEAKED!
    // The secret should be stored on a server and the server should do the
    // Auth and just return the resulting token. Since I won't host this anywhere
    // and just need to get the data for now, it should be alright.
    var clientID = 'MYCLIENTID';
    var secret = 'MYCLIENTSECRET';

    return {
      token: '',

      auth: function () {
        var deferred = $q.defer();

        $http({
          url: url,
          method: 'POST',
          params: {
            "scopes": [
              "public_repo"
            ],
            "note": "get more requests..",
            client_id: clientID,
            client_secret: secret
          },
          headers: {
            'Content-Type':'application/json; charset=UTF-8'
          }
        }).success(function (data) {
          console.log(data);
          this.token = data;
          deferred.resolve(data);
        }).error(function (err) {
          deferred.reject(err);
        });

        return deferred.promise;
      }
    };
  });
