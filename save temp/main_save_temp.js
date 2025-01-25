let allPokeData = [];
let morePokemonData = []
let maxDisplayedCount = 20;
let maxTotalPokemonCount = 40;
//let currentDisplayedId = null;
let colors = {
    fire: '#F08030',
    water: '#6890F0',
    grass: '#78C850',
    electric: '#F8D030',
    ice: '#98D8D8',
    fighting: '#C03028',
    poison: '#A040A0',
    ground: '#E0C068',
    flying: '#A890F0',
    psychic: '#F85888',
    bug: '#A8B820',
    rock: '#B8A038',
    ghost: '#705898',
    dragon: '#7038F8',
    dark: '#705848',
    steel: '#B8B8D0',
    fairy: '#F0B6BC',
    normal: '#A8A878',
};


function init() {

    const showPokeHideLoader = async () => {
        await fetchAllPokeData();
        hideLoadingScreen();
    }
    showPokeHideLoader();
}

function hideLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        loadingScreen.classList.add('d-none');
        loadingScreen.remove();
    }
}

async function fetchAllPokeData() {
    try {
        let response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${maxTotalPokemonCount}&offset=0`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        allPokeData = await response.json();
        getPokeResultArray();

    } catch (error) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
}

async function getPokeResultArray() {
    let results = allPokeData.results;

    for (let i = 0; i < results.length; i++) {
        try {
            let resultsUrl = results[i].url;
            let pokemonName = results[i].name;
            let response = await fetch(resultsUrl);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            getPokeData(resultsUrl, pokemonName, i);

        } catch (error) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
    }
}

async function getPokeData(resultsUrl, pokemonName, index) {
    let response = await fetch(resultsUrl);
    let pokemonData = await response.json();

    if (index < maxDisplayedCount) {
        pokemonName;
        let pokeID = pokemonData.id;
        let pokeImage = pokemonData.sprites.other.home.front_default;
        let pokeTypes = getPokeTypes(pokemonData);
        let firstType = pokemonData.types[0].type.name
        let backgroundColor = getTypeColor(firstType);

        renderPokeCards(pokemonName, pokeID, pokeTypes, pokeImage, backgroundColor);
    }
}

function getPokeTypes(pokemonData) {
    let typeInfo = pokemonData.types;

    return typeInfo.map(TypeInfoElement => {
        return `<span class="type ${TypeInfoElement.type.name}"  style="background-color: ${getTypeColor(TypeInfoElement.type.name)};"> ${TypeInfoElement.type.name}</span>`;
    }).join('  ');

}

function getTypeColor(type) {
    return colors[type] || '#FFFFFF';
}

function renderPokeCards(pokemonName, pokeID, pokeTypes, pokeImage) {
    let container = document.getElementById('pokemon-container');
    container.innerHTML += renderPokeCardHTML(pokeID, pokemonName, pokeImage, pokeTypes);

}




 async function openDialog(id, pokemonName, pokeImg, pokeHeight, pokeWeight, pokeBaseExperience) {
    //console.log('openDialog has been called');
    let dialogBox = document.getElementById('dialogBox');
    await getDialogData(id, pokemonName, pokeImg, pokeHeight, pokeWeight, pokeBaseExperience).then(() => {
        dialogBox.innerHTML += renderDialogHTML(id, pokemonName, pokeImg, pokeHeight, pokeWeight, pokeBaseExperience);
        }); 
    

    document.getElementById('dialog').classList.remove('d-none');
    document.getElementById('backdrop').classList.remove('d-none');

}


async function getDialogData(id, pokemonName, pokeImg, pokeHeight, pokeWeight, pokeBaseExperience) {
    currentDisplayedId = id;
   // id = dialogData.id;
    let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    let dialogData = await response.json();
    
    pokemonName = dialogData.name;
    pokeImg = dialogData.sprites.other.home.front_default;
    pokeHeight = dialogData.height;
    pokeWeight = dialogData.weight;
    pokeBaseExperience = dialogData.base_experience;

    //console.log(id, pokemonName, pokeImg, pokeHeight, pokeWeight, pokeBaseExperience);
   
}


function renderDialogHTML(id, pokemonName, pokeImg, pokeHeight, pokeWeight, pokeBaseExperience) {
    return `<div class="dialog  d-none" id="dialog">
    <div class="dialogHeader" id="dialogHeader">
        <button class="prev" onclick="showPrev()"><img src="./img/prev.svg"></button>
        <h5 class="dialogTitle">${id} ${pokemonName}</h5>
        <button class="next" onclick="showNext()"><img src="./img/next.svg"></button>
    </div>
    <div class="dialogBody">
        <div class="dialogImg">${pokeImg}  <img src="./img/..."></div>
        <div class="dialogInfo">
            <p>${pokeHeight}<br>
            ${pokeWeight}<br>
            ${pokeBaseExperience}</p>
            </p>
        </div>
        
    </div>
    <button class="closeDialog" onclick="closeDialog()"><img src="./img/close.svg"></button>
</div>`

}





function closeDialog() {
    let dialog = document.getElementById('dialog');
    let backdrop = document.getElementById('backdrop');

    if (dialog) {
        dialog.classList.add('d-none');
    }
    if (backdrop) {
        backdrop.classList.add('d-none');
    }
}

async function loadMorePokemon() {
    let button = document.getElementById('loadMore');
    button.disabled = true;

    console.log('loadMorePokemon() is called');
    try {
        let response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=${maxDisplayedCount}`); // fetch pokemons with an offset of the already displayed amount
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        morePokemonData = await response.json();
        await getMorePokeResults();
        maxDisplayedCount += morePokemonData.results.length;
    } catch (error) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    button.disabled = false;
}


