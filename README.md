# CRYPTOGRAMMER API

This is an API designed to be a backend counterpart to a cryptogram puzzle game. Uses sqlite3 and python to build the quotes database. Requires node and npm.

## Installation

Run the following in the repo after pulling:

```bash
$ npm install
```

## Running

Run the following in the repo to start the server:

```bash
$ npm start
```

This will start the server on port 3030.

## API functionality

The following API routes are available in v1:

* **GET /api/v1/quotes** - Returns all quotes currently in the database.
* **GET /api/v1/quotes/$id** - Returns a quote with a specific ID number. Throws status code 400 if not valid or does not exist.
* **GET /api/v1/quotes/random** - Returns a random quote from the database.

* **GET /api/v1/puzzle** - Returns a randomly selected, randomly shuffled cryptogram puzzle.
  * **PARAM: numHints** - Indicates the number of hints to give. Values less than zero are treated as zero, values greater than the number of unique letters in the puzzle are treated as the maximum (i.e. reveals entire puzzle). Non numeric values result in 400 code. Default: 2
  * **PARAM: useRotate** - Indicates whether or not the puzzle should use a rotated (i.e. Caesar) cipher rather than randomly shuffling the letters (thus making the puzzle easier). Accepts true or false only. Default: false
* **POST /api/v1/puzzle/validate** - Checks your solution against the database to verify whether or not your solution is correct. The request body must be JSON and contain two parameters:
  * **puzzle_guess** - The player's solution.
  * **puzzle_id** - The ID of the puzzle in the database to be checked.

  The POST request will return a 200 with a JSON body containing a single boolean, puzzle_solved. The request returns a 400 if the request is malformed.

## Data schema
* A GET request to the **quote** route will return a JSON object containing:
  * quote_id
  * quote
  * source_url
  * author_id
  * author_name
  * contributor_id
  * contributor_name
  * contributor_email
* A GET request to the **puzzle** route will return a JSON object containing:
  * id
  * puzzle
  * hints - a JSON object with *keys* representing the shuffled letters and *values* representing solution letters.
