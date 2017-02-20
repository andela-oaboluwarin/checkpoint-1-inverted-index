/**
 * @class InvertedIndex
 */
class InvertedIndex {

  /**
   * Creates an instance of InvertedIndex.
   * @memberOf InvertedIndex
   */
  constructor() {
    this.index = {};
  }

  /**
   * Method to get an array of all words in a particular text
   * @param{String} words - String to tokenize
   * @return{Array} list of words devoid of special characters or symbols
   */
  static getTokens(words) {
    return words.toLowerCase()
      .match(/\w+/g)
      .sort();
  }

  /**
   * @param {any} fileContent - content of file to search.
   * @return {Boolean} - return true or false
   * @memberOf InvertedIndex
   */
  static isValidFile(fileContent) {
    let check = true;
    if (fileContent.length > 0 &&
      fileContent[0].title && fileContent[0].text) {
      check = true;
    } else {
      check = false;
    }
    return check;
  }

  /**
   * Method that ensures words appear only once
   * @param{String} words - The string to be filtered
   * @return{Array} tokens - Without duplicated words
   */
  static distinctWords(words) {
    const tokens = InvertedIndex.getTokens(words);
    return tokens.filter((item, index) => tokens.indexOf(item) === index);
  }

  /**
   * Method that creates index from document(s) in a file
   * @param{Array} filename - Name of the file to be indexed
   * @param{Array} fileContent - Particular array being indexed
   * @return{Object} index - Maps words to locations(documents)
   */
  createIndex(filename, fileContent) {
    const wordsToIndex = [];
    const index = {};
    fileContent.forEach((document) => {
      if (document.text && document.title) {
        wordsToIndex
          .push(`${document.title.toLowerCase()} ${document.text
            .toLowerCase()}`);
      }
    });

    const distinctContent = InvertedIndex.distinctWords(wordsToIndex.join(' '));
    distinctContent.forEach((word) => {
      index[word] = [];
      wordsToIndex.forEach((document, indexPosition) => {
        if (document.indexOf(word) > -1) {
          index[word].push(indexPosition);
        }
      });
    });
    this.index[filename] = index;
  }

  /**
   * Method that returns an index of words already created
   * @param{string} filename
   * @return{Object} index - That maps words to locations
   */
  getIndex(filename) {
    if (filename === undefined) {
      return this.index;
    }
    return this.index[filename];
  }

  /**
   * @param{String} searchQuery - Words to search for
   * @param{Array} fileName - Index to query
   * @return{Object} searchResult - Maps searched words to document locations
   */
	searchIndex(searchQuery, fileName) {
		searchQuery = searchQuery.toString();
    fileName = fileName || Object.keys(this.index);
    const searchResult = {};
    const searchTerms = InvertedIndex.distinctWords(searchQuery);
    fileName.forEach((fileInQuestion) => {
      searchResult[fileInQuestion] = {};
      searchTerms.forEach((term) => {
        if (term in this.index[fileInQuestion]) {
          searchResult[fileInQuestion][term] = this.index[fileInQuestion][term];
        }
      });
    });
    return searchResult;
  }
}
