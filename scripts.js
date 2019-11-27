var lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sed viverra dui, vel interdum magna. Vivamus euismod tempus vestibulum. Nullam fringilla, nulla sit amet facilisis malesuada, nibh felis gravida diam, ac volutpat urna mauris id urna. Proin ullamcorper felis quis venenatis fringilla.";
var mockIngerdients = "<br/><br/><h3>Składniki</h3><ul><li>Marchew</li><li>Marchew</li><li>Marchew</li><li>Marchew</li></ul>"
var mockSteps = "<h3>Sposób przyrządzenia</h3><ol><li>Marchew</li><li>Marchew</li><li>Marchew</li><li>Marchew</li></ol>"

var recipeCards = document.getElementsByClassName("recipe");

var recipes = new Array();


pushInitialRecipes = function() {
    for(var i = 0; i < 2; i++) {
        recipes.push({
            shortDescription: lorem + '..<span class="link">Więcej</span>',
            description: lorem,
            ingridients: ["Marchew", "Marchew", "Marchew"],
            steps: ["Marchew", "Marchew", "Marchew"]
        });
    }
}
pushInitialRecipes();

var generateExpandedDescription = function(id) {
    var rtn = recipes[id].description + "<br/><br/><h3>Składniki</h3><ul><li>";
    rtn += recipes[id].ingridients.join("</li><li>");
    rtn += "</li></ul><h3>Sposób przyrządzenia</h3><ol><li>";
    rtn += recipes[id].steps.join("</li><li>");
    rtn += "</li></ol>";

    return rtn;
}

var collapseRecipe = function (recipe) {
    recipe.addEventListener('click', expandRecipe);
    recipe.removeEventListener('click', collapseRecipeOnEvent);

    recipe.classList.remove("card-tall");

    var recipeId = recipe.id.replace("recipe", "");

    var cardDescription = recipe.querySelector(".card-description p");

    setTimeout(function() { cardDescription.innerHTML = recipes[recipeId].shortDescription; }, 750);
};

var collapseRecipeOnEvent = function(e) {
    e.preventDefault();
    var recipe = e.target.closest(".recipe");
    collapseRecipe(recipe);
};

var expandRecipe = function(e) {
    e.preventDefault();

    var recipe = e.target.closest(".recipe");

    //make sure no other recipe is expanded
    recipeCards = document.getElementsByClassName("recipe");
    Array.from(recipeCards).forEach(function(r) {
        if(r!= recipe) collapseRecipe(r);
    });

    recipe.removeEventListener('click', expandRecipe);
    recipe.addEventListener('click', collapseRecipeOnEvent);

    recipe.classList.add("card-tall");

    var cardDescription = recipe.querySelector(".card-description p");
    var recipeId = recipe.id.replace("recipe", "");

    cardDescription.innerHTML = generateExpandedDescription(recipeId);
};

var registerRecipesForExpansion = function () {
    Array.from(recipeCards).forEach(function(element) {
        element.addEventListener('click', expandRecipe);
    });
};
registerRecipesForExpansion();

var addIngridientInput = function() {
    var ingirdients = document.getElementById("ingridientsInput");

    var li = document.createElement("li");

    var input = document.createElement("input");
    input.type = "text";
    input.classList.add("ingridientInput");
    input.classList.add("dynamically-added");
    input.onchange = addIngridientInput;

    li.appendChild(input);
    ingirdients.appendChild(li);
    input.focus();
};

var addStepInput = function() {
    var ingirdients = document.getElementById("stepsInput");

    var li = document.createElement("li");

    var input = document.createElement("input");
    input.type = "text";
    input.classList.add("stepInput");
    input.classList.add("dynamically-added");
    input.onchange = addStepInput;

    li.appendChild(input);
    ingirdients.appendChild(li);
    input.focus();
};

