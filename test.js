'use strict';

const express = require('express');
const request = require('supertest');

const expressJare = require('.');

const app = express();

const imgTag = '<img src="http://123.dev/456.png" alt="testing image" />';

app.use(expressJare);
app.get('/html', (req, res) => {
  res.send(imgTag);
});
app.get('/text', (req, res) => {
  res.set('Content-Type', 'text/plain');
  res.send(imgTag);
});

describe('express-jare', _ => {
  it('should intercept html\'s img tags', function (done) {
    request(app)
      .get('/html')
      .expect('<img src="http://cf.jare.io/?u=http%3A%2F%2F123.dev%2F456.png" alt="testing image">')
      .expect(200, done);
  });
  it('should NOT intercept text/plain content-type', function (done) {
    request(app)
      .get('/text')
      .expect(imgTag)
      .expect(200, done);
  });
});
