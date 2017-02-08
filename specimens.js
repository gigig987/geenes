var designDocument = require('./design-document.js');
var dna = require('./dna.js');
var geenes = require('./libraries/libraries.js');

    // Create the specimens
  exports.Specimens = function(name,m, num) {
    this.projectName = name; //project name 
    this.mutationRate = m; // Mutation rate
    this.specimens = [];  // array to hold the current specimens
    this.matingPool = [];
    this.generations = 1;  // Number of generations
    for (var i = 0; i < num; i++) {
      this.specimens[i] = new designDocument.designDocument(new dna.DNA());
    }


  this.create = function() {
    for (var i = 0; i < this.specimens.length; i++) {
      this.specimens[i].create();
    }
    return this.specimens;
  }

  // Generate a mating pool
  this.selection = function() {
    // Clear the ArrayList
    this.matingPool = [];

    // Calculate total fitness of whole specimens
    var maxFitness = this.getMaxFitness();

    // Calculate fitness for each member of the specimens (scaled to value between 0 and 1)
    // Based on fitness, each member will get added to the mating pool a certain number of times
    // A higher fitness = more entries to mating pool = more likely to be picked as a parent
    // A lower fitness = fewer entries to mating pool = less likely to be picked as a parent
    for (var i = 0; i < this.specimens.length; i++) {
      var fitnessNormal = map(this.specimens[i].getFitness(), 0, maxFitness, 0, 1);
      var n = floor(fitnessNormal * 100);  // Arbitrary multiplier

      for (var j = 0; j < n; j++) {
        this.matingPool.push(this.specimens[i]);
      }
    }
  }  

  // Making the next generation
  this.reproduction = function() {
    // Refill the specimens with children from the mating pool
    for (var i = 0; i < this.specimens.length; i++) {
      // Sping the wheel of fortune to pick two parents
      var m = floor(random(this.matingPool.length));
      var d = floor(random(this.matingPool.length));
      // Pick two parents
      var mom = this.matingPool[m];
      var dad = this.matingPool[d];
      // Get their genes
      var momgenes = mom.getDNA();
      var dadgenes = dad.getDNA();
      // Mate their genes
      var child = momgenes.crossover(dadgenes);
      // Mutate their genes
      child.mutate(this.mutationRate);
      // Fill the new specimens with the new child
      this.specimens[i] = new Face(child, 50+i*75, 60);
    }
    this.generations++;
  }

  this.getGenerations = function() {
    return this.generations;
  }

  // Find highest fitness for the specimens
  this.getMaxFitness = function() {
    var record = 0;
    for (var i = 0; i < this.specimens.length; i++) {
      if (this.specimens[i].getFitness() > record) {
        record = this.specimens[i].getFitness();
      }
    }
    return record;
  }
}