let weaknessField = document.getElementById('weakness-field');
let immuneField = document.getElementById('immune-field');
let instrField = document.getElementById('instruction-field');

let defendingPokemonType;

// The Pokemon 
const typeChart = {
    Normal:{
        Fighting: 2,
        Ghost: 0,
    },
    Fire:{
        Water:2, Ground:2, Rock:2,
        Fire:0.5, Grass:0.5, Ice:0.5, Bug:0.5, Steel:0.5, Fairy:0.5
    },
    Water:{
        Electric:2, Grass:2,
        Fire:0.5, Water:0.5, Ice:0.5, Steel:0.5,
    },
    Electric:{
        Ground:2,
        Electric:0.5, Flying:0.5, Steel:0.5
    },
    Grass:{
        Fire:2,Ice:2,Poison:2,Flying:2,Bug:2,
        Water:0.5,Electric:0.5,Grass:0.5,Ground:0.5
    },
    Ice:{
        Fire:2,Fighting:2,Rock:2,Steel:2,
        Ice:0.5
    },
    Fighting:{
        Flying:2,Psychic:2,Fairy:2,
        Bug:0.5,Rock:0.5,Dark:0.5
    },
    Poison:{
        Ground:2,Psychic:2,
        Grass:0.5, Fighting:0.5, Poison:0.5, Bug:0.5, Fairy:0.5 
    },
    Ground:{
        Water:2, Grass:2, Ice:2,
        Poison:0.5, Rock:0.5, 
        Electric:0
    },
    Flying:{
        Electric:2,Ice:2,Rock:2,
        Grass:0.5, Fighting:0.5, Bug:0.5,
        Ground:0
    },
    Psychic:{
        Bug:2, Ghost:2, Dark:2,
        Fighting:0.5, Psychic:0.5
    },
    Bug:{
        Fire:2, Flying:2, Rock:2,
        Grass:0.5, Fighting:0.5, Ground:0.5 
    },
    Rock:{
        Water:2, Grass:2, Fighting:2, Ground:2, Steel:2,
        Normal:0.5, Fire:0.5, Poison:0.5, Flying:0.5
    },
    Ghost:{
        Ghost:2, Dark:2,
        Poison:0.5, Bug:0.5,
        Normal:0, Fighting:0
    },
    Dragon:{
        Ice:2, Dragon:2, Dark:2,
        Fire:0.5, Water:0.5, Electric:0.5, Grass:0.5
    },
    Dark:{
        Fighting:2, Bug:2, Fairy:2,
        Ghost:0.5, Dark:0.5,
        Psychic:0
    },
    Steel:{
        Water:2, Fighting:2, Ground:2,
        Normal:0.5, Grass:0.5, Ice:0.5, Flying:0.5, Psychic:0.5, Bug:0.5, Rock:0.5, Dragon:0.5, Steel:0.5, Fairy:0.5,
        Poison:0
    },
    Fairy:{
        Poison:2,Steel:2,
        Fighting:0.5, Bug:0.5, Dark:0.5,
        Dragon:0
    }

};

//Adds event listeners to specified radio elements
function addRadioEventListeners(id){
    //Grabbing all the radio elements
    const radio = document.querySelectorAll(`input[type="radio"][name=${id}]`);

    //Adding event listener to each of the radio elements 
    radio.forEach(radio => {
        radio.addEventListener('change', (event) => {
            addSelection(event);
        });
        radio.checked = false
    });
}

//Obtain the selection
function addSelection (e){
    const selection = e.target;
    if (selection.name === "defending-pokemon-type"){
        defendingPokemonType = selection.value;
        getTypeAdvantage(defendingPokemonType);
    }
    else {
        alert("ERROR: " + selection.name);
        return;
    }
}

//Get effectiveness of the selection
function getTypeAdvantage(defendingPokemonType){

    //Base case: missing one or both types
    if(defendingPokemonType === null || defendingPokemonType === undefined){
        return;
    } 
    else { 
        weaknessField.textContent = '';
        immuneField.textContent = '';
        immuneField.style.textAlign = 'left'
        instrField.textContent = '';
    
        for (const [type, effectiveness] of Object.entries(typeChart[defendingPokemonType])){
            // 2 = weak to
            // 0.5 = not weak to
            // 0 = immuned to

            // has weakness to
            if (effectiveness >= 2){
                const typeIcon = document.createElement('img');
                typeIcon.src="icons/" + type.toLowerCase() + ".svg";
                typeIcon.style.width = "25px";
                typeIcon.style.display = "inline-block";
                const typeText = document.createTextNode(` ${type}\n`); // Add space before text
                const liEl = document.createElement('li');
                liEl.style.margin = "5px auto";
                liEl.style.width = "60%";
                liEl.append(typeIcon, typeText);
                weaknessField.appendChild(liEl);
            }
            // has immunity to
            else if (effectiveness === 0){
                const typeIcon = document.createElement('img');
                typeIcon.src="icons/" + type.toLowerCase() + ".svg";
                typeIcon.style.width = "25px";
                typeIcon.style.display = "inline-block";
                const typeText = document.createTextNode(` ${type}\n`); // Add space before text
                const liEl = document.createElement('li');
                liEl.style.margin = "5px auto";
                liEl.style.width = "60%";
                liEl.append(typeIcon, typeText);
                immuneField.appendChild(liEl);
            }
        }
        if (immuneField.textContent === ''){
            immuneField.textContent='None';
            immuneField.style.textAlign="center";
        }
    }

}

window.onload = function(){
    //Adding event listener to the radio elements
    addRadioEventListeners("defending-pokemon-type");
}