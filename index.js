function addRecipe() {
    // Get values from the form
    let recipeName = document.getElementById('recipeName').value;
    let ingredients = document.getElementById('ingredients').value;
    let directions = document.getElementById('directions').value;

    // Get recipes from localStorage or an empty array if empty
    let recipes = JSON.parse(localStorage.getItem('recipes')) || [];

    // Add the new recipe to the recipes array
    recipes.push({
        name: recipeName,
        ingredients: ingredients,
        directions: directions
    });

    // Save the updated recipes array to localStorage
    localStorage.setItem('recipes', JSON.stringify(recipes));

    // Clear the form
    document.getElementById('addRecipeForm').reset();

    // Update the displayed recipes
    displayRecipes();
}

function displayRecipes() {
    let recipesContainer = document.getElementById('recipes');
    recipesContainer.innerHTML = '';

    // Get recipes from localStorage or an empty array if empty
    let recipes = JSON.parse(localStorage.getItem('recipes')) || [];

    // Display each recipe
    recipes.forEach((recipe, index) => {
        let recipeDiv = document.createElement('div');
        recipeDiv.classList.add('recipe');

        recipeDiv.innerHTML = `
            <h1>${recipe.name}</h1>
            <p><strong>Ingredients:</strong><br><pre>${recipe.ingredients}</pre></p>
            <p><strong>Directions:</strong><br><pre>${recipe.directions}</pre></p>
            <button onclick="deleteRecipe(${index})">Delete Recipe</button>
        `;

        recipesContainer.appendChild(recipeDiv);
    });
}

function deleteRecipe(index) {
    let recipes = JSON.parse(localStorage.getItem('recipes')) || [];

    // Remove the recipe at the specified index
    recipes.splice(index, 1);

    // Save the updated recipes array to localStorage
    localStorage.setItem('recipes', JSON.stringify(recipes));

    // Update the displayed recipes
    displayRecipes();
}

function searchRecipes() {
    let searchTerm = document.getElementById('search').value.toLowerCase();
    let recipes = JSON.parse(localStorage.getItem('recipes')) || [];

    let filteredRecipes = recipes.filter(recipe => {
        return recipe.name.toLowerCase().includes(searchTerm) 
        // ||
        //     recipe.ingredients.toLowerCase().includes(searchTerm) ||
        //     recipe.directions.toLowerCase().includes(searchTerm);
    });

    displayFilteredRecipes(filteredRecipes);
}

function displayFilteredRecipes(filteredRecipes) {
    let recipesContainer = document.getElementById('recipes');
    recipesContainer.innerHTML = '';

    // Display each filtered recipe
    filteredRecipes.forEach((recipe, index) => {
        let recipeDiv = document.createElement('div');
        recipeDiv.classList.add('recipe');

        recipeDiv.innerHTML = `
        <h2>${recipe.name}</h2>
        <p><strong>Ingredients:</strong><br><pre>${recipe.ingredients}</pre></p>
        <p><strong>Directions:</strong><br><pre>${recipe.directions}</pre></p>
        <button onclick="deleteRecipe(${index})">Delete Recipe</button>
        `;

        recipesContainer.appendChild(recipeDiv);
    });
}

// Display recipes when the page loads
displayRecipes();
