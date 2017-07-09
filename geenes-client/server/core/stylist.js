'use strict';

var dd = require('./design-document');
var dna = require('./dna');
var geenes = require('./libraries');
var htmlparser = require("htmlparser2");
var cheerio = require('cheerio');

function getRandomGoogleFont(){
  return geenes.typography.getRandomGoogleFont();
}

exports.getRandomGoogleFont = getRandomGoogleFont;
// template is a string to be parsed
//geenesArray is an Array<geenes>
function style(genesArray) {

  var result = {};
  var constrastIndex;
  var baseFontSize;
  var baselineM;
  var typeScaleRatio;

  var baseFontWeight;
  var fontWeightContrast;
  var fontCategory;
  var fontFamilyHeading;
  var contrastPriority = [];
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
      fontCategory = geenes.common.randomElement(geenes.typography.fontCategories, genes[5]);
      let fontSelection = geenes.typography.getGoogleFontSelection(fontCategory);
      fontFamilyHeading = geenes.common.randomElement(fontSelection, genes[6]);

      contrastPriority = geenes.typography.randomContrastPriority(genes[10]);

      result[i] = { 'index': constrastIndex,
                    'base-font-size': baseFontSize, 
                    'baseline-multiplier': baselineM, 
                    'type-scale': typeScaleRatio,
                    'font-category':fontCategory,
                    'font-family-H': fontFamilyHeading,
                    'contrast-priority': contrastPriority   }
      i++
    }, this);
  }

  //  console.log(result);
  return result;
}

exports.style = style;

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
