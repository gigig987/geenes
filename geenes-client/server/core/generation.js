'use strict';

var dd = require('./design-document');
var dna = require('./dna');
var geenes = require('./libraries');
var htmlparser = require("htmlparser2");
var cheerio = require('cheerio');

/**
 * Module variables.
 * @private
 */

var specimens = []; // array containing the specimens
var matingPool = [];

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

// Generate a mating pool
function selection() {
  // Clear the ArrayList
  matingPool = [];

  // Calculate total fitness of whole specimens
  let maxFitness = getMaxFitness();

  // Calculate fitness for each member of the specimens (scaled to value between 0 and 1)
  // Based on fitness, each member will get added to the mating pool a certain number of times
  // A higher fitness = more entries to mating pool = more likely to be picked as a parent
  // A lower fitness = fewer entries to mating pool = less likely to be picked as a parent
  for (var i = 0; i < specimens.length; i++) {
    var fitnessNormal = map_range(specimens[i].fitness, 0, maxFitness, 0, 1);
    var n = Math.floor(fitnessNormal * 100);  // Arbitrary multiplier

    for (var j = 0; j < n; j++) {
      matingPool.push(specimens[i]);
    }
  }
  // return matingPool;
}
 exports.selection = selection; 

  // Find highest fitness for the specimens
  function getMaxFitness() {
    var record = 0;
    for (var i = 0; i < specimens.length; i++) {
      if (specimens[i].fitness > record) {
        record = specimens[i].fitness;
      }
    }
    return record;
    
  }
 exports.getMaxFitness = getMaxFitness;

 // Making the next generation
function reproduction() {
      console.log(specimens[1].dna.genes);
          var newSpecimens = new Array(specimens.length);
  // Refill the specimens with children from the mating pool
  for (var i = 0; i < specimens.length; i++) {
    // Sping the wheel of fortune to pick two parents
    var m =  Math.floor(Math.random() * matingPool.length);
    var d = Math.floor(Math.random() * matingPool.length);
    // Pick two parents
    var mom = matingPool[m];
    var dad = matingPool[d];
    // Get their genes
    var momgenes = mom.dna.genes;
    var dadgenes = dad.dna.genes;
    // Mate their genes
    var child = crossover(momgenes, dadgenes);
    // Mutate their genes
    child = mutate(0.1, child);
    // Fill the new specimens with the new child
    newSpecimens[i]= child ;
  }
      console.log(newSpecimens);
  return newSpecimens;
}

 exports.reproduction = reproduction;

 function setSpecimens(s){
    specimens = s;
   
 }

 exports.setSpecimens = setSpecimens;

   // Crossover
  // Creates new DNA sequence from two (this & 
  function crossover(mom, dad) {
    var child = new Array(mom.length);
    var crossover = Math.floor(Math.random() * mom.length);
    for (var i = 0; i < mom.length; i++) {
      if (i > crossover) child[i] = mom[i];
      else               child[i] = dad[i];
    }
    return child;
  }
  
  // Based on a mutation probability, picks a new Math.random character in array spots
  function mutate(m, genes) {
    for (var i = 0; i < genes.length; i++) {
      if (Math.random(1) < m) {
         genes[i] = Math.random();
      }
    }
    return genes;
  }


 function map_range(value, low1, high1, low2, high2) {
    return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
} 