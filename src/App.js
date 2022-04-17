import { useState } from "react";

// firebase
import firebaseAuthService from "./FirebaseAuthService";

// css
import "./App.css";

// components
import LoginForm from "./components/LoginForm";
import AddEditRecipeForm from "./components/AddEditRecipeForm";
import FirebaseFirestoreService from "./FirebaseFirestoreService";

function App() {
  const [user, setUser] = useState(null);

  firebaseAuthService.subcribeToAuthChanges(setUser);

  const handleAddRecipe = async (newRecipe) => {
    try {
      const response = await FirebaseFirestoreService.createDocument(
        "recipes",
        newRecipe
      );

      // TODO: fatch new recipes from firestore

      alert(`succesfully created a recipe with an ID = ${response.id}`);
    } catch (error) {
      alert(error.massage);
    }
  };

  return (
    <div className="App">
      <div className="title-row">
        <h1 className="title">Firebase Recipes</h1>
        <LoginForm existingUser={user} />
      </div>
      <div className="main">
        <AddEditRecipeForm handleAddRecipe={handleAddRecipe} />
      </div>
    </div>
  );
}

export default App;
