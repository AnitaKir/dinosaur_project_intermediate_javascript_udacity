    // Creating a Constructor Function

    function DinosaurConstructor(dinosaurX) {
    
        this.species = dinosaurX.species,
        this.weight = dinosaurX.weight,
        this.height = dinosaurX.height,
        this.diet = dinosaurX.diet,
        this.where = dinosaurX.where,
        this.when = dinosaurX.when,
        this.fact = dinosaurX.fact,
        this.image = "images/" + dinosaurX.species.toLowerCase() + ".png"
    }; 


    // putting dinosaur data (which is an array) into a function (it returns an array)
    

    function dinosaurData() {
        const dinos = [
           
            {
            
                "species": "Triceratops",
                "weight": 13000,
                "height": 114,
                "diet": "herbivore",
                "where": "North America",
                "when": "Late Cretaceous",
                "fact": "First discovered in 1889 by Othniel Charles Marsh"
            },
            {
                "species": "Tyrannosaurus Rex",
                "weight": 11905,
                "height": 144,
                "diet": "carnivore",
                "where": "North America",
                "when": "Late Cretaceous",
                "fact": "The largest known skull measures in at 5 feet long."
            },
            {
                "species": "Anklyosaurus",
                "weight": 10500,
                "height": 55,
                "diet": "herbivore",
                "where": "North America",
                "when": "Late Cretaceous",
                "fact": "Anklyosaurus survived for approximately 135 million years."
            },
            {
                "species": "Brachiosaurus",
                "weight": 70000,
                "height": "372",
                "diet": "herbivore",
                "where": "North America",
                "when": "Late Jurassic",
                "fact": "An asteroid was named 9954 Brachiosaurus in 1991."
            },
            {
                "species": "Stegosaurus",
                "weight": 11600,
                "height": 79,
                "diet": "herbivore",
                "where": "North America, Europe, Asia",
                "when": "Late Jurassic to Early Cretaceous",
                "fact": "The Stegosaurus had between 17 and 22 seperate plates and flat spines."
            },
            {
                "species": "Elasmosaurus",
                "weight": 16000,
                "height": 59,
                "diet": "carnivore",
                "where": "North America",
                "when": "Late Cretaceous",
                "fact": "Elasmosaurus was a marine reptile first discovered in Kansas."
            },
            {
                "species": "Pteranodon",
                "weight": 44,
                "height": 20,
                "diet": "carnivore",
                "where": "North America",
                "when": "Late Cretaceous",
                "fact": "Actually a flying reptile, the Pteranodon is not a dinosaur."
            },
            {
                "species": "Pigeon",
                "weight": 0.5,
                "height": 9,
                "diet": "herbivore",
                "where": "Worldwide",
                "when": "Holocene",
                "fact": "All birds are living dinosaurs."
            }
        ];
        return dinos;
    }

    // mapping a class to a json object --- decided was no needed
    
    //var dinoObjects = dinosaurData().map(x => new DinosaurConstructor(x)) --- decided was no needed

    // creating an object with methods that allows us to compare dinosaurs with the human

    const comparisonMethod={
        compareWeight: function(humanWeight){
          
          if (this.weight>humanWeight){
            return `${this.species} weighed ${this.weight} which is more than you!`;
          } else{
            return `You do not weigh more than ${this.species} `;
          }
        },

        compareHeight: function(humanHeight){
          if (this.height>humanHeight){
            return `${this.species} is ${this.height} which is taller than you!`
          } else{
            return `You are not taller than ${this.species} `
          }
        },
    
        compareDiet: function(humanDiet){
            if (humanDiet === this.diet) {
                return `You are  ${humanDiet} and ${this.species} was too!`;
            } else {
                return `You are  ${humanDiet}, but ${this.species} was a ${this.diet}.`;
            }
    
        }
          
      }

    /// Assign the methods from the comparisonMethod to all objects created
    // with DinosaurConstructor
    DinosaurConstructor.prototype = comparisonMethod;

    // Creates the dinosaur object array by calling constructor, 
    //we also need to have a placeholder for the human
    function createDinosaurArray() {
        const dinosaurs = dinosaurData();
        const dinosaurArray = [];
        dinosaurs.forEach(function (x) {
            dinosaurArray.push(new DinosaurConstructor(x));
        });
        // with the help of .splice, we will insert a placeholder for a human at index 4
        dinosaurArray.splice(4, 0, 'human placeholder');
        return dinosaurArray;
    }

    /* Creates a grid element for a dinosaur object
        dinosaurX  - to represent a single dinosaur;
        humanData - getting human's data from the form  */
     function createDinosaurElement(dinosaurX, humanData) {
        let factor;
        /* pigeon will always have the same fact, the fact for the dinosaur will be randomly chosen*/
        
        const randomNumber = dinosaurX.species === 'Pigeon' ? 0 : Math.round(Math.random() * 5);
    
        switch (randomNumber) {
            case 0:
                factor = dinosaurX.fact;
                break;
            case 1:
                factor = `The ${dinosaurX.species} lived in the ${dinosaurX.when} period.`;
                break;
            case 2:
                factor = `The ${dinosaurX.species} lived in ${dinosaurX.where}.`;
                break;
            case 3:
                factor = dinosaurX.compareWeight(humanData.weight);
                break;
            case 4:
                factor = dinosaurX.compareHeight(humanData.height);
                break;
            case 5:
                factor = dinosaurX.compareDiet(humanData.diet);
                break;
            default:
                factor = 'It would be cool if dinosaurs were still alive!';
        }
        // Creating the new grid/element with a few facts
        const newDiv = document.createElement('div');
        newDiv.className = 'grid-item';
        newDiv.innerHTML = `<h3>${dinosaurX.species}</h3><img src="images/${(dinosaurX.species.toLowerCase())}.png" alt="image of ${dinosaurX.species}"><p>${factor}</p>`;
        return newDiv;
    }

    // Create Human Object
    // Use IIFE to get human data from form


    function getHumanData() {
        const humanData = {
            name: document.getElementById('name').value,
            height: (document.getElementById('feet').value * 12) + Number(document.getElementById('inches').value),
            weight: Number(document.getElementById('weight').value),
            diet: document.getElementById('diet').value
        }
        //console.log(humanData)
        return humanData; 

      }

    // Creating a grid element for the human object from the data from the input form
    function createHumanElement(humanData) {
        const newDiv = document.createElement('div');
        newDiv.className = 'grid-item';
        newDiv.innerHTML = `<h3>${humanData.name}</h3><img src="images/human.png" alt="image of human">`;
        return newDiv;
    }

 // Creating the final grid (dinosaurs + human + pigeon)

    function updateGrid(dinosaurArray, humanData) {
        document.querySelector('form').style.display = 'none';
        // where to attach the elements to
        const item = document.createDocumentFragment();
        // Call to create the dinosaurs and human elements
        for (let i = 0; i < dinosaurArray.length; i++) {
            // human in the middle
            let gridSquare = i === 4 ? createHumanElement(humanData) : createDinosaurElement(dinosaurArray[i], humanData);
            item.appendChild(gridSquare);
        }
        // Attach item with grid elements to the DOM
        document.getElementById('grid').appendChild(item);
        
    }

    function clicking(y) {
        // Prevent default page reloading on submit
        y.preventDefault();
        const humanData = getHumanData();
        
        const dinosaurArray = createDinosaurArray(humanData);
        updateGrid(dinosaurArray, humanData);
    }

// On button click, prepare and display infographic

    (function () {
        document.getElementById('btn').addEventListener('click', clicking);
        
    })();




    // form & infographic - file:///C:/Users/AnitaKiricenko/Documents/diply/javascript/Javascript/index.html
