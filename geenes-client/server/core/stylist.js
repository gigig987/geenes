'use strict';

var dd = require('./design-document');
var dna = require('./dna');
var geenes = require('./libraries');
var htmlparser = require("htmlparser2");
var cheerio = require('cheerio');

// template is a string to be parsed
//geenesArray is an Array<geenes>
function styleFromTemplateString(template, genesArray) {

  var result = {};
  var constrastIndex;
  var baseFontSize;
  var baselineM;
  var typeScaleRatio;

  var baseFontWeight;
  var fontWeightContrast;
  var constructorFontFamily = [];
  var i = 0;

  if (genesArray.constructor === Array) {
    genesArray.forEach(function (genes) {
      constrastIndex = genes[0];
      baseFontSize = geenes.common.randomElement(geenes.typography.baseFontSizes, genes[1]);
      baselineM = geenes.common.randomElement(geenes.typography.baseLineM, genes[2]);
      typeScaleRatio = geenes.common.randomElement(geenes.typography.typeScales, genes[3]);

      baseFontWeight = geenes.common.randomElement(geenes.typography.fontWeights, genes[4]);
      fontWeightContrast = geenes.common.randomElement(geenes.typography.fontWeights, Math.abs((genes[4] - 1)));

      constructorFontFamily = [genes[5], genes[6], genes[7]];



      result[i] = {};
      var parser = new htmlparser.Parser({
        onopentagname: function (name) {
          if (name === "p") {
            var p = geenes.typography.typeSettings(0, baseFontSize, typeScaleRatio, baselineM, baseFontWeight, constrastIndex, constructorFontFamily);
            result[i].p = p;
          }
          if (name === "h1") {
            var h1 = geenes.typography.typeSettings(3, baseFontSize, typeScaleRatio, baselineM, fontWeightContrast, constrastIndex, constructorFontFamily);
            result[i].h1 = h1;
          }
        },
      }, { decodeEntities: true });
      parser.write(template);
      parser.end();

      i++;
    }, this);
  }

  //  console.log(result);
  return result;
}

exports.styleFromTemplateString = styleFromTemplateString;

function styleFromTemplateStringToHtml(template, genesArray) {

  var result = {};
  var constrastIndex;
  var baseFontSize;
  var baselineM;
  var typeScaleRatio;

  var baseFontWeight;
  var fontWeightContrast;
  var constructorFontFamily = [];
  var i = 0;

  if (genesArray.constructor === Array) {
    genesArray.forEach(function (genes) {
      constrastIndex = genes[0];
      baseFontSize = geenes.common.randomElement(geenes.typography.baseFontSizes, genes[1]);
      baselineM = geenes.common.randomElement(geenes.typography.baseLineM, genes[2]);
      typeScaleRatio = geenes.common.randomElement(geenes.typography.typeScales, genes[3]);

      baseFontWeight = geenes.common.randomElement(geenes.typography.fontWeights, genes[4]);
      fontWeightContrast = geenes.common.randomElement(geenes.typography.fontWeights, Math.abs((genes[4] - 1)));

      constructorFontFamily = genes[5];



      result[i] = {};

      var $ = cheerio.load(template);
      if ($('p')) {
        var obj = geenes.typography.typeSettings(0, baseFontSize, typeScaleRatio, baselineM, baseFontWeight, constrastIndex, constructorFontFamily);
        Object.keys(obj).forEach(function (key) {
          
          $('p').css(key, obj[key]);
          });
        }

      if ($('h1')) {
        var obj = geenes.typography.typeSettings(4, baseFontSize, typeScaleRatio, baselineM, baseFontWeight, constrastIndex, constructorFontFamily);
        Object.keys(obj).forEach(function (key) {
          $('h1').css(key, obj[key]);
          });
        }   

      if ($('h2')) {
        var obj = geenes.typography.typeSettings(3, baseFontSize, typeScaleRatio, baselineM, baseFontWeight, constrastIndex, constructorFontFamily);
        Object.keys(obj).forEach(function (key) {
          $('h2').css(key, obj[key]);
          });
        }   

      if ($('h3')) {
        if($('.text-display-2')){
            var obj = geenes.typography.typeSettings(2.5, baseFontSize, typeScaleRatio, baselineM, fontWeightContrast, constrastIndex, constructorFontFamily);
            Object.keys(obj).forEach(function (key) {
              $('h3.text-display-2').css(key, obj[key]);
            });
        }else{
          var obj = geenes.typography.typeSettings(2, baseFontSize, typeScaleRatio, baselineM, baseFontWeight, constrastIndex, constructorFontFamily);
            Object.keys(obj).forEach(function (key) {
              $('h3').css(key, obj[key]);
            });
        }
      }  

      if ($('h4')) {
        var obj = geenes.typography.typeSettings(1, baseFontSize, typeScaleRatio, baselineM, baseFontWeight, constrastIndex, constructorFontFamily);
        Object.keys(obj).forEach(function (key) {
          $('h4').css(key, obj[key]);
          });
        }  

      if ($('h5')) {
        var obj = geenes.typography.typeSettings(0, baseFontSize, typeScaleRatio, baselineM, baseFontWeight, constrastIndex, constructorFontFamily);
        Object.keys(obj).forEach(function (key) {
          $('h5').css(key, obj[key]);
          });
        }   

      if ($('h6')) {
        var obj = geenes.typography.typeSettings(-1, baseFontSize, typeScaleRatio, baselineM, fontWeightContrast, constrastIndex, constructorFontFamily);
        Object.keys(obj).forEach(function (key) {
          $('h6').css(key, obj[key]);
          });
        }   

    result[i].fonts = geenes.typography.getFontFamily( constrastIndex, constructorFontFamily);    
    result[i].html = $.html();
    i++;
  }, this);
}
return result;
}

exports.styleFromTemplateStringToHtml = styleFromTemplateStringToHtml;
