'use strict';


angular.module('ffhsWswpDatensammlungApp')
  .controller('MainCtrl', function ($scope, $localStorage, GitHubCommits, GitHubAuth) {
    $scope.commits = [];
    $scope.$storage = $localStorage;
    $scope.isAuthorized = false;

    $scope.getRawData = function () {
      $scope.rawCommits = JSON.stringify($scope.commits);
    };

    $scope.getNextCommits = function () {
      var nextPage = GitHubCommits.currentPage + 1;
      $scope.isLoading = true;

      GitHubCommits.getNextCommits(nextPage).then(function (commits) {
        $scope.isLoading = false;
        $scope.commits = $scope.commits.concat(commits);
        $scope.$storage.commits = $scope.commits;
        $scope.$storage.page = GitHubCommits.currentPage;
      }, function (error) {
        $scope.isLoading = false;
        $scope.error = error;
      });
    };

    $scope.deleteStorage = function () {
      delete $scope.$storage.page;
      delete $scope.$storage.commits;
    };

    // Auth with GitHub
    GitHubAuth.authenticate().then(function () {
      $scope.isAuthorized = true;
    }, function (error) {
      $scope.error = error;
    });

    // Get first set of commits if there is nothing in LocalStorage, otherwise load it from localStorage
    // Since we're not hosting this anywhere right now, we can do that without Auth if the request from above hasn't
    // completed yet.
    if (!$scope.$storage.commits || $scope.$storage.commits.length === 0) {
      $scope.getNextCommits();
    }
    else {
      $scope.commits = $scope.$storage.commits;
      GitHubCommits.currentPage = $scope.$storage.page;
    }

  });
