const btn = document.querySelector('#go')
const ing = document.querySelector(".recipetext")
const pro = document.querySelector('.nextpg')
const URL = new "https://www.themealdb.com/api/json/v1/1/search.php?s="

async function Fetcher() {
    let name = document.querySelector('#inp').value.trim();
    let item = document.querySelector('#itemname')
    if (name === '') {
        alert('Please enter a valid recipe name');
        return;
    }
    try {
        let res = await (await fetch(URL + name)).json();
        if (!res.meals) {
            // ing.innerHTML = 'Recipe not found. Please try another name.';
            return;
        }
        item.innerHTML = res.meals[0].strMeal+ ': ' + '<br>'; // Clear previous results
        for (let i = 1; i <= 20; i++) {
            let s = res.meals[0]['strIngredient' + i];
            ing.innerHTML += s ? s + '<br>' : '';
        }
        pro.innerHTML = res.meals[0].strInstructions; // Display instructions
        console.log(res.meals[0].strMeal)
    } catch (error) {
        console.error('Error fetching recipe:', error);
        ing.innerHTML = 'Error fetching the recipe. Please try again later.';
    }
}
btn.addEventListener('click', ()=>{
    Fetcher()
    if(document.querySelector('#inp').value!= ''){
        pro.classList.add('hidden')
        document.querySelector('.lower').classList.remove('hidden')
    }
})

document.querySelector('#recipe').addEventListener('click', ()=>{
    document.querySelector('.lower').classList.add('hidden')
    pro.classList.remove('hidden')
})

document.querySelector('#inp').addEventListener('keydown', (event) => {
    if(event.key === 'Enter'){
        Fetcher()
        if(document.querySelector('#inp').value!= ''){
        pro.classList.add('hidden')
        document.querySelector('.lower').classList.remove('hidden')
    }
    }
})