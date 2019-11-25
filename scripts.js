var lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris sed viverra dui, vel interdum magna. Vivamus euismod tempus vestibulum. Nullam fringilla, nulla sit amet facilisis malesuada, nibh felis gravida diam, ac volutpat urna mauris id urna. Proin ullamcorper felis quis venenatis fringilla.";
var mockIngerdients = "<br/><br/><h3>Składniki</h3><ul><li>Marchew</li><li>Marchew</li><li>Marchew</li><li>Marchew</li></ul>"
var mockSteps = "<h3>Sposób przyrządzenia</h3><ol><li>Marchew</li><li>Marchew</li><li>Marchew</li><li>Marchew</li></ol>"

var recipeCards = document.getElementsByClassName("recipe");

var recipes = new Array();


pushInitialRecipes = function() {
    for(var i = 0; i < 3; i++) {
        recipes.push({
            shortDescription: lorem + '..<span class="link">Więcej</span>',
            description: lorem,
            ingridients: ["Marchew", "Marchew", "Marchew"],
            steps: ["Marchew", "Marchew", "Marchew"]
        });
    }
    console.log(recipes[2].ingridients);
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

Array.from(recipeCards).forEach(function(element) {
    element.addEventListener('click', expandRecipe);
});