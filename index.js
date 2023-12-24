// Check if the File System API is supported
if ('showDirectoryPicker' in window) {
    document.getElementById('recipeList').innerHTML = '<p>File System API is supported.</p>';
} else {
    document.getElementById('recipeList').innerHTML = '<p>File System API is not supported. Please use a different browser.</p>';
}

// Function to add a recipe
async function addRecipe() {
    const recipeName = document.getElementById('recipeName').value;
    const ingredients = document.getElementById('ingredients').value;
    const directions = document.getElementById('directions').value;

    const recipes = await readRecipesFile();

    recipes.push({
        name: recipeName,
        ingredients: ingredients,
        directions: directions
    });

    await writeRecipesFile(recipes);

    document.getElementById('addRecipeForm').reset();

    displayRecipes();
}

// Function to display recipes
async function displayRecipes() {
    const recipesContainer = document.getElementById('recipes');
    recipesContainer.innerHTML = '';

    const recipes = await readRecipesFile();

    recipes.forEach((recipe, index) => {
        const recipeDiv = document.createElement('div');
        recipeDiv.classList.add('recipe');

        recipeDiv.innerHTML = `
                    <h3>${recipe.name}</h3>
                    <p><strong>Ingredients:</strong><br>${recipe.ingredients}</p>
                    <p><strong>Directions:</strong><br>${recipe.directions}</p>
                    <button onclick="deleteRecipe(${index})">Delete Recipe</button>
                `;

        recipesContainer.appendChild(recipeDiv);
    });
}

// Function to delete a recipe
async function deleteRecipe(index) {
    const recipes = await readRecipesFile();

    recipes.splice(index, 1);

    await writeRecipesFile(recipes);

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

    filteredRecipes.forEach((recipe, index) => {
        const recipeDiv = document.createElement('div');
        recipeDiv.classList.add('recipe');

        recipeDiv.innerHTML = `
                    <h3>${recipe.name}</h3>
                    <p><strong>Ingredients:</strong><br>${recipe.ingredients}</p>
                    <p><strong>Directions:</strong><br>${recipe.directions}</p>
                    <button onclick="deleteRecipe(${index})">Delete Recipe</button>
                `;

        recipesContainer.appendChild(recipeDiv);
    });
}

// Read recipes from the file
async function readRecipesFile() {
    const recipesFileHandle = await getFileHandle();
    const file = await recipesFileHandle.getFile();
    const contents = await file.text();

    try {
        return JSON.parse(contents) || [];
    } catch (error) {
        return [];
    }
}

// Write recipes to the file
async function writeRecipesFile(recipes) {
    const recipesFileHandle = await getFileHandle();
    const writable = await recipesFileHandle.createWritable();
    await writable.write(JSON.stringify(recipes, null, 2));
    await writable.close();
}

// Get file handle for recipes file
async function getFileHandle() {
    const dirHandle = await window.showDirectoryPicker();
    return await dirHandle.getFileHandle('recipes.txt', { create: true });
}

// Display recipes when the page loads
displayRecipes();