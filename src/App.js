import { useState, useEffect } from "react";

// firebase
import firebaseAuthService from "./FirebaseAuthService";
import FirebaseFirestoreService from "./FirebaseFirestoreService";

// css
import "./App.css";

// components
import LoginForm from "./components/LoginForm";
import AddEditRecipeForm from "./components/AddEditRecipeForm";

function App() {
  const [user, setUser] = useState(null);
  const [recipes, setRecipes] = useState([]);

  firebaseAuthService.subcribeToAuthChanges(setUser);

  const handleAddRecipe = async (newRecipe) => {
    try {
      const response = await FirebaseFirestoreService.createDocument(
        "recipes",
        newRecipe
      );

      handleFetchRecipes();

      alert(`succesfully created a recipe with an ID = ${response.id}`);
    } catch (error) {
      alert(error.massage);
    }
  };

  const fetchRecipes = async () => {
    let fetchRecipes = [];

    try {
      const response = await FirebaseFirestoreService.readDocuments("recipes");

      const newRecipes = response.docs.map((recipeDoc) => {
        const id = recipeDoc.id;
        const data = recipeDoc.data();
        data.publishDate = new Date(data.publishDate.seconds * 1000);

        return { ...data, id };
      });

      fetchRecipes = [...newRecipes];
    } catch (error) {
      console.log(error.massage);
      throw error;
    }

    return fetchRecipes;
  };

  const handleFetchRecipes = async () => {
    try {
      const fatchRecipes = await fetchRecipes();

      setRecipes(fatchRecipes);
    } catch (error) {
      console.log(error.massage);
      throw error;
    }
  };

  useEffect(() => {
    fetchRecipes()
      .then((fetchRecipes) => {
        setRecipes(fetchRecipes);
      })
      .catch((error) => {
        console.log(error.massage);
        throw error;
      });
  }, [user]);

  return (
    <div className="App">
      <div className="title-row">
        <h1 className="title">Firebase Recipes</h1>
        <LoginForm existingUser={user} />
      </div>
      <div className="main">
        <div className="center">
          <div className="recipe-list-box">
            {recipes && recipes.length > 0 ? (
              <div className="recipe-list">
                {recipes.map((recipe, i) => (
                  <div className="recipe-card" key={i}>
                    <div className="recipe-name">{recipe.name}</div>
                    <div className="recipe-field">{recipe.category}</div>
                    <div className="recipe-field">
                      {recipe.publishDate.toString()}
                    </div>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </div>
        {user ? <AddEditRecipeForm handleAddRecipe={handleAddRecipe} /> : null}
      </div>
    </div>
  );
}

export default App;
