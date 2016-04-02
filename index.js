'use strict';

const jare = require('jare');
const interceptor = require('express-interceptor');
const cheerio = require('cheerio');

const jareInterceptor = interceptor(function(req, res){
  return {
    isInterceptable: function(){
      return /text\/html/.test(res.get('Content-Type'));
    },
    intercept: function(body, send) {
      var $= cheerio.load(body);

      $('img').each((index, img) => {
        const originSrc = $(img).attr('src');
        $(img).attr('src', jare(originSrc));
      });
      send($.html());
    }
  };
});

module.exports = jareInterceptor;
