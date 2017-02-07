const invertedApp = angular
  .module('InvertedIndex', [])
  .controller('indexController', ($scope) => {
    const newIndex = new InvertedIndex();

    const modalMessage = (msg) => {
      $scope.message = msg;
      $('#myModal').modal();
    };

    $scope.uploadFile = () => {
      $scope.validSearch = false;
      $scope.indexExists = false;
      $scope.theFile = document.getElementById('files').files[0];
      if (!$scope.theFile) {
        modalMessage('Select a file before uploading');
      }
      if (!$scope.theFile.name.toLowerCase().match(/\.json$/)) {
        $scope.uploadSuccess = false;
        modalMessage('This is not a JSON file.');
      }
      const reader = new FileReader();
      reader.readAsText($scope.theFile);

      reader.onload = (e) => {
        try {
          const filed = JSON.parse(e.target.result);
          if (filed.length === 0 || !filed[0].title || !filed[0].text) {
            $scope.uploadSuccess = false;
            modalMessage('This file does not contain required parameters for indexing');
            $scope.$apply();
          } else {
            $scope.uploadSuccess = true;
          }
          $scope.filed = filed;
          $scope.$apply();
        } catch (e) {
          modalMessage(e);
        }
      };
    };

    $scope.createIndex = () => {
      if ($scope.uploadSuccess) {
        newIndex.createIndex($scope.theFile.name, $scope.filed);
        $scope.range = [];
        const filedLength = $scope.filed.length;
        for (let docIndex = 0; docIndex < filedLength; docIndex += 1) {
          $scope.range.push(docIndex);
        }
        $scope.indexExists = true;
      } else {
        $scope.indexExists = false;
        modalMessage('Upload a valid JSON file first.');
      }
      $scope.indexObject = newIndex.getIndex($scope.theFile.name);
    };
    $scope.searchFile = () => {
      if ($scope.indexExists) {
        $scope.searchItem = $scope.searchTerm;
        $scope.searchResults = newIndex
          .searchIndex($scope.searchItem, $scope.theFile.name);
        $scope.validSearch = true;
      } else {
        $scope.validSearch = false;
      }
    };
  });
