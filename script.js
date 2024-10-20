  const SearchBar= document.querySelector('.SearchBar');
 const find=document.querySelector('.find');
 const recipiContainer=document.querySelector('.recipiContainer');
 const recipeDetailContent=document.querySelector('.recipe-detail-content')
 const recipeCloseBtn=document.querySelector('.recipe-close-btn')

//Function To Get Recipes
const fetchRecippes= async(query)=>{
    recipiContainer.innerHTML=`<div class="center"><h2>Fetching Recipes.......<h2></div>`;
   try {
    
   const data = await fetch (`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);//data is the providing the Promises
   
    //promise convert in the JSON Fromat 
    
    const responce= await data.json();
   
    recipiContainer.innerHTML="";
  
    responce.meals.forEach(meal => {
        //   console.log(meal);
        const recipeDiv=document.createElement('div');// Create a div using CreateElecmet
        recipeDiv.classList.add('recipes');
         recipeDiv.innerHTML=`
         <img src="${meal.strMealThumb}">
         <h2>${meal.strMeal }<h2>
         <p><span>${meal.strArea}</span> Dish<p> 
         <p calss="category">Belongs to <span>${meal.strCategory}</span> Category<p>
                 
         `;
         // Create a "View Recipe" button
        const submit = document.createElement('Click');
        submit.textContent = "View Recipe";
        recipeDiv.appendChild(submit); // Append the button to the div
         recipiContainer.appendChild(recipeDiv);

         //Adding Eventlisterner to   recipe button 
         submit.addEventListener('click',()=>{
            openRecipePopup(meal);
         })
         
    });

} catch (error) {
    recipiContainer.innerHTML=`<div class="center Error-img"><h2>Error Fetching In Recipes.......<h2></div>`
}
   

}


//Function to fetach The ingredient And Massurements

const fetchIngredients=(meal)=>{
  let ingradientsList="";
   for(let i=1;i<20;i++){

    const ingredient= meal[`strIngredient${i}`];
    if (ingredient) {
        const measure=meal[`strMeasure${i}`];
        ingradientsList +=`<li>${measure}${ingredient}</li>` // This  Data Stored In the Ingreadient 
    }else{
        break;
    }

   }
   return ingradientsList;
}

//making a arrow function 
const openRecipePopup=(meal)=>{

   recipeDetailContent.innerHTML=`
        <h2 class="recipiName">${meal.strMeal}</h2>  
        <h3 class="ingredient">Ingredents:</h3>
        <ul class="ingredientList">${fetchIngredients(meal)}</ul>

        <div class="instructions">
        
             <h1>Instruction:</h1>
             <p class="instructions">${meal.strInstructions}</p>
        
        </div>

   `

    
    recipeDetailContent.parentElement.style.display="block";
}



//recipi Close Button 

recipeCloseBtn.addEventListener("click",(e)=>{

    recipeDetailContent.parentElement.style.display="none";
})




find.addEventListener("click", (e)=>{
    e.preventDefault();
    const serachInput=SearchBar.value.trim(); //  (trim)  Is Tthe  Basically Remove the Extra  Space
    if (!serachInput) {
        recipiContainer.innerHTML=`<h2>Type the meal in the Search Box</h2>`
        return;
    }
    fetchRecippes(serachInput);
    // console.log("click Button");

 });

 //1:14;