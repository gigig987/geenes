var dd = require('./design-document');
var dna = require('./dna');
var geenes = require('./libraries');

// Create the specimens
class Project {

  constructor(name, m, userId, num) {
    this.projectName = name; //project name
    this.userId = userId; // the owner of the project 
    this.mutationRate = m; // Mutation rate
    this.specimens = [];  // array to hold the current specimens
    this.matingPool = [];
    this.generation = 0;  // current generation
    this.generations = []; // array containing all the generations so far created
    for (var i = 0; i < num; i++) {
      this.specimens[i] = new dd.designDocument(new dna.DNA());
    }
  }




create() {
   for (var i = 0; i < this.specimens.length; i++) {
    this.specimens[i].create();
    this.generations[0]= (this.specimens);
  }
  return this.specimens;
}

// Generate a mating pool
selection() {
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
reproduction() {
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
    this.specimens[i] = new Face(child, 50 + i * 75, 60);
  }
  this.generations++;
}

getGenerations() {
  return this.generations;
}

// Find highest fitness for the specimens
getMaxFitness () {
  var record = 0;
  for (var i = 0; i < this.specimens.length; i++) {
    if (this.specimens[i].getFitness() > record) {
      record = this.specimens[i].getFitness();
    }
  }
  return record;
}
}

exports.project = Project;