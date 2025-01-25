let allPokeData = [];
let allPokeDetailsData = [];
let morePokemonData = [];
let maxDisplayedCount = 20;
let maxTotalPokemonCount = 60;
let currentDisplayedId = null;
let currentIndex = null;
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
    eventHandleSearch();
}

function hideLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    if (loadingScreen) {
        loadingScreen.classList.add('d-none');
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
        return allPokeData;

    } catch (error) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
}

async function getPokeResultArray() {
    let results = allPokeData.results;

    for (let i = 0; i < results.length; i++) {
        try {
            let resultsUrl = results[i].url;
            let response = await fetch(resultsUrl);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            await getPokeData(i, resultsUrl);

        } catch (error) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
    }
}

async function getPokeData(index, resultsUrl) {
    let response = await fetch(resultsUrl);
    pokemonData = await response.json();
    allPokeDetailsData.push(pokemonData);

    if (index < maxDisplayedCount) {
        renderPokeCards();
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

function renderPokeCards() {
    let container = document.getElementById('pokemon-container');
    container.innerHTML = ``;
    for (let index = 0; index < allPokeDetailsData.length; index++) {
        if (index < maxDisplayedCount) {
            container.innerHTML += renderPokeCardHTML(index);
        }
    }
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function openDialog(index) {
    let dialogBox = document.getElementById('dialogBox');
    dialogBox.innerHTML = renderDialogHTML(index);
    document.getElementById('dialog').classList.remove('d-none');
    document.getElementById('backdrop').classList.remove('d-none');
}

function showPrev(index) {
    currentIndex = index - 1;
    if (currentIndex >= 0) {
        openDialog(currentIndex);
    } else {
        let newIndex = maxDisplayedCount - 1;
        openDialog(newIndex);
    }
}

function showNext(index) {
    currentIndex = index + 1;
    let maxIndex = maxDisplayedCount - 1;
    if (currentIndex < maxIndex) {
        openDialog(currentIndex);
    } else {
        currentIndex = 0;
        openDialog(currentIndex);

    }

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

function loadMorePokemon() {
    const loadingScreen = document.getElementById('loading-screen');
    loadingScreen.classList.remove('d-none');
    let button = document.getElementById('loadMore');
    button.disabled = true;
    let offset = maxDisplayedCount; //20
    maxDisplayedCount += offset;

    renderPokeCards();

    button.disabled = false;
    setTimeout(() => {
        hideLoadingScreen();
    }, 500);
}

function eventHandleSearch() {
    let searchBar = document.getElementById('searchBar'); 
    searchBar.addEventListener('input', function () { 
        let searchTerm = searchBar.value.toLowerCase();
        filterPokemons(searchTerm);
    });
}

function filterPokemons(searchTerm) {
    handleEmptyInut(searchTerm);
    if (searchTerm.length >= 3) {
        let filteredPokemons = allPokeDetailsData.filter(pokemon => pokemon.name.toLowerCase().includes(searchTerm));
        let container = document.getElementById('pokemon-container');
        container.innerHTML = ``;

        if (filteredPokemons.length === 0) {
            renderNoResults(container);
        } else {
            displayFilteredPokemon(index, filteredPokemons);
        }
        document.getElementById('loadMore').classList.add('d-none');
    }
}

function displayFilteredPokemon(index, filteredPokemons) {
    for (index = 0; index < filteredPokemons.length; index++) {
        if (index < filteredPokemons.length) {
            container.innerHTML += renderFilteredPokemonsHTML(index, filteredPokemons);
        }
    }
}

function handleEmptyInut(searchTerm) {
    if (searchTerm === '') {
        renderPokeCards();
        document.getElementById('loadMore').classList.remove('d-none');
    }
}

function renderNoResults(container) {
    container = document.getElementById('pokemon-container');
    container.innerHTML = `
    <div class="noResults">
        <h3>Sorry, no results found.</h3>
    </div>
    `;
}



