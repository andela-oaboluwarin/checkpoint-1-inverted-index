/* eslint no-undef:0 */
const books = `[
  {
    "title": "The Great Debaters",
    "text": "Denzel Washington stars as an educator and activist in a racially plagued community, leading his four brightest students on a debating conquest across the country."
  },

  {
    "title": "Prison Break",
    "text": "Michael Scofield embarks on a thrilling adventure of mind-blowing escapes from detention in this gripping tale of wits, relationships, and self-serving inmates."
  }
]`;

const goodBooks = `[
  {
    "title": "Alice in Wonderland",
    "text": "Alice falls into a rabbit hole and enters a world full of imagination."
  },
  {
    "title": "The Lord of the Rings: The Fellowship of the Ring.",
    "text": "An unusual alliance of man, elf, dwarf, wizard and hobbit seek to destroy a powerful ring."
  }
]`;

const newIndex = new InvertedIndex();
const emptyBook = [];


// Inverted Index class test suite
describe('Class Inverted Index', () => {
  it('should be a class', () => {
    expect(newIndex instanceof InvertedIndex).toBe(true);
    expect(newIndex instanceof Object).toBe(true);
    expect(typeof (newIndex)).toBe('object');
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
      expect(newIndex.searchIndex(debaters, newIndex.getIndex())).toEqual({
        debaters: [0]
      });
      expect(newIndex.searchIndex(on, newIndex.getIndex())).toEqual({
        on: [0, 1]
      });
      expect(newIndex.searchIndex(discombobulated, newIndex.getIndex())).toEqual({
        discombobulated: 'We are Sorry but discombobulated is not found in our database'
      });
      expect(newIndex.searchIndex(multipleSearch, newIndex.getIndex()))
        .toEqual({
          debaters: [0],
          social: 'We are Sorry but social is not found in our database',
          tale: [1],
          and: [0, 1]
        });
    });
  });
});
