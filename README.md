[![Build Status](https://travis-ci.org/andela-oaboluwarin/checkpoint-1-inverted-index.svg?branch=master)](https://travis-ci.org/andela-oaboluwarin/checkpoint-1-inverted-index)
[![Coverage Status](https://coveralls.io/repos/github/andela-oaboluwarin/checkpoint-1-inverted-index/badge.svg?branch=develop)](https://coveralls.io/github/andela-oaboluwarin/checkpoint-1-inverted-index?branch=develop)

# Inverted-Index
An application that takes in a __JSON__ array of text objects, creates an index from the array, allowing users to search for words contained in the array.

## Application Features
- The format of the content(s) of the JSON file is as shown below:
```
[
  {
    "title": "The Great Debaters",
    "text": "Denzel Washington stars as an educator and activist in a racially plagued community, leading his four brightest students on a debating conquest across the country."
  },

  {
    "title": "Prison Break",
    "text": "Michael Scofield embarks on a thrilling adventure of mind-blowing escapes from detention in this gripping tale of wits, relationships, and self-serving inmates."
  }
]

```
* An Index of an uploaded file can be created, with:
  * The title and text values being the indexed words
  * The values against the titles being the headings of documents the indexed words can be found.
* Particular words (or strings of words) can be searched in already indexed files.

## Usage Instructions
- Web use


- Local Use
```
git clone https://github.com/andela-oaboluwarin/checkpoint-1-inverted-index.git

```
#### On an appropriate command line interface, navigate into the directory you cloned the repo into and:
- Install all the dependencies with `npm install`  (It is assumed you have [Nodejs](nodejs.org) installed already):

- Run Tests for the application with:
  `karma start` (which is the test command defined in the package manager __package.json__)

- Start the Application with:
  `npm start` and gain access to the application interface on your browser via http://localhost:3000/

##### Note:
`gulp` and any other command that has  __*gulp*__  included gives you access to developer features (majorly automated tasks that run behind the scenes).



## The application is written with the following Services & Javascript Technologies:
- Gulp (Task Runner - automates tasks that are recurrent)
- Karma (Generates the Test Coverage Folder)
- Jasmine (Test Runner)
- Travis CI (For Continous Integration and badge)
- Coveralls (To compute Test Coverage percentage and add a badge that displays the coverage percentage)
- Hound (To prevent style violations)
- AngularJs (For making features of the view responsive)
- Bootstrap (For Styling the view)


## Application Limitations


