import Item from "./Item";
export default function ItemList({foodRecipe,loading}){
    return (
      <div>
        {loading ? (
          <p>loading....</p>
        ) : (
          foodRecipe.extendedIngredients.map((item) => (
            <Item item={item}/>
          ))
        )}
      </div>
    );
}