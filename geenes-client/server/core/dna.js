// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Interactive Selection
// http://www.genarts.com/karl/papers/siggraph91.html

  //Constructor (makes a Math.random DNA)
  exports.DNA = function(newgenes) {
    // DNA is Math.random floating point values between 0 and 1 (!!)
    // The genetic sequence:
    // * CONTRAST *
    //[0]= general contrast index
    // * SCALE *
    //[1]= base-font-size
    //[2]= base-line-height
    //[3]= type-scale
    // * WEIGHT *
    //[4]= base-font-weight
    // * FAMILY *
    //[5]= first font family 
    //[6]= second font family
    //[7]= third font family

    
    var len = 20;  // Arbitrary length
    if (newgenes) {
      this.genes = newgenes;
    } else {
      this.genes = new Array(len);
      for (var i = 0; i < this.genes.length; i++) {
        this.genes[i] = Math.random(0,1);
      }
    }

  // Crossover
  // Creates new DNA sequence from two (this & 
  this.crossover = function(partner) {
    var child = new Array(this.genes.length);
    var crossover = floor(Math.random(this.genes.length));
    for (var i = 0; i < this.genes.length; i++) {
      if (i > crossover) child[i] = this.genes[i];
      else               child[i] = partner.genes[i];
    }
    var newgenes = new DNA(child);
    return newgenes;
  }
  
  // Based on a mutation probability, picks a new Math.random character in array spots
  this.mutate = function(m) {
    for (var i = 0; i < this.genes.length; i++) {
      if (Math.random(1) < m) {
         this.genes[i] = Math.random(0,1);
      }
    }
  }
}