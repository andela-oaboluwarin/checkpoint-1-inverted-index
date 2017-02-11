const invertedApp = angular
  .module('InvertedIndex', [])
  .controller('indexController', ($scope) => {
    $scope.indexExists = false;
    $scope.validSearch = false;
    $scope.fileForUpload = {};
    $scope.fileForIndex = {};
    $scope.fileForSearch = {};

    const index = new InvertedIndex();

    const modalMessage = (msg) => {
      $scope.message = msg;
      $('#myModal').modal();
    };

    $scope.uploadFile = () => {
      $scope.selectedFile = document.getElementById('input-files').files[0];
      if (!$scope.selectedFile) {
        $scope.uploadSuccess = false;
        modalMessage('Select a file before uploading');
      }
      if (!$scope.selectedFile.name.toString().match(/\.json$/)) {
        $scope.uploadSuccess = false;
        modalMessage('This is not a JSON file.');
      }
      const reader = new FileReader();
      reader.readAsText($scope.selectedFile);

      reader.onload = (e) => {
        $scope.fileContent = JSON.parse(e.target.result);
        if ($scope.fileContent.length === 0 || !$scope.fileContent[0].title || !$scope.fileContent[0].text) {
          $scope.uploadSuccess = false;
          modalMessage('This file does not contain the required parameters for indexing');
          $scope.$apply();
        } else {
          $scope.uploadSuccess = true;
          modalMessage('Upload Successful');
        }
        console.log($scope.fileContent);
        // $scope.fileCont = fileContent;
        $scope.fileForUpload[$scope.selectedFile.name] = $scope.fileContent;
        $scope.$apply();
      };
    };

    $scope.createIndex = () => {
      $scope.noOfBook = new Array($scope.fileContent.length);
      const addedFile = $scope.addedFile;
      $scope.index = [];
      if (!addedFile) {
        modalMessage('No file selected');
      }
      index.createIndex(addedFile, $scope.fileContent);
      const result = index.getIndex();
      $scope.index.push(result);
      $scope.index.forEach((indexObject) => {
        for (const i in indexObject) {
          $scope.fileForIndex[i] = { filename: i, index: indexObject[i] };
          $scope.thisIndex = $scope.fileForIndex[i].index;
        }
      });
      $scope.indexExists = true;
      $scope.validSearch = false;
    };

    $scope.searchIndex = () => {
      const searchTerms = $scope.searchWord;
      const fileForSearch = $scope.searchedFile;
      $scope.results = [];
      if (!fileForSearch) {
        modalMessage('No file selected');
      } else if (searchTerms === '' || searchTerms === undefined) {
        modalMessage('Search field cannot be blank');
      } else if (Object.keys($scope.fileForSearch).length === 0) {
        modalMessage('Create an index first');
      }

      $scope.searchResult = $scope.index.searchIndex(searchTerms, fileForSearch);
      $scope.results.push($scope.searchResult);

      $scope.results.forEach((searchResult) => {
        for (const i in searchResult) {
          $scope.fileForSearch[i] = {
            name: i,
            index: searchResult[i]
          };
        }
      });
      $scope.indexExists = true;
      $scope.validSearch = false;
    };
  });
