/* jshint expr: true */

var sqlite3 = require('sqlite3');

var async = require('async');
var should = require('should');
var assert = require('assert');

describe('SQLite3 is compiled with FTS enabled', function() {
  var db;

  before(function(done) {
    db = new sqlite3.Database(':memory:', done);
    // bind index:
    require('../index')(db);
  });

  it('should create FTS table', function(done) {
    async.waterfall([
      db.exec.bind(db, 'CREATE VIRTUAL TABLE documents USING fts4(content);'),
      db.exec.bind(db, "INSERT INTO documents(docid, content) VALUES(1, 'This message is a hello world message.');"),
      db.exec.bind(db, "INSERT INTO documents(docid, content) VALUES(2, 'This mail is seen as a more serious mail');"),
      db.all.bind(db, ['SELECT docid, rank(matchinfo(documents)) as rank',
                        'FROM documents',
                        'WHERE documents MATCH \'"serious mail"\'',
                        'ORDER BY rank DESC',
                        'LIMIT 10 OFFSET 0;'].join(' '))
    ], function(e, results) {
      if (e) return done(e);

      results.length.should.equal(1);
      results[0].docid.should.equal(2);
      results[0].rank.should.equal(1);
      done(e);
    });
  });
});
