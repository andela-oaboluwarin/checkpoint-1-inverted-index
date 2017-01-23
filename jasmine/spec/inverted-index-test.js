'use strict';

const books = require('./books');
const books_2 = require('./books_2');

// A test suite to read book data
describe('Inverted Index Suite', () => {
  //Define variables to be used in the test Suite
  const newIndex = new InvertedIndex();
  const emptyBook = [];
  const sampleSentence = 'This be an %example of the #typical be sentence type.';
  const multipleSearch = 'Obama left on a high';
  newIndex.createIndex(books);

  describe('Class Inverted Index', () => {
    it('should be a class', () => {
      expect(newIndex instanceof InvertedIndex).toBe(true);
      expect(newIndex instanceof Object).toBe(true);
      expect(typeof (newIndex)).toBe('object');
    });
  });

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

  describe('Distinct Words', () => {
    it('should be available in class InvertedIndex', () => {
      expect(InvertedIndex.distinctWords).toBeDefined();
    });
    it('should return an array of words without duplicates', () => {
      expect(InvertedIndex.distinctWords(sampleSentence).length).toBe(9);
    });
  });

  describe('Read File Data', () => {
    it('should have createIndex available in class InvertedIndex', () => {
      expect(newIndex.createIndex).toBeDefined();
    });
    it('should ensure the JSON file is not empty', () => {
      expect(newIndex.createIndex(emptyBook)).toBe('JSON file is Empty');
      expect(newIndex.createIndex(books)).not.toBe('JSON file is Empty');
      expect(newIndex.createIndex(books_2)).not.toBe('JSON file is Empty');
    });
  });

  describe('Populate Index', () => {
    it('should have an Index created', () => {
      expect(newIndex.index.prison).toBeDefined();
    });
    it('should accurately map words to their document location', () => {
      expect(newIndex.index.on).toEqual([0, 1]);
      expect(newIndex.index.scofield).toEqual([1]);
    });
  });


  describe('Search Index', () => {
    it('should have searchIndex method accessible in the class', () => {
      expect(newIndex.searchIndex).toBeDefined();
    });
    it('should return correct index for each word', () => {
      expect(newIndex.searchIndex('debaters', newIndex.getIndex())).toEqual({
        'debaters': [0]
      });
      expect(newIndex.searchIndex('on', newIndex.getIndex())).toEqual({
        'on': [0, 1]
      });
      expect(newIndex.searchIndex('discombobulated', newIndex.getIndex())).toEqual({
        'discombobulated': 'We are Sorry but discombobulated is not found in our database'
      });
      expect(newIndex.searchIndex(multipleSearch, newIndex.getIndex()))
        .toEqual({
          'debaters': [0],
          'social': 'We are Sorry but social is not found in our database',
          'tale': [1],
          'and': [0, 1]
        });
    });
  });

});

