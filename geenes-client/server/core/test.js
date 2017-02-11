'use strict';

var dd = require('./design-document');
var dna = require('./dna');
var geenes = require('./libraries');

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

function createGenes(n){
    this.genes = new Array(n);
      for (var i = 0; i < this.genes.length; i++) {
        this.genes[i] = Math.random(0,1);
      }
    return this.genes
}

exports.createGenes = createGenes;