/* eslint no-undef:0 */
/* eslint no-unused-vars:0 */
/**
 * Inverted index class
 */
class InvertedIndex {
  /**
   * Inverted index constructor
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
   * Methos that ensures words appear only once
   * @param{String} words - The string to be filtered
   * @return{Array} tokens - Without duplicated words
   */
  static distinctWords(words) {
    const tokens = InvertedIndex.getTokens(words);
    return tokens.filter((item, index) => tokens.indexOf(item) === index);
  }

  /**
   * Method that creates index from document(s) in a file
   * @param{Array} fileToIndex - Array of contents of the JSON file to index
   * @return{Object} index - Maps words to locations(documents)
   */
  createIndex(fileToIndex) {
    const wordsToIndex = [];
    const index = {};
    const fileLength = fileToIndex.length;
    if (fileLength === 0) {
      return 'JSON file is Empty';
    }
    fileToIndex.forEach((document) => {
      if (document.text) {
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
    this.index = index;
    return index;
  }

  /**
   * Method that returns an index of words already created
   * @return{Object} index - That maps words to locations(documents)
   */
  getIndex() {
    return this.index;
  }

  /**
   * @param{String} searchWords - Search query
   * @param{String} indexToSearch - Index to query
   * @return{Object} searchResults - Maps searched words to document locations
   */
  searchIndex(searchWords, indexToSearch) {
    const searchResults = {};
    const searchTerms = InvertedIndex.distinctWords(searchWords);
    searchTerms.forEach((word) => {
      if (indexToSearch[word]) {
        searchResults[word] = indexToSearch[word];
      } else {
        searchResults[word] =
          `Sorry, ${word} is not a word present in this file`;
      }
    });
    this.searchResults = searchResults;
    return searchResults;
  }

}
