/* eslint no-undef:0 */
/* eslint no-unused-vars:0 */

const indexApp = angular
  .module('InvertedIndex', [])
  .controller('indexController', ($scope) => {
    const newIndex = new InvertedIndex();
    /**
     *@returns {string} msg - Error message
    * @param {string} msg - Error message
    */
    function setMessage(msg) {
      $scope.$apply(() => {
        $scope.uploadError = msg;
      });
    }
    $scope.uploadFile = () => {
      // Set index & search results to an initial off position.
      $scope.validSearch = false;
      $scope.indexExists = false;
      const thefile = document.getElementById('select-files').files[0];
      const reader = new FileReader();
      reader.readAsText(thefile);

      reader.onload = (err) => {
        if (!thefile.name.toLowerCase().match(/\.json$/)) {
          $scope.uploadSuccess = false;
          setMessage('This is not a JSON file.');
          return;
        }
        try {
          const acceptedJsonFile = JSON.parse(err.target.result);
          if (acceptedJsonFile.length === 0 || !acceptedJsonFile[0].title ||
            !acceptedJsonFile[0].text) {
            $scope.uploadSuccess = false;
            setMessage('This is an Empty JSON File');
            $scope.$apply();
          } else {
            $scope.uploadSuccess = true;
          }
          $scope.acceptedJsonFile = acceptedJsonFile;
          $scope.$apply();
        } catch (err) {
          setMessage(err);
        }
      };
    };

    $scope.createIndex = () => {
      if ($scope.uploadSuccess) {
        $scope.indexObject = newIndex.createIndex($scope.acceptedJsonFile);
        $scope.range = [];
        const filedLength = $scope.acceptedJsonFile.length;
        for (let docIndex = 0; docIndex < filedLength; docIndex += 1) {
          $scope.range.push(docIndex);
        }
        $scope.indexExists = true;
      } else {
        $scope.indexExists = false;
        setMessage('Upload a valid JSON file before indexing.');
      }
    };
    $scope.searchInsideFile = () => {
      if ($scope.indexExists) {
        $scope.searchItem = $scope.searchTerm;
        $scope.searchResults = newIndex
          .searchIndex($scope.searchItem, $scope.indexObject);
        $scope.validSearch = true;
      } else {
        $scope.validSearch = false;
      }
    };
  });

