import { useEffect, useState } from "react"
import styles from './fooddetail.module.css'
import ItemList from "./itemList";


export default function FoodDetail({foodId}){
    const URL = `https://api.spoonacular.com/recipes/${foodId}/information`
    const API_KEY = "d379500f570148f9b6f1dcfffad58d5a";
    const [foodRecipe, setFoodRecipe] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        async function fetchRecipie(){
            const res= await fetch(`${URL}?apiKey=${API_KEY}`)
            const data =await  res.json()
            console.log(data)
            setFoodRecipe(data)
            setLoading(false)

        }
        fetchRecipie()
    },[foodId])

    return (
        <div>
            <div className={styles.recipeCard}>
                <h1 className={styles.recipeName}>{foodRecipe.title}</h1>
                <img className={styles.recipeImage} src={foodRecipe.image}></img>
                
                
                <div className={styles.recipeDetails}>
                    <span><strong>⏱️{foodRecipe.readyInMinutes} minutes</strong></span>
                    <span> <strong>🧑‍🤝‍🧑 Serves {foodRecipe.servings}</strong></span>
                    {foodRecipe.vegetarian? <span><strong> 🥕Vegetarian</strong></span>:<span><strong>🍖Non-Vegetarian</strong></span>}
                </div>
                <div>
                    <span><strong>${(foodRecipe.pricePerServing/100).toFixed(2)} per serving</strong></span>
                </div>
                <h2>Ingredients</h2>
                <ItemList foodRecipe={foodRecipe} loading={loading}/>
                
                <h2>Instructions</h2>
                <div className={styles.recipeInstructions}>
                    
                    <ol>
                        {loading?(
                            <p>Loading .....</p>
                        ):(
                            foodRecipe.analyzedInstructions[0].steps.map((step)=>(<li>{step.step}</li>))

                        )}
                    </ol>

                </div>
            </div>
        </div>
    )
}