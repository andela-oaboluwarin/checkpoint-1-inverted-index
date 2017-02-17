const briefContent = require('../briefContent');
const weirdFormat = require('../weirdFormat');
const goodBooks = require('../goodBooks');

// Inverted Index test suite
describe('Inverted Index Suite', () => {
  // Define variables to be used in the test Suite
  const newIndex = new InvertedIndex();

  const sampleSentence =
    'This be an %example of the #typical be sentence type.';
  const multipleSearch = 'Destroy world imagination quickly.';
  const arraySearch = '[forever, wonderland] may be great and fellowship.';

  // Inverted Index class test suite
  describe('Class Inverted Index', () => {
    it('should be a class', () => {
      expect(newIndex instanceof InvertedIndex).toBe(true);
      expect(newIndex instanceof Object).toBe(true);
      expect(typeof (newIndex)).toBe('object');
      expect(typeof (newIndex)).not.toBe('string');
      expect(newIndex instanceof Object).not.toBe(false);
    });

    it('should return false if the json file is invalid or empty', () => {
      const isValid = InvertedIndex.isValidFile(weirdFormat);
      expect(isValid).toBe(false);
    });


    it('should return true if file format is as expected', () => {
      const isValid = InvertedIndex.isValidFile(goodBooks);
      expect(isValid).toBe(true);
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
    newIndex.createIndex('briefContent', briefContent);
    it('should have an Index created', () => {
      expect(newIndex.index).toBeDefined();
    });

    it('should accurately map words to their document location', () => {
      expect(newIndex.index.briefContent.and).toEqual([0]);
      expect(newIndex.index.briefContent.weapons).toEqual([0]);
      expect(newIndex.index.briefContent.avatar).not.toBe([0]);
      expect(newIndex.index.briefContent.cutlasses).not.toBe([1]);
    });
  });

  describe('Get Index', () => {
    newIndex.createIndex('goodBooks', goodBooks);
    it('should return an accurate index Object of the indexed file', () => {
      expect(newIndex.getIndex('goodBooks').alice).toEqual([0]);
      expect(Object.keys(newIndex.getIndex('goodBooks')).length).toBe(29);
    });
  });

  describe('Search Index', () => {
    newIndex.createIndex('goodBooks', goodBooks);
    it('should have searchIndex method accessible in the class', () => {
      expect(newIndex.searchIndex).toBeDefined();
    });

    it('should return correct index document for each word', () => {
      console.log('everything', newIndex.searchIndex('fellowship', ['goodBooks']));
      expect(newIndex.searchIndex('fellowship', ['goodBooks']))
        .toEqual({ goodBooks: ({ fellowship: [1] }) });
      expect(newIndex.searchIndex('of', ['goodBooks'])).toEqual({
        goodBooks: ({
          of: [0, 1]
        })
      });
      expect(newIndex.searchIndex('discombobulated', ['goodBooks']))
        .toEqual({
          goodBooks: {}
        });
      expect(newIndex.searchIndex('ring', ['goodBooks']))
        .not.toBe({ goodBooks: ({ ring: [0] }) });
      expect(newIndex.searchIndex(multipleSearch, ['goodBooks']))
        .toEqual({
          goodBooks: ({
            destroy: [1],
            imagination: [0],
            world: [0],
          })
        });
    });


    it('should return search result if an array is passed as term', () => {
      expect(newIndex.searchIndex(arraySearch,
        ['goodBooks'])).toEqual({
          goodBooks: ({
            and: [0, 1],
            fellowship: [1],
            wonderland: [0],
          })
        });
      expect(newIndex.searchIndex(arraySearch, ['goodBooks'])).not.toBe({
        goodBooks: ({
          be: [1],
          fellowship: [0],
          forever: [0, 1],
          great: [0],
          may: [0, 1],
          wonderland: [1]
        })
      });
    });
  });
});
