'use strict';

var dd = require('./design-document');
var dna = require('./dna');
var geenes = require('./libraries');
var htmlparser = require("htmlparser2");

/**
 * Module variables.
 * @private
 */

var specimens = []; // array containing the specimens

/**
 * Module functions.
 * @public
 */

function firstGeneration(n) {

  for (var i = 0; i < n; i++) {
    specimens[i] = new dd.designDocument(new dna.DNA());
  }

  return specimens;
}
exports.firstGeneration = firstGeneration;

function createGenes(n) {
  this.genes = new Array(n);
  for (var i = 0; i < this.genes.length; i++) {
    this.genes[i] = Math.random(0, 1);
  }
  return this.genes
}

exports.createGenes = createGenes;

function createDesign(genes) {

  //here I select, based on random genes, the basic rules of the design document
  var constrastIndex = genes[0];
  var baseFontSize = geenes.common.randomElement(geenes.typography.baseFontSizes, genes[1]);
  var baselineM = geenes.common.randomElement(geenes.typography.baseLineM, genes[2]);
  var typeScaleRatio = geenes.common.randomElement(geenes.typography.typeScales, genes[3]);

  var baseFontWeight = geenes.common.randomElement(geenes.typography.fontWeights, genes[4]);
  var fontWeightContrast = geenes.common.randomElement(geenes.typography.fontWeights, Math.abs((genes[4] - 1)));

  // console.log( "g4:"+ genes[4] +" 1-g4:"+ Math.abs((genes[4] -1))) ;
  //console.log( Math.abs(1 - (typeScaleRatio -1)) * (genes[4] - genes[5]));



  //Here each style is filled with the proper css rules
  var tBody = geenes.typography.typeSettings(baseFontSize, typeScaleRatio, baselineM, 0, baseFontWeight);
  var tH2 = geenes.typography.typeSettings(baseFontSize, typeScaleRatio, baselineM, 1, fontWeightContrast);
  var tH1 = geenes.typography.typeSettings(baseFontSize, typeScaleRatio, baselineM, 2, fontWeightContrast);
  var tSmall = geenes.typography.typeSettings(baseFontSize, typeScaleRatio, baselineM, -1, baseFontWeight);
  //REACTIVATE WHEN GET DESIGN RULES FUNCTION IS CREATED
  this.design = { "paragraph": tBody, "heading-1": tH1, "heading-2": tH2, "small": tSmall };
  return this.design;
}
exports.createDesign = createDesign;
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
  var i = 0;

if (genesArray.constructor === Array){
  genesArray.forEach(function(genes) {
   constrastIndex = genes[0];
   baseFontSize = geenes.common.randomElement(geenes.typography.baseFontSizes, genes[1]);
   baselineM = geenes.common.randomElement(geenes.typography.baseLineM, genes[2]);
   typeScaleRatio = geenes.common.randomElement(geenes.typography.typeScales, genes[3]);

   baseFontWeight = geenes.common.randomElement(geenes.typography.fontWeights, genes[4]);
   fontWeightContrast = geenes.common.randomElement(geenes.typography.fontWeights, Math.abs((genes[4] - 1)));
   result[i] = {};
    var parser = new htmlparser.Parser({
    onopentag: function (name, attribs) {
      if (name === "p") {
         var p = geenes.typography.typeSettings(0, baseFontSize, typeScaleRatio, baselineM, baseFontWeight);
            result[i].p = p;
      }
      if (name === "h1") {
         var h1 = geenes.typography.typeSettings(3, baseFontSize, typeScaleRatio, baselineM, fontWeightContrast);
            result[i].h1 = h1;
      }
    },
  }, { decodeEntities: true });
  parser.write(template);
  parser.end();

  i++;
  }, this);
}
  
 console.log(result);
  return result;
}

exports.styleFromTemplateString = styleFromTemplateString;
