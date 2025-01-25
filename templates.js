

function renderPokeCardHTML(index) {
    let pkm = allPokeDetailsData[index];
    let pokeName = capitalizeFirstLetter(pkm.name);
    return ` 
    <div class="pokemon-card" onclick="openDialog(${index})">
            <span class="pokeIdName">No.${pkm.id} ${pokeName}</span>
            <img src="${pkm.sprites.other.home.front_default}"/>
            <div class="card-footer">
                <p>${getPokeTypes(pkm)}</p>
            </div>
            </div>
        `;

}

function renderDialogHTML(index) {
    let pkm = allPokeDetailsData[index];
    let pokeName = capitalizeFirstLetter(pkm.name);
    return `<div class="dialog  d-none" id="dialog">
    <div class="dialogHeader" id="dialogHeader">
        <button class="prev" onclick="showPrev(${index})"><img src="./img/prev.svg"></button>
        <h5 class="dialogTitle">No. ${pkm.id} ${pokeName}</h5><br>
        
        <button class="next" onclick="showNext(${index})"><img src="./img/next.svg"></button>
    </div>
    <div class="dialogBody">
        <div class="dialogImg"><img src="${pkm.sprites.other.home.front_default}"></div>
        <div class="dialogInfo">
            <p> ${getPokeTypes(pkm)}</p>
            <p>Height: ${pkm.height}<br>
            Weight: ${pkm.weight}<br>
            Base Experience: ${pkm.base_experience}</p>
            </p>
        </div>
        
    </div>
    <button class="closeDialog" onclick="closeDialog()"><img src="./img/close.svg"></button>
</div>`

}

function renderFilteredPokemonsHTML(index, filteredPokemons) {
    let filteredPkm = filteredPokemons[index];
    let filteredPkmName = capitalizeFirstLetter(filteredPkm.name);
    return ` 
    <div class="pokemon-card" onclick="openDialog(${index})">
            <span class="pokeIdName">No.${filteredPkm.id} ${filteredPkmName}</span>
            <img src="${filteredPkm.sprites.other.home.front_default}"/>
            <div class="card-footer">
                <p>${getPokeTypes(filteredPkm)}</p>
            </div>
            </div>
        `;

}
