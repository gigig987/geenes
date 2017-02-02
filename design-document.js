var geenes = require('./libraries/libraries.js');

  exports.designDocument = function(dna_) {

      this.dna = dna_; // all genes in DNA
      this.fitness = 1; // How good is this design document?
      this.design = {} // an object containing all the design rules

  this.create = function() {
      var genes = this.dna.genes; // array listing all the genes necessary to build a specimen

      //here I select, based on random genes, the basic rules of the design document
      var constrastIndex = genes[0];
      var baseFontSize = geenes.common.randomElement(geenes.typography.baseFontSizes, genes[1] );
      var baselineM = geenes.common.randomElement(geenes.typography.baseLineM, genes[2] );   
      var typeScaleRatio = geenes.common.randomElement(geenes.typography.typeScales, genes[3] );
      
      var baseFontWeight = geenes.common.randomElement(geenes.typography.fontWeights, genes[4] );
      var fontWeightContrast = geenes.common.randomElement(geenes.typography.fontWeights, Math.abs((genes[4] -1)));

      console.log( "g4:"+ genes[4] +" 1-g4:"+ Math.abs((genes[4] -1))) ;
      //console.log( Math.abs(1 - (typeScaleRatio -1)) * (genes[4] - genes[5]));



      //Here each style is filled with the proper bho
      var tBody = geenes.typography.typeSettings(baseFontSize, typeScaleRatio, baselineM , 0,baseFontWeight);
      var tH2 = geenes.typography.typeSettings(baseFontSize, typeScaleRatio, baselineM , 1,fontWeightContrast);
      var tH1 = geenes.typography.typeSettings(baseFontSize, typeScaleRatio, baselineM , 2,fontWeightContrast);
      var tSmall = geenes.typography.typeSettings(baseFontSize, typeScaleRatio, baselineM , -1,baseFontWeight);

      this.design = {"paragraph": tBody, "heading-1": tH1, "heading-2": tH2, "small": tSmall} ;
  }

  this.getFitness = function() {
    return this.fitness;
  }

  this.getDNA = function() {
    return this.dna;
  }

  // Increment fitness if mouse is rolling over face
  this.rollover = function(mx, my) {
    if (this.r.contains(mx, my)) {
      this.rolloverOn = true;
      this.fitness += 0.25;
    } else {
      this.rolloverOn = false;
    }
  }
}
