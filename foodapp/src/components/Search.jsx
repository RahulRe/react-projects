import { useEffect, useState } from "react" 
import styles from './Search.module.css'


const URL ="https://api.spoonacular.com/recipes/complexSearch";
const API_KEY = "d379500f570148f9b6f1dcfffad58d5a";

export default function Search({foodData,setFoodData}){
    const handleChange = (event)=>{
        setQuery(event.target.value)

    }
   const [query,setQuery] = useState("pizza");
   useEffect(()=>{
    async function fetchFood(){

        const res = await fetch(`${URL}?query=${query}&apiKey=${API_KEY}`);
        const data = await res.json();
        
        setFoodData(data.results);

    }
    fetchFood();

   },[query])
    return (
        <div className={styles.searchContainer}>
            <input className={styles.input} value ={query} onChange={handleChange} type="text"></input>
        </div>
    )
}