async function getMorePokeResults() {
    console.log('getMorePokeResults() is called');
    let moreResults = morePokemonData.results;

    for (let i = 0; i < moreResults.length; i++) {
        try {
            let resultsUrl = moreResults[i].url;
            let pokemonName = moreResults[i].name;
            let response = await fetch(resultsUrl);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            getPokeData(resultsUrl, pokemonName, i);
            console.log('fetch has worked');
        } catch (error) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
    }
}



/*length can only be read of an array, allPokeData is an object and not an array*/

/*
1.  Define the problem:
    Before you start writing a function, clearly define the problem you're trying to solve.
    What is the function supposed to do? What inputs will it take, and what outputs will it produce?
2.  Identify the inputs and outputs:
    Determine what data the function will need to operate on (inputs) and what data it will produce (outputs).
    This will help you decide what parameters to pass to the function and what data to return.
3.  Break down the problem:
    Break down the problem into smaller, manageable tasks.
    This will help you identify the individual steps the function needs to perform.
4.  Choose a starting point:
    You don't always need to start by declaring a variable.
    You can start with a loop, a conditional statement, or even a function call. The key is to start with the most logical step that solves the problem.
5.  Use a top-down approach:
    Start with the high-level logic of the function and then drill down into the details.
    This will help you ensure that the function is well-structured and easy to understand.
6.  Keep it simple:
    Don't try to do too much in a single function.
    Keep the function focused on a specific task, and break it down into smaller functions if necessary.
7.  Use meaningful variable names:
    Choose variable names that clearly indicate what the variable represents.
    This will make your code easier to understand and maintain.
8.  Test and iterate:
    Test your function with different inputs and edge cases.
    Iterate on the function until it produces the desired output.

*/

/*
1.  Single Responsibility Principle (SRP):
    Each function should have a single responsibility and should not be responsible for multiple, unrelated tasks.
    This means that a function should do one thing and do it well.
2.  Separation of Concerns (SoC):
    Break down your code into smaller functions, each responsible for a specific concern or task.
    This makes your code more modular, reusable, and easier to maintain.
3.  Function Hierarchy:
    Think of your functions as a hierarchy, where higher-level functions call lower-level functions to perform specific tasks.
    This helps to organize your code and make it more readable.
4.  Data Flow:
    Consider the flow of data through your functions.
    Which functions need to access or modify specific data? This can help you decide which functions should call others.
5.  Readability and Maintainability:
    Consider how easy it is to read and understand your code.
    If a function is doing too much, it may be harder to understand and maintain.




*/