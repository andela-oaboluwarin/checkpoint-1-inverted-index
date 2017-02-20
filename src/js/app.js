const invertedApp = angular
  .module('InvertedIndexApp', [])
  .controller('indexController', ($scope) => {
    $scope.filenames = [];
    $scope.filesBank = [];
    $scope.createdIndex = [];
    $scope.showIndex = false;
    $scope.indexedFile = [];
    $scope.file = [];
    $scope.checkedBox = [];
    const newIndex = new InvertedIndex();

    const modalMessage = (msg) => {
      $scope.message = msg;
      $('#myModal').modal();
      $scope.$apply();
    };

    $scope.uploadFile = () => {
      $scope.files = document.getElementById('input-files').files[0];
      if (!$scope.files) {
        modalMessage('Select a file before uploading');
        return;
      }

      const reader = new FileReader();
      reader.readAsText($scope.files);

      reader.onload = (e) => {
        if (!$scope.files.name.toLowerCase().match(/\.json$/)) {
          $scope.uploadSuccess = false;
          modalMessage('This is not a JSON file.');
          return;
        }
        try {
          const fileContent = JSON.parse(e.target.result);
          const isValidFile = fileContent.length > 0 &&
            fileContent[0].title && fileContent[0].text;
          const alreadyExists = $scope.filenames.includes($scope.files.name);
          if (isValidFile && !alreadyExists) {
            $scope.uploadSuccess = true;
            modalMessage('Upload Successful!');
            if ($scope.uploadSuccess) {
              const fileDetails = {};
              fileDetails.name = $scope.files.name;
              fileDetails.content = fileContent;
              $scope.filenames.push($scope.files.name);
              $scope.filesBank.push(fileDetails);
              $scope.$apply();
            }
          } else {
            $scope.uploadSuccess = false;
            if (alreadyExists) {
              modalMessage('File already uploaded before');
            } else {
              modalMessage('This file is not suitable for indexing');
            }
            return;
          }
        } catch (error) {
          modalMessage(error);
        }
      };
    };

    const indexTableDisplay = () => {
      $scope.showIndex = true;
      $scope.showSearchTable = false;
      $scope.noOfBook = new Array($scope.content.length);
    };

    $scope.createIndex = () => {
      const uploadedFile = $scope.selectedFile;
      if (!$scope.selectedFile) {
        modalMessage('Select a file before creating an index');
      }
      $scope.content = $scope.filesBank[uploadedFile].content;
      const filename = $scope.filesBank[uploadedFile].name;
      if (!$scope.indexedFile.includes(filename)) {
        newIndex.createIndex(filename, $scope.content);
        $scope.index = newIndex.getIndex(filename);
        $scope.indexedFile.push(filename);
        $scope.createdIndex.push($scope.filesBank[uploadedFile].name);
      } else {
        modalMessage('Index already created before!');
      }
      indexTableDisplay();
    };

    $scope.checked = (val) => {
      if ($scope.checkedBox.includes(val)) {
        $scope.checkedBox.splice($scope.checkedBox.indexOf(val), 1);
      } else {
        $scope.checkedBox.push(val);
      }
    };

    $scope.docsInFile = (fileName) => {
      for (let xl = 0; xl <= $scope.filesBank.length; xl += 1) {
        if ($scope.filesBank[xl].name === fileName) {
          return $scope.filesBank[xl].content;
        }
      }
    };

    $scope.searchIndex = () => {
      $scope.showIndex = false;
      $scope.searchResult = {};
      $scope.showSearchTable = true;

      if ($scope.searchQuery === undefined) {
        modalMessage('Please enter a search word');
        return false;
      }
      if ($scope.checkedBox.length > 0) {
        $scope.searchResult = newIndex.searchIndex($scope.searchQuery, $scope.checkedBox);
      } else {
        $scope.searchResult = newIndex.searchIndex($scope.searchQuery);
      }
    };
  });
