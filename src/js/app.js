const invertedApp = angular
  .module('InvertedIndexApp', [])
  .controller('indexController', ($scope) => {
    $scope.filenames = [];
    $scope.filesBank = [];
    $scope.createdIndex = [];
    const newIndex = new InvertedIndex();

    const modalMessage = (msg) => {
      $scope.message = msg;
      $('#myModal').modal();
      $scope.$apply();
    };

    $scope.uploadFile = () => {
      $scope.files = document.getElementById('input-files').files[0];
      console.log('ghshdhdhhd', $scope.files);
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
          const isValidFile = fileContent.length > 0 && fileContent[0].title && fileContent[0].text;
          const alreadyExists = $scope.filenames.includes($scope.files.name);
          if (isValidFile && !alreadyExists) {
            $scope.uploadSuccess = true;
            modalMessage('Upload Successful!');
            if ($scope.uploadSuccess) {
              const fileDetails = {};
              fileDetails.name = $scope.files.name;
              fileDetails.content = fileContent;
              // $scope.fileContent = fileContent;
              // console.log('show file content here', $scope.fileContent);
              $scope.filenames.push($scope.files.name);
              $scope.filesBank.push(fileDetails);
              console.log('introduction', $scope.filesBank);
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
      $scope.content = $scope.filesBank[uploadedFile].content;
      const filename = $scope.filesBank[uploadedFile].name;
      // $scope.index = newIndex.getIndex(filename);
      // console.log('Rotimi Babalola', $scope.index);

      // if ($scope.index) {
      // indexTableDisplay();
      // else {
      newIndex.createIndex(filename, $scope.content);
      // console.log('Oredavids', $scope.index);
      $scope.index = newIndex.getIndex(filename);
      // $scope.createdIndex.push($scope.filesBank[uploadedFile].name);
      console.log("The weapons", $scope.index);
      indexTableDisplay();
    };

    $scope.searchIndex = () => {
      if ($scope.indexExists) {
        $scope.searchItem = $scope.searchQuery;
        $scope.searchResults = newIndex
          .searchIndex($scope.searchItem, $scope.files.name);
        $scope.validSearch = true;
        console.log('hdhhdhdhhs', $scope.searchResults);
      } else {
        $scope.validSearch = false;
      }
    };
  });
