import { useState, useEffect } from "react";

// styled-components
import {
  Cart,
  InfoCon,
  ButtonForCart,
  Unpublished,
  Header,
  RecipeListBox,
  PaginationButton,
  RecipeList,
  AddCart,
  Main,
  RowFilters,
  Filters
} from "./style/App.styled";

// firebase
import firebaseAuthService from "./FirebaseAuthService";
import FirebaseFirestoreService from "./FirebaseFirestoreService";

// css
// import "./App.scss";

// components
import LoginForm from "./components/LoginForm";
import AddEditRecipeForm from "./components/AddEditRecipeForm";
import CardsTable from "./components/CardsTable";

function App() {
  const [user, setUser] = useState(null);
  const [recipes, setRecipes] = useState([]);
  const [currentRecipe, setCurrentRecipe] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [orderBy, setOrderBy] = useState("publishDateDesc");
  const [recipesPerPage, setRecipesPerPage] = useState(3);

  const [isOpenModal, setIsOpenModal] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  // delay for bug in edit
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

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
    setIsOpenModal(false);
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

  const handleAddModal = () => {
    setCurrentRecipe(null);
    setIsOpenModal(true);
  }

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
    setIsOpenModal(false);
  };

  const handleEditRecipeClick = async (recipeId) => {
    const selectedRecipe = recipes.find((recipe) => {
      return recipe.id === recipeId;
    });
    console.log("selectedrecipe = > ", selectedRecipe);
    if (selectedRecipe) {
      await delay(100);
      console.log("1 sec");
      setCurrentRecipe(selectedRecipe);
      window.scrollTo(0, document.body.scrollHeight);
    }
    setIsOpenModal(true);
  };

  const handleEditRecipeCancel = async () => {
    await delay(100);
    setCurrentRecipe(null);
    setIsOpenModal(false);
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
    setIsOpenModal(false);
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
    // setIsLoading(true);

    fetchRecipes()
      .then((fetchRecipes) => {
        setRecipes(fetchRecipes);
      })
      .catch((error) => {
        console.log(error.massage);
        throw error;
      })
      .finally(
      // () => setIsLoading(false)
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, categoryFilter, orderBy, recipesPerPage]);

  // setting user
  useEffect(() => {
    firebaseAuthService.subcribeToAuthChanges(setUser);
  }, [])

  return (
    <div className="App">
      <Header>
        <h1 className="title">Firebase Recipes</h1>
        <LoginForm existingUser={user} />
      </Header>
      <Main>
        <CardsTable
          user={user}
          recipes={recipes}
          handleEditRecipeClick={handleEditRecipeClick}
          formatDate={formatDate}
          lookupCategoryLabel={lookupCategoryLabel}
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
          orderBy={orderBy}
          setOrderBy={setOrderBy}
          handleAddModal={handleAddModal}
        />
        {recipes && recipes.length > 0 ? (
          <>
            <Filters width={"207px"} >
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
            </Filters>
            <PaginationButton>
              <button
                type="button"
                className="primary-button"
                onClick={handleLoadMoreRecipesClick}
              >
                Load more recipes
              </button>
            </PaginationButton>
          </>
        ) : null}
        {user && isOpenModal ?
          (
            <AddEditRecipeForm
              existingRecipe={currentRecipe}
              handleUpdateRecipe={handleUpdateRecipe}
              handleDeleteRecipe={handleDeleteRecipe}
              handleEditRecipeCancel={handleEditRecipeCancel}
              handleAddRecipe={handleAddRecipe}

            />
          ) : null}
      </Main>
    </div>
  );
}

export default App;
