import React, { useState, useEffect } from "react";

import ImageUploadPreview from "./ImageUploadPreview";

const AddEditRecipeForm = ({
  existingRecipe,
  handleUpdateRecipe,
  handleEditRecipeCancel,
  handleDeleteRecipe,
  handleAddRecipe,
}) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [publishDate, setPublishDate] = useState(
    new Date().toISOString().split("T"[0])
  );
  const [directions, setDirections] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [ingredientName, setIngredientName] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleAddIngredient = (e) => {
    if (e.key && e.key !== "Enter") {
      return;
    }

    e.preventDefault();

    if (!ingredientName) {
      alert("Missing ingredient field. Please double check");
      return;
    }

    setIngredients([...ingredients, ingredientName]);
    setIngredientName("");
  };

  const handleRecipeFormSubmit = (e) => {
    e.preventDefault();

    if (ingredients.length === 0) {
      alert("Ingredients cannot be empty.");
      return;
    }

    if (!imageUrl) {
      alert("Missing recipe image. Please add a recipe image");
      return;
    }

    const isPublished = new Date(publishDate) <= new Date() ? true : false;

    const newRecipe = {
      name,
      category,
      directions,
      publishDate: new Date(publishDate),
      isPublished,
      ingredients,
      imageUrl,
    };

    if (existingRecipe) {
      handleUpdateRecipe(newRecipe, existingRecipe.id);
    } else {
      handleAddRecipe(newRecipe);
    }

    resetForm();
  };

  const resetForm = () => {
    setName("");
    setCategory("");
    setDirections("");
    setPublishDate("");
    setIngredients([]);
    setImageUrl("");
  };

  useEffect(() => {
    console.log(`current recipe in AddEdit.js: ${existingRecipe}`);
    if (existingRecipe) {
      setName(existingRecipe.name);
      setCategory(existingRecipe.category);
      setDirections(existingRecipe.directions);
      setPublishDate(existingRecipe.publishDate.toISOString().split("T")[0]);
      setIngredients(existingRecipe.ingredients);
      setImageUrl(existingRecipe.imageUrl);
    } else {
      resetForm();
    }
  }, [existingRecipe]);

  return (
    <form
      onSubmit={handleRecipeFormSubmit}
      className="add-edit-recipe-form-container"
    >
      {existingRecipe ? <h2>Edit the recipe</h2> : <h2>Add a new recipe</h2>}

      <div className="top-form-section">
        <div className="image-input-box">
          Recipe image
          <ImageUploadPreview
            basePath="recipes"
            existingImageUrl={imageUrl}
            handleUploadFinish={(downloadUrl) => {
              setImageUrl(downloadUrl);
            }}
            handleUploadCancel={() => setImageUrl("")}
          />
        </div>
        <div className="firelds">
          <label className="recipe-label input-label">
            Recipe Name:
            <input
              type="text"
              required
              value={name}
              className="input-text"
              onChange={(e) => setName(e.target.value)}
            />
          </label>

          <label className="recipe-label input-label">
            category:
            <select
              value={category}
              required
              className="select"
              onChange={(e) => setCategory(e.target.value)}
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

          <label className="recipe-label input-label">
            Directions:
            <textarea
              required
              value={directions}
              className="input-text directions"
              onChange={(e) => setDirections(e.target.value)}
            />
          </label>

          <label className="recipe-label input-label">
            Publish Date:
            <input
              type="date"
              required
              value={publishDate}
              className="input-text"
              onChange={(e) => setPublishDate(e.target.value)}
            />
          </label>
        </div>
      </div>

      <div className="ingredients-list">
        <h3 className="text-center">Ingredients</h3>
        <table className="ingredients-table">
          <thead>
            <tr>
              <th className="table-header">Ingredient</th>
              <th className="table-header">Delete</th>
            </tr>
          </thead>
          <tbody>
            {ingredients && ingredients.length > 0
              ? ingredients.map((ingredient) => {
                  return (
                    <tr key={ingredient}>
                      <td className="table-data text-center">{ingredient}</td>
                      <td className="ingedient-delete-box">
                        <button
                          type="button"
                          className="secondary-button ingredient-delete-button"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })
              : null}
          </tbody>
        </table>
        {ingredients && ingredients.length === 0 ? (
          <h3 className="text-center no-ingredients">
            No Ingredients Added Yet
          </h3>
        ) : null}

        <div className="ingredient-form">
          <label className="recipe-label input-label">
            Ingredient:
            <input
              type="text"
              value={ingredientName}
              className="input-text"
              placeholder="ex. 1 cup of sugar"
              onChange={(e) => setIngredientName(e.target.value)}
              onKeyPress={handleAddIngredient}
            />
          </label>
          <button
            type="button"
            className="primary-button add-ingredient-button"
            onClick={handleAddIngredient}
          >
            Add Ingredient
          </button>
        </div>
      </div>
      <div className="action-buttons">
        <button type="submit" className="primary-button action-button">
          {existingRecipe ? "Edit Recipe" : "Create Recipe"}
        </button>
        {existingRecipe ? (
          <>
            <button
              type="button"
              onClick={handleEditRecipeCancel}
              className="primary-button action-button"
            >
              Cancel
            </button>
            <button
              type="button"
              className="primary-button action-button"
              onClick={() => handleDeleteRecipe(existingRecipe.id)}
            >
              Delete
            </button>
          </>
        ) : null}
      </div>
    </form>
  );
};

export default AddEditRecipeForm;
