import React from 'react'

import {
  Cart,
  InfoCon,
  ButtonForCart,
  Unpublished,
  RecipeListBox,
  RecipeList,
  AddCart,
  RowFilters,
  Filters
} from "./style/CardsTable.styled";

const CardsTable = (props) => {

  return (
    <>
      <RowFilters>
        <Filters>
          Category:
          <select
            value={props.categoryFilter}
            required
            onChange={(e) => props.setCategoryFilter(e.target.value)}
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
        </Filters>
        <Filters>
          Order By:
          <select
            value={props.orderBy}
            className="select"
            onChange={(e) => props.setOrderBy(e.target.value)}
          >
            <option value="publishDateDesc">
              Publish Date (newest - oldest)
            </option>
            <option value="publishDateAsc">
              Publish Date (oldest - newest)
            </option>
          </select>
        </Filters>
      </RowFilters>
      <RecipeListBox>
        {/* {props.recipes && props.recipes.length > 0 ? (
          <h5 className="no-recipes">No recipes founds</h5>
        ) : null} */}
        {props.recipes && props.recipes.length > 0 ? (
          <RecipeList>
            {props.user ?
              <AddCart onClick={props.handleAddModal} >
                <div>
                  <h3>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; +</h3>
                  <h3>Add Recipe</h3>
                </div>
              </AddCart>
              : null}
            {props.recipes.map((recipe, i) => (
              <Cart image={recipe.imageUrl} key={i}>
                {recipe.isPublished === false ? (
                  <Unpublished>UNPUBLISHED</Unpublished>
                ) : <div></div>}
                <div>
                  <InfoCon>
                    <h2>{recipe.name}</h2>
                    <h4>
                      Category: {props.lookupCategoryLabel(recipe.category)}
                    </h4>
                    <h3>
                      Publish Date: {props.formatDate(recipe.publishDate)}
                    </h3>
                  </InfoCon>

                  {props.user ? (
                    <ButtonForCart
                      type="button"
                      className="primary-button edit-button"
                      onClick={() => props.handleEditRecipeClick(recipe.id)}
                    >
                      <h4>Edit Recipe</h4>
                    </ButtonForCart>
                  ) : null}
                </div>
              </Cart>
            ))}
          </RecipeList>
        ) : null}
      </RecipeListBox>
    </>
  )
}

export default CardsTable