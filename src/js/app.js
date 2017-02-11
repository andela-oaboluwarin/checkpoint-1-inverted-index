const invertedApp = angular
  .module('InvertedIndexApp', [])
  .controller('indexController', ($scope) => {
    $scope.filenames = [];
    $scope.filesBank = [];
    $scope.createdIndex = [];
    $scope.showIndex = false;
    $scope.file = [];
    const myNewIndex = new InvertedIndex();

    const modalMessage = (msg) => {
      $scope.message = msg;
      $('#myModal').modal();
    };

    $scope.uploadFile = () => {
      $scope.selectedFile = document.getElementById('input-files').files[0];
      if (!$scope.selectedFile) {
        $scope.uploadSuccess = false;
        modalMessage('Please, select a file before uploading');
      }
      if (!$scope.selectedFile.name.toString().match(/\.json$/)) {
        $scope.uploadSuccess = false;
        modalMessage('This is not a JSON file.');
      }

      try {
        Object.keys($scope.selectedFile).forEach((key, index) => {
          const reader = new FileReader();
          reader.onload = (e) => {
            const fileContent = JSON.parse(e.target.result);
            if (fileContent.length === 0 || !fileContent[0].title
              || !fileContent[0].text) {
              $scope.uploadSuccess = false;
              modalMessage('This file does not contain the required parameters for indexing');
              return;
            }
            const fileDetails = {};
            fileDetails.name = $scope.selectedFile[index].name;
            fileDetails.content = fileContent;
            $scope.filesBank.push(fileDetails);
            $scope.filenames.push($scope.selectedFile[index].name);
            $scope.uploadSuccess = true;
            modalMessage('Upload Successful!');
          };
          if ($scope.filenames.includes($scope.selectedFile[index].name)) {
            $scope.uploadSuccess = false;
            modalMessage('You have already uploaded this file');
            return;
          }
          reader.readAsText($scope.selectedFile[index]);
        });
      } catch (error) {
        modalMessage('Please select a file before uploading');
      }
    };

    const indexTable = () => {
      $scope.showIndex = true;
      $scope.displaySearchTable = false;
      $scope.bookNumber = new Array($scope.content.length);
    };

    $scope.createIndex = () => {
      const addedFile = $scope.selectedFile;
      $scope.content = $scope.filesBank[addedFile].content;
      const filename = $scope.filesBank[addedFile].name;
      $scope.index = myNewIndex.getIndex(filename);

      if ($scope.index) {
        indexTable();
      } else {
        myNewIndex.createIndex(filename, $scope.content);
        $scope.index = myNewIndex.getIndex(filename);
        $scope.createdIndex.push($scope.filesBank[addedFile].name);
        indexTable();
      }
    };

    $scope.searchIndex = () => {
      $scope.showIndex = false;
      $scope.displaySearchTable = true;
      const selectedFile = $scope.fileForSearch;
      const filename = selectedFile === 'All files' ? null : $scope.filesBank[selectedFile].name;
      if ($scope.searchTerm === undefined || $scope.searchTerm === ' ') {
        $scope.searchSuccess = false;
        modalMessage('Please enter the words you wish to search');
        $scope.index = {};
        return false;
      }
      if (!filename) {
        $scope.index = myNewIndex.searchIndex($scope.searchTerm);
      } else {
        $scope.file = [];
        $scope.file.push(filename);
        const searchObject = $scope.filesBank[selectedFile].content;
        $scope.bookTitle = searchObject;
        $scope.bookNumber = new Array(searchObject.length);
        $scope.index = myNewIndex.searchIndex($scope.searchTerm, $scope.file);
      }
    };
  });
