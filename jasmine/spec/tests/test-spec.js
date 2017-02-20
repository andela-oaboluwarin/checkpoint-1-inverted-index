(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports=[
  {
    "title": "Weapons",
    "text": "Axes, Cutlasses, Spades, and Shovels"
  },

  {
    "title": "Avatar",
    "text": "Funny effigies in fantasy worlds."
  }
]

},{}],2:[function(require,module,exports){
module.exports=[
  {
    "title": "Alice in Wonderland",
    "text": "Alice falls into a rabbit hole and enters a world full of imagination."
  },
  {
    "title": "The Fellowship of the Ring.",
    "text": "An unusual alliance of man, elf, dwarf, wizard and hobbit seek to destroy a powerful ring."
  }
]

},{}],3:[function(require,module,exports){
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
  const arraySearch = ['forever', 'wonderland may be great and fellowship.'];

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

},{"../briefContent":1,"../goodBooks":2,"../weirdFormat":4}],4:[function(require,module,exports){
module.exports=[
  {
    "info": "The weapons of our warfare are not carnal"
  },
  {
    "random": "Funny people everywhere."
  }
]

},{}]},{},[3]);
