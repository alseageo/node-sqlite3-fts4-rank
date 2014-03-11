# Full Text Search Ranking Function SQLite Extension

There is a wonderful [example of a rank extension](http://www.sqlite.org/fts3.html#appendix_a) provided in the sqlite3 documentation for full-text search, this NPM module is a shim that uses node-gyp to build the extension and provides a way to include it to a sqlite instance.

The example requires building an extension which is not explicitly detailed in the example. This repository is for the sole purpose of building the un-adulterated* example from the docs.

Note: *There were a few typos / errors in the example function. They have been corrected to behave as documented.

## Usage

First, install the module via `npm install sqlite3-fts4-rank`, then you can attach the extension to a sqlite connection.

```js
var sqlite3 = require('sqlite3');

var db = new sqlite3.Database(':memory:')
require('sqlite3-fts4-rank')(db);

// Do stuff with the new rank UDF!
var sql = "SELECT docid, rank(matchinfo(documents)) AS rank " +
  "FROM documents " +
  "WHERE documents MATCH '\"serious mail\"' " + 
  "ORDER BY rank DESC  " +
  " LIMIT 10 OFFSET 0;"
db.each(sql, function(err, row) {
  console.log(row.id + ": " + row.info);
});
```

## See Also

  * <https://github.com/zhm/node-spatialite> - Used as an example of building a sqlite3 extension
  * <http://n8.io/converting-a-c-library-to-gyp> - A post by TooTallNate on building gyp extensions
  * <http://www.sqlite.org/cvstrac/wiki?p=LoadableExtensions>
  * <http://www.mail-archive.com/sqlite-users@sqlite.org/msg71730.html>
  * <http://www.sqlite.org/c3ref/create_function.html>
  * <http://www.sqlite.org/fts3.html#appendix_a>
  * <http://www.sqlite.org/c3ref/load_extension.html>
