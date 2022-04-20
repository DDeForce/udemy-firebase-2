import { useState, useEffect } from "react";

// firebase
import firebaseAuthService from "./FirebaseAuthService";
import FirebaseFirestoreService from "./FirebaseFirestoreService";

// css
import "./App.scss";

// components
import LoginForm from "./components/LoginForm";
import AddEditRecipeForm from "./components/AddEditRecipeForm";

function App() {
  const [user, setUser] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [currentRecipe, setCurrentRecipe] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [orderBy, setOrderBy] = useState("publishDateDesc");
  const [recipesPerPage, setRecipesPerPage] = useState(3);

  const [isLoading, setIsLoading] = useState(false);

  // delay for bug in edit
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  // setting user
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

  const fetchRecipes = async (cursorId = "") => {
    const queries = [];

    if (categoryFilter) {
      queries.push({
        field: "category",
        condition: "==",
        value: categoryFilter,
      });
    }

    if (!user) {
      queries.push({
        field: "isPublished",
        condition: "==",
        value: true,
      });
    }

    const orderByField = "publishDate";
    let orderByDirection;

    if (orderBy) {
      switch (orderBy) {
        case "publishDateAsc":
          orderByDirection = "asc";
          break;
        case "publishDateDesc":
          orderByDirection = "desc";
          break;
        default:
          break;
      }
    }

    let fetchRecipes = [];

    try {
      const response = await FirebaseFirestoreService.readDocuments({
        collection: "recipes",
        queries: queries,
        orderByField: orderByField,
        orderByDirection: orderByDirection,
        perPage: recipesPerPage,
        cursorId: cursorId,
      });

      const newRecipes = response.docs.map((recipeDoc) => {
        const id = recipeDoc.id;
        const data = recipeDoc.data();
        data.publishDate = new Date(data.publishDate.seconds * 1000);

        return { ...data, id };
      });

      if (cursorId) {
        fetchRecipes = [...recipes, ...newRecipes];
      } else {
        fetchRecipes = [...newRecipes];
      }
    } catch (error) {
      console.log(error.massage);
      throw error;
    }

    return fetchRecipes;
  };

  const handleRecipesPerPageChange = (event) => {
    const recipesPerPage = event.target.value;

    setRecipes([]);
    setRecipesPerPage(recipesPerPage);
  };

  const handleLoadMoreRecipesClick = () => {
    const lastRecipe = recipes[recipes.length - 1];
    const cursorId = lastRecipe.id;

    handleFetchRecipes(cursorId);
  };

  const handleFetchRecipes = async (cursorId = "") => {
    try {
      const fatchRecipes = await fetchRecipes(cursorId);

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

      await setCurrentRecipe(null);
    } catch (error) {
      alert(error.message);
      throw error;
    }
  };

  const handleEditRecipeClick = async (recipeId) => {
    const selectedRecipe = recipes.find((recipe) => {
      return recipe.id === recipeId;
    });
    console.log("selectedrecipe = > ", selectedRecipe);
    if (selectedRecipe) {
      await delay(200);
      console.log("1 sec");
      setCurrentRecipe(selectedRecipe);
      window.scrollTo(0, document.body.scrollHeight);
    }
  };

  const handleEditRecipeCancel = async () => {
    await delay(200);
    setCurrentRecipe(null);
  };

  // handling delete recipe
  const handleDeleteRecipe = async (recipeId) => {
    const deleteConfirmation = window.confirm(
      "Are you sure you want to delete this recipe? OK for Yes. Cancel for No."
    );

    if (deleteConfirmation) {
      try {
        await FirebaseFirestoreService.deleteDocument("recipe", recipeId);

        handleFetchRecipes();

        setCurrentRecipe(null);

        alert(`Succsessfully deleted recipe Id = ${recipeId}`);
      } catch (error) {
        alert(error.message);
        throw error;
      }
    }
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

  // useEfects
  useEffect(() => {
    setIsLoading(true);

    fetchRecipes()
      .then((fetchRecipes) => {
        setRecipes(fetchRecipes);
      })
      .catch((error) => {
        console.log(error.massage);
        throw error;
      })
      .finally(() => setIsLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, categoryFilter, orderBy, recipesPerPage]);

  // useEfect for debuging purpuses
  // useEffect(() => {
  //   console.log(`recipes in App.js: `, recipes);
  //   console.log(`current recipe in App.js: `, currentRecipe);
  // }, [currentRecipe, recipes]);

  return (
    <div className="App">
      <div className="title-row">
        <h1 className="title">Firebase Recipes</h1>
        <LoginForm existingUser={user} />
      </div>
      <div className="main">
        <div className="row filters">
          <label className="recipe-label input-label">
            category:
            <select
              value={categoryFilter}
              required
              className="select"
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value=""></option>
              <option value="breadsSandwichesAndPizzas">
                Breads, Sandwiches and Pizzas
              </option>
              <option value="eggsAndBreakfast">Eggs & Breakfast</option>
              <option value="dessertsAndBakedGoods">
                Desserts & Baked Goods
              </option>
              S<option value="fishAndSeafood">Fish & Seafood</option>
              <option value="vegetables">Vegetables</option>
            </select>
          </label>
          <label className="input-label">
            <select
              value={orderBy}
              className="select"
              onChange={(e) => setOrderBy(e.target.value)}
            >
              <option value="publishDateDesc">
                Publish Date (newest - oldest)
              </option>
              <option value="publishDateAsc">
                Publish Date (oldest - newest)
              </option>
            </select>
          </label>
        </div>
        <div className="center">
          <div className="recipe-list-box">
            {isLoading ? (
              <div className="fire">
                <div className="flames">
                  <div className="flame"></div>
                  <div className="flame"></div>
                  <div className="flame"></div>
                  <div className="flame"></div>
                </div>
                <div className="logs"></div>
              </div>
            ) : null}
            {isLoading && recipes && recipes.length > 0 ? (
              <h5 className="no-recipes">No recipes founds</h5>
            ) : null}
            {recipes && recipes.length > 0 ? (
              <div className="recipe-list">
                {recipes.map((recipe, i) => (
                  <div className="recipe-card" key={i}>
                    {recipe.isPublished === false ? (
                      <div className="unpublished">UNPUBLISHED</div>
                    ) : null}
                    <div className="recipe-name">{recipe.name}</div>
                    <div className="recipe-image-box">
                      {recipe.imageUrl ? (
                        <img
                          src={recipe.imageUrl}
                          alt={recipe.name}
                          className="recipe-image"
                        />
                      ) : null}
                    </div>
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
        {recipes && recipes.length > 0 ? (
          <>
            <label className="input-label">
              Recipes Per Page:
              <select
                value={recipesPerPage}
                onChange={handleRecipesPerPageChange}
                className="select"
              >
                <option value="3">3</option>
                <option value="6">6</option>
                <option value="9">9</option>
              </select>
            </label>
            <div className="pagination">
              <button
                type="button"
                className="primary-button"
                onClick={handleLoadMoreRecipesClick}
              >
                Load more recipes
              </button>
            </div>
          </>
        ) : null}
        {user ? (
          <AddEditRecipeForm
            existingRecipe={currentRecipe}
            handleUpdateRecipe={handleUpdateRecipe}
            handleDeleteRecipe={handleDeleteRecipe}
            handleEditRecipeCancel={handleEditRecipeCancel}
            handleAddRecipe={handleAddRecipe}
          />
        ) : null}
      </div>
    </div>
  );
}

export default App;
