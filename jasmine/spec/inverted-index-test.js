/* eslint no-undef:0 */
/* eslint no-unused-vars:0 */

const books = require('../books');
const goodBooks = require('../goodBooks');

// Inverted Index test suite
describe('Inverted Index Suite', () => {
  // Define variables to be used in the test Suite
  const newIndex = new InvertedIndex();
  const emptyBook = [];
  const sampleSentence =
    'This be an %example of the #typical be sentence type.';
  const multipleSearch = 'Destroy world imagination quickly.';
  newIndex.createIndex(books);
  newIndex.createIndex(goodBooks);

  // Inverted Index class test suite
  describe('Class Inverted Index', () => {
    it('should be a class', () => {
      expect(newIndex instanceof InvertedIndex).toBe(true);
      expect(newIndex instanceof Object).toBe(true);
      expect(typeof (newIndex)).toBe('object');
    });
  });
  // Get Tokens test Suite
  describe('Get Tokens String', () => {
    it('should be available in class InvertedIndex', () => {
      expect(InvertedIndex.getTokens).toBeDefined();
    });
    it('should return an array containing alphabets only', () => {
      expect(InvertedIndex.getTokens(sampleSentence)).not.toContain('%');
    });
    it('should return an array containing the correct number of words', () => {
      expect(InvertedIndex.getTokens(sampleSentence).length).toBe(10);
    });
  });

  // Book Data Test Suite
  describe('Read Book Data', () => {
    it('should have createIndex available in class InvertedIndex', () => {
      expect(newIndex.createIndex).toBeDefined();
    });
    it('should ensure the JSON file is not empty', () => {
      expect(newIndex.createIndex(emptyBook)).toBe('JSON file is Empty');
      expect(newIndex.createIndex(books)).not.toBe('JSON file is Empty');
      expect(newIndex.createIndex(goodBooks)).not.toBe('JSON file is Empty');
    });
  });

  describe('Distinct Words', () => {
    it('should be present in class InvertedIndex', () => {
      expect(InvertedIndex.distinctWords).toBeDefined();
    });
    it('should return an array of words without duplicates', () => {
      expect(InvertedIndex.distinctWords(sampleSentence).length).toBe(9);
    });
  });

  describe('Populate Index', () => {
    it('should have an Index created', () => {
      expect(newIndex.index).toBeDefined();
    });
    it('should accurately map words to their document location', () => {
      expect(newIndex.index.a).toEqual([0, 1]);
      expect(newIndex.index.wonderland).toEqual([0]);
    });
  });

  describe('Get Index', () => {
    it('should return an accurate index Object of the indexed file', () => {
      expect(Object.keys(newIndex.getIndex(goodBooks)).length).toBe(29);
    });
  });

  describe('Search Index', () => {
    it('should have searchIndex method accessible in the class', () => {
      expect(newIndex.searchIndex).toBeDefined();
    });
    it('should return correct index document for each word', () => {
      expect(newIndex.searchIndex('fellowship', newIndex.getIndex())).toEqual({
        fellowship: [1]
      });
      expect(newIndex.searchIndex('of', newIndex.getIndex())).toEqual({
        of: [0, 1]
      });
      expect(newIndex.searchIndex('discombobulated',
        newIndex.getIndex())).toEqual({
          discombobulated:
          'Sorry, discombobulated is not a word present in this file'
        });
      expect(newIndex.searchIndex(multipleSearch,
        newIndex.getIndex())).toEqual({
          destroy: [1],
          world: [0],
          imagination: [0],
          quickly: 'Sorry, quickly is not a word present in this file'
        });
    });
  });
});

