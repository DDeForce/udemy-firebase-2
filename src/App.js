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

  // current recipe that has been edited
  // const [currentRecipe, setCurrentRecipe] = useState(null);
  let currentRecipe = null;

  firebaseAuthService.subcribeToAuthChanges(setUser);

  // handleing add recipes
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
    const queries = [];

    if (!user) {
      queries.push({
        field: "isPublished",
        condition: "==",
        value: true,
      });
    }

    let fetchRecipes = [];

    try {
      const response = await FirebaseFirestoreService.readDocuments({
        collection: "recipes",
        queries: queries,
      });

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

  // handling edit recipes
  const handleUpdateRecipe = async (newRecipe, recipeId) => {
    try {
      await FirebaseFirestoreService.updateDocument(
        "recipes",
        recipeId,
        newRecipe
      );
      handleFetchRecipes();
      alert(`Successfuly updated a recipe with id of ${recipeId}`);

      // setCurrentRecipe(null);
      currentRecipe = null;
    } catch (error) {
      alert(error.message);
      throw error;
    }
  };

  const handleEditRecipeClick = (recipeId) => {
    const selectedRecipe = recipes.find((recipe) => {
      return recipe.id === recipeId;
    });
    console.log("selectedrecipe = > ", selectedRecipe);
    if (selectedRecipe) {
      // setCurrentRecipe(recipes);
      currentRecipe = selectedRecipe;
      console.log("in app currentRecipe => ", currentRecipe);
      window.scrollTo(0, document.body.scrollHeight);
    }
  };

  const handleEditRecipeCancel = () => {
    // setCurrentRecipe(null);
    currentRecipe = null;
  };

  // formating for view
  const lookupCategoryLabel = (categoryKey) => {
    const categories = {
      breadsSandwichesAndPizzas: "Breads, Sandwiches and Pizzas",
      eggsAndBreakfast: "Eggs & Breakfast",
      dessertsAndBakedGoods: "Desserts & Baked Goods",
      fishAndSeafood: "Fish & Seafood",
      vegetables: "Vegetables",
    };
    const label = categories[categoryKey];

    return label;
  };

  const formatDate = (date) => {
    const day = date.getUTCDate();
    const month = date.getUTCMonth() + 1;
    const year = date.getFullYear();

    return `${month}-${day}-${year}`;
  };

  // handling delete recipes

  // useEfect
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
                    {recipe.isPublished === false ? (
                      <div className="unpublished">UNPUBLISHED</div>
                    ) : null}
                    <div className="recipe-name">{recipe.name}</div>
                    <div className="recipe-field">
                      Category: {lookupCategoryLabel(recipe.category)}
                    </div>
                    <div className="recipe-field">
                      Publish Date: {formatDate(recipe.publishDate)}
                    </div>
                    {user ? (
                      <button
                        type="button"
                        className="primary-button edit-button"
                        onClick={() => handleEditRecipeClick(recipe.id)}
                      >
                        Edit
                      </button>
                    ) : null}
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </div>
        {user ? (
          <AddEditRecipeForm
            existingRecipe={currentRecipe}
            handleUpdateRecipe={handleUpdateRecipe}
            handleEditRecipeCancel={handleEditRecipeCancel}
            handleAddRecipe={handleAddRecipe}
          />
        ) : null}
      </div>
    </div>
  );
}

export default App;
