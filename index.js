// Function to add a recipe
function addRecipe() {
    // Get values from the form
    const recipeName = document.getElementById('recipeName').value;
    const ingredients = document.getElementById('ingredients').value;
    const directions = document.getElementById('directions').value;

    // Check if localStorage has recipes
    const recipes = JSON.parse(localStorage.getItem('recipes')) || [];

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

// Function to display recipes
function displayRecipes() {
    const recipesContainer = document.getElementById('recipes');
    recipesContainer.innerHTML = '';

    // Get recipes from localStorage
    const recipes = JSON.parse(localStorage.getItem('recipes')) || [];

    // Display each recipe
    recipes.forEach((recipe, index) => {
        const recipeDiv = document.createElement('div');
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

// Function to delete a recipe
function deleteRecipe(index) {
    const recipes = JSON.parse(localStorage.getItem('recipes')) || [];

    // Remove the recipe at the specified index
    recipes.splice(index, 1);

    // Save the updated recipes array to localStorage
    localStorage.setItem('recipes', JSON.stringify(recipes));

    // Update the displayed recipes
    displayRecipes();
}

// Function to search recipes
function searchRecipes() {
    const searchTerm = document.getElementById('search').value.toLowerCase();
    const recipes = JSON.parse(localStorage.getItem('recipes')) || [];

    const filteredRecipes = recipes.filter(recipe => {
        return recipe.name.toLowerCase().includes(searchTerm) ||
            recipe.ingredients.toLowerCase().includes(searchTerm) ||
            recipe.directions.toLowerCase().includes(searchTerm);
    });

    displayFilteredRecipes(filteredRecipes);
}

// Function to display filtered recipes
function displayFilteredRecipes(filteredRecipes) {
    const recipesContainer = document.getElementById('recipes');
    recipesContainer.innerHTML = '';

    // Display each filtered recipe
    filteredRecipes.forEach((recipe, index) => {
        const recipeDiv = document.createElement('div');
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
