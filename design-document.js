
  function designDocument(dna_) {

      this.dna = dna_; // all genes in DNA
      this.fitness = 1; // How good is this design document?
      this.design = [] // an array containing all the design rules

  this.create = function() {
      var genes = this.dna.genes; // array listing all the genes necessary to build a specimen

      //here I select, based on random genes, the basic rules of the design document
      var baseFontSize = geenes.common.randomElement(geenes.typography.baseFontSizes, genes[0] );
      var baselineM = geenes.common.randomElement(geenes.typography.baseLineM, genes[1] );   
      var typeScaleRatio = geenes.common.randomElement(geenes.typography.typeScales, genes[2] );

      var TypeSettings = geenes.typography.typeSettings(baseFontSize, typeScaleRatio, baselineM , 0);

      this.design = TypeSettings ;
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
