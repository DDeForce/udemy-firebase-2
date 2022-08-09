import styled from "styled-components";

export const RowFilters = styled.div`
  margin-top: 1rem;
  margin-bottom: 1rem;
  width: 85rem;
  display: flex;
  justify-content: space-between;
`;

export const Filters = styled.label`
  display: flex;
  align-items: center;
  width: ${(props) => props.width || "auto"};
  justify-content: ${(props) => props.js || "space-between"};

  select {
    cursor: pointer;
    user-select: none;
    margin-left: 0.35rem;
    outline: none;
    font-size: 0.9rem;
    background: #d9d9d9;
    border: none;
  }
`;

export const RecipeListBox = styled.div`
  width: 88rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: 0.25rem;
`;

export const RecipeList = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
`;

export const AddCart = styled.div`
  width: 242.3px;
  height: 324.98px;
  background: #d9d9d9;
  border-radius: 6px;
  margin-right: 1rem;
  margin-bottom: 1rem;
  color: white;
  cursor: pointer;

  div {
    margin-top: 200px;
    width: 115.25px;
    height: 44.36px;
    background-color: rgb(0, 0, 0, 0.25);
  }
  h3 {
    margin: 0;
    margin-left: 5px;
  }
  &:hover {
    background: #cdcdcd;
    div {
      background-color: rgb(0, 0, 0, 0.5);
    }
  }
`;

export const Cart = styled.div`
  width: 242.3px;
  height: 324.98px;
  width: 100%;
  padding: 0.75rem;
  margin-right: 1rem;
  margin-bottom: 1rem;
  width: 17rem;
  background-image: url(${(porps) => porps.image});
  background-size: cover;
  background-position: center;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: white;
  text-align: left;
  padding: 0;
  div {
  }
`;

export const InfoCon = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: right;
  gap: 0px;

  h2 {
    background-color: rgb(0, 0, 0, 0.7);
    width: fit-content;
    margin: 0px;
  }

  h3 {
    background-color: rgb(0, 0, 0, 0.7);
    width: fit-content;
    margin: 0px;
  }

  h4 {
    background-color: rgb(0, 0, 0, 0.7);
    width: fit-content;
    margin: 0px;
  }
`;

export const ButtonForCart = styled.div`
  /* width: 100%; */
  height: 54px;
  border-bottom-left-radius: 6px;
  border-bottom-right-radius: 6px;
  background-color: #ffc700;
  color: black;
  cursor: pointer;
  h4 {
    position: relative;
    left: 33%;
    top: 17px;
  }

  &:hover {
    background-color: #d1a301;
  }
`;

export const Unpublished = styled.h4`
  width: 100%;
  background-color: rgb(0, 0, 0, 0.8);
  margin: 0;
  text-align: center;
  padding: 10px 0px 10px 0px;
  border-radius: 6px 6px 0px 0px;
`;

export const PaginationButton = styled.div`
  width: 15rem;
  text-align: center;
  margin-bottom: 3rem;
  margin-top: 6px;

  button {
    height: 28px;
    background-color: #ffc700;
    border: none;
    padding: 0px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    cursor: pointer;
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;

    &:hover {
      background-color: #d1a301;
    }
  }
`;