var addRecipeCard = function (id) {
    var recipe = recipes[id];

    var newCard = `<a id="recipe${id}" class="recipe" href="#">
                        <div class="recipe-card" >
                            <div class="flip-box">
                                <div class="flip-box-inner">
                                    <div class="card-image">
                                        <img src="${recipe.imgSrc}"/>
                                    </div>
                                    <div class="card-image card-image-alt">
                                        <img src="${recipe.altImgSrc}"/>
                                    </div>
                                </div>
                            </div>
                            <div class="card-description">
                                <h3 class="recipe-title">${recipe.title}</h3>
                                <i class="far fa-clock"></i> 45 min. <i class="far fa-user"></i> 4 os.
                                <span onclick="deleteRecipe(${id})" style="cursor: pointer; text-decoration: underline; color: red; margin-left: 10px;">Usuń</span><br>
                                <p>${recipe.shortDescription}</p>
                            </div>
                        </div>
                    </a>`;

    var recipeCardContainer = document.getElementById("recipe-card-container");
    recipeCardContainer.innerHTML += newCard;

    registerRecipesForExpansion();
};

var addRecipe = function () {
    var title = document.getElementById("titleInput").value;
    var description = document.getElementById("descriptionInput").value;
    var imgSrc = document.getElementById("imgSrcInput").value;
    var altImgSrc = document.getElementById("altImgSrcInput").value;

    var ingridients = new Array();
    let listItems = document.querySelectorAll('#ingridientsInput li input');
    for (let i = 0; i < listItems.length; i++) {
        if(listItems[i].value != "") {
            ingridients.push(listItems[i].value);
        }
    }

    var steps = new Array();
    listItems = document.querySelectorAll('#stepsInput li input');
    for (let i = 0; i < listItems.length; i++) {
        if(listItems[i].value != "") {
            steps.push(listItems[i].value);
        }
    }

    var item = {
        shortDescription: description.substring(0, 300) + '..<span class="link">Więcej</span>',
        description: description,
        ingridients: ingridients,
        steps: steps,
        title: title,
        imgSrc: imgSrc,
        altImgSrc: altImgSrc
    }
    
    recipes.push(item);
    addRecipeCard(recipes.length - 1);
}

var validateInput = function(e) {
    var valid = true;
    var validationSummary = document.getElementById("validation-summary");
    validationSummary.innerHTML = "";

    [].forEach.call(document.querySelectorAll('#popup1 input, #popup1 textarea'),function(e){
        if(e.parentNode.tagName != "LI" && e.value == "") {
            console.log(e);
            if(validationSummary.innerHTML == "") {
                validationSummary.innerHTML += 'Wypełnij wszystkie wymagane pola.<br/>';
            }
            if(valid) { e.focus();}
            valid = false;
        }
    });

    var imgSrc = document.getElementById("imgSrcInput");
    //console.log(imgSrc.value);
    if(imgSrc.value != "" && imgSrc.value.match(/\.(jpeg|jpg|gif|png)$/) == null) {
        validationSummary.innerHTML += `"${imgSrc.value}" nie jest poprawnym adresem obrazka<br/>`;
        if(valid) { imgSrc.focus();}
        valid = false;
    }

    var altImgSrc = document.getElementById("altImgSrcInput");
    //console.log(altImgSrc.value);
    if(altImgSrc.value != "" && altImgSrc.value.match(/\.(jpeg|jpg|gif|png)$/) == null) {
        validationSummary.innerHTML += `"${altImgSrc.value}" nie jest poprawnym adresem obrazka<br/>`;
        if(valid) { altImgSrc.focus();}
        valid = false;
    }

    if(valid) {
        addRecipe();
        closePopup();
        clearRecipeInput();
    } else {
        e.preventDefault();
    }
};

var clearRecipeInput = function() {
    [].forEach.call(document.querySelectorAll('.dynamically-added'),function(e){
        e.parentNode.parentNode.removeChild(e.parentNode);
    });

    [].forEach.call(document.querySelectorAll('#popup1 input, #popup1 textarea'),function(e){
        e.value = "";
    });
};

document.querySelector(".popup").addEventListener('click', e => e.stopPropagation());

var closePopup = function() {
    var url = location.href;
    location.href = "#bestRecipes";
    history.replaceState(null,null,url);
};

var deleteRecipe = function(id) {
    [].forEach.call(document.querySelectorAll('.recipe'),function(recipe){
        if(recipe.id == `recipe${id}`) {
            recipe.parentNode.removeChild(recipe);
        }
    });

    recipes[id] = null;
};

document.getElementById('validateInput').addEventListener('click', validateInput);