

function renderPokeCardHTML(id, pokemonName, pokeImg, pokeTypes, pokeHeight, pokeWeight, pokeBaseExperience) {
    return ` 
    <div class="pokemon-card" onclick="openDialog(id, pokemonName, pokeImg, pokeHeight, pokeWeight, pokeBaseExperience)">
            <span class="pokeIdName">No.${id} ${pokemonName}</span>
            <img src="${pokeImg}" alt="${pokemonName}"/>
            <div class="card-footer">
                <p>${pokeTypes}</p>
            </div>
            </div>
        `;

}


  