const searchBox = document.querySelector(".searchBox");
const searchBtn = document.querySelector(".searchBtn");
const container = document.querySelector(".container");
const content = document.querySelector(".content");
const closeBtn = document.querySelector(".closeBtn");

const fetchRecipes = async (query) => {
  container.innerHTML = "<h2>Serving soon...</h2>";

  try {
    const data = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
    );
    const response = await data.json();
  
    container.innerHTML = "";
    response.meals.map((meal) => {
      const recipeDiv = document.createElement("div");
      recipeDiv.classList.add("recipe");
      recipeDiv.innerHTML = `
          <img src=${meal.strMealThumb} >
          <h4>${meal.strMeal}</h4>
          <p><span>${meal.strArea}</span> Dish</p>
          <p>${meal.strCategory}</p>
          `;
        const button = document.createElement("button");
        button.textContent = "View Recipe";
        recipeDiv.appendChild(button);
  
        button.addEventListener("click", () => {
          openPopup(meal);
        });
  
      container.appendChild(recipeDiv);
    });
  } catch (error) {
    container.innerHTML = "<h2>Error in fetching Recipes...</h2>";
  }

  
};

const fetchIngredients = (meal) => {
  let ingredientList = "";
  for(let i = 1; i <= 20; i++){
    const ingredient = meal[`strIngredient${i}`];
    if(ingredient) {
      const measure = meal[`strMeasure${i}`];
      ingredientList += `<li>${measure} ${ingredient}</li>`
    }
    else {
      break;
    }
  }
  return ingredientList;
}

const openPopup = (meal) => {
    content.innerHTML = `
        <h2 class="recipeName">${meal.strMeal}</h2>
        <h3>Ingredients:</h3>
        <ul class="ingredientList">${fetchIngredients(meal)}</ul>
        <div class="recipeInstructions">
            <h3>Instructions:</h3>
            <p>${meal.strInstructions}</p>
        </div>
    `
    content.parentElement.style.display = "block";
}


closeBtn.addEventListener("click", () => {
  content.parentElement.style.display = "none";
})

searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const searchInput = searchBox.value.trim();
  fetchRecipes(searchInput);
});
