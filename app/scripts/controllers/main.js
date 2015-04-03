'use strict';


angular.module('ffhsWswpDatensammlungApp')
  .controller('MainCtrl', function ($scope, GitHubCommits) {
    $scope.commits = [];
    $scope.error = '';

    $scope.getRawData = function () {
      $scope.rawCommits = JSON.stringify($scope.commits);
    };

    $scope.getNextCommits = function () {
      var nextPage = GitHubCommits.currentPage + 1;
      $scope.isLoading = true;

      GitHubCommits.getNextCommits(nextPage).then(function (commits) {
        $scope.isLoading = false;
        $scope.commits = $scope.commits.concat(commits);
      }, function (error) {
        $scope.isLoading = false;
        $scope.error = error;
      });
    };

    $scope.getNextCommits();
  });
