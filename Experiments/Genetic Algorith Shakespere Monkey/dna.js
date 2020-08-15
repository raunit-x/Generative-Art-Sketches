function newChar() {
    let c = floor(random(63, 122));
    if (c === 63) c = 32;
    if (c === 64) c = 46;
    return String.fromCharCode(c);
}

// Constructor (makes a random DNA)
class DNA 
{
    constructor(num) 
    {
        this.genes = new Array(num);
        this.fitness = 0;
        for (let i = 0; i < num; i++)
            this.genes[i] = newChar();
    }
    getPhrase() 
    {
        return this.genes.join("");
    }

    // Fitness function (returns floating point % of "correct" characters)
    calcFitness(target) 
    {
        let score = 0;
        for (let i = 0; i < this.genes.length; i++)
            if (this.genes[i] == target.charAt(i))
                score++;
        this.fitness = score / target.length;
    }

    // Crossover
    crossover(partner) {
        let child = new DNA(this.genes.length);
        let midpoint = floor(random(this.genes.length));
        for (let i = 0; i < this.genes.length; i++)
            child.genes[i] = (i > midpoint) ? this.genes[i] : partner.genes[i];
        return child;
    }

    // Based on a mutation probability, picks a new random character
    mutate(mutationRate) {
        for (let i = 0; i < this.genes.length; i++) {
            if (random(1) < mutationRate) {
                this.genes[i] = newChar();
            }
        }
    }
}