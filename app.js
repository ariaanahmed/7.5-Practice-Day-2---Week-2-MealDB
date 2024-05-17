const loadMeals = (searchText) => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            displayMeals(data.meals)
        })
}

const searchBtn = document.getElementById("searchBtn");
const emptyTextMsg = document.getElementById("emptyTextMsg")

searchBtn.addEventListener("click", () => {
    const searchField = document.getElementById("inputField").value;
    if(searchField === "") {
        emptyTextMsg.innerText = "Enter item name"

    } else if(searchField !== "") {
        emptyTextMsg.innerText = "";
        loadMeals(searchField);
        document.getElementById("inputField").value = ""
    }
})

const displayMeals = (meals) => {
    const itemContainer = document.getElementById("item-container")
    itemContainer.innerText = '';
    if (meals) {
        meals.forEach(meal => {
            // console.log(meal)
            const itemCard = document.createElement("div");
            itemCard.classList.add("card-design");

            itemCard.innerHTML = `
                <img src=${meal.strMealThumb} alt="${meal.strMeal}" class="card-img">
                <h4 class="card-title">${meal.strMeal.slice(0, 45)}</h4>
            `
            itemCard.addEventListener("click", () => {
                showDetails(meal.idMeal);
            })
            itemContainer.appendChild(itemCard)
        });
    } else {
        const errorMessage = document.createElement("div")
        errorMessage.innerHTML = `
            <h4 class="card-title">Not Found</h4>
        `
        itemContainer.appendChild(errorMessage)
    }
}


const showDetails = (id) => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    fetch(url)
        .then(res => res.json())
        .then(data => showIngredients(data.meals))
}

const showIngredients = (meals) => {
    const cardDetails = document.getElementById("card-details");
    cardDetails.innerText = ''

    meals.forEach(meal => {
        const div = document.createElement("div");
        div.classList.add("ingredient-card-design")
        div.innerHTML = `
            <img src=${meal.strMealThumb} alt="${meal.strMeal}" class="card-img">
            <li>${meal.strIngredient1} </li>
            <li>${meal.strIngredient2} </li>
            <li>${meal.strIngredient3} </li>
            <li>${meal.strIngredient4} </li>
            <li>${meal.strIngredient5} </li>
            <li>${meal.strIngredient6} </li>
        `
        cardDetails.appendChild(div)
        
    });
}