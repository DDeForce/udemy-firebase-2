import styled from "styled-components";

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: #fac300;
  h1 {
    margin-left: 20px;
  }
`;

export const Main = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* width: 90%; */
`;

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
  justify-content: space-between;

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
    /* color: white; */
    padding: 0px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    /* margin: 12px 2px; */
    cursor: pointer;
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;

    &:hover {
      background-color: #d1a301;
    }
  }
`;

// export const ImageBox = styled.div`
//   width: 100%;
//   display: flex;
//   justify-content: center;
//   img {
//     object-fit: cover;
//     display: flex;
//     justify-content: center;
//     width: 100%;
//     height: 100%;
//   }
// `;
/* picture */

/* position: absolute;
width: 242.3px;
height: 324.98px;
left: 468.57px;
top: 196px; */

/* Rectangle 32 */

/* position: absolute;
width: 242.3px;
height: 324.98px;
left: 468.57px;
top: 196px;

background: url(image.png);
border-radius: 6px; */

/* Rectangle 35 */

/* position: absolute;
width: 148px;
height: 28px;
left: 469px;
top: 410px;

background: rgba(0, 0, 0, 0.7);
transform: matrix(1, 0, 0, -1, 0, 0); */

/* Rectangle 36 */

/* position: absolute;
width: 102px;
height: 12px;
left: 469px;
top: 422px;

background: rgba(0, 0, 0, 0.7);
transform: matrix(1, 0, 0, -1, 0, 0); */

/* Rectangle 37 */

/* position: absolute;
width: 138px;
height: 23px;
left: 469px;
top: 445px;

background: rgba(0, 0, 0, 0.7);
transform: matrix(1, 0, 0, -1, 0, 0); */

/* iformation */

/* position: absolute;
width: 140px;
height: 60px;
left: 473px;
top: 382px; */

/* Name Of Recipe */

/* position: absolute;
width: 140px;
height: 22px;
left: 473px;
top: 382px;

font-family: "Barlow";
font-style: normal;
font-weight: 600;
font-size: 20px;
line-height: 140%;
/* or 28px */

/*
color: #ffffff; */

/* Publish Date: 4-20-2022 */

/* position: absolute;
width: 129px;
height: 15px;
left: 473px;
top: 427px;

font-family: "Barlow";
font-style: normal;
font-weight: 600;
font-size: 12px;
line-height: 140%; */
/* or 17px */
/* 
color: #ffffff; */

/* Category: Vegatebles */

/* position: absolute;
width: 111px;
height: 8px;
left: 473px;
top: 408px;

font-family: "Barlow";
font-style: normal;
font-weight: 600;
font-size: 10px;
line-height: 140%; */
/* or 14px */

/* color: #ffffff; */

/* Edit recipe */

/* position: absolute;
width: 242.3px;
height: 54.31px;
left: 468.57px;
top: 466.67px; */

/* Rectangle 33 */

/* position: absolute;
width: 242.3px;
height: 54.31px;
left: 468.57px;
top: 466.67px;

background: #ffc700;
border-radius: 0px 0px 6px 6px; */

/* Vector */

/* position: absolute;
left: 37.01%;
right: 62.1%;
top: 47.69%;
bottom: 51.07%;

background: #000000; */

/* Edit Recipe */

/* position: absolute;
width: 86.21px;
height: 19.92px;
left: 554.78px;
top: 483.87px;

font-family: "Barlow";
font-style: normal;
font-weight: 600;
font-size: 16px;
line-height: 140%; */
/* or 22px */

/* color: #000000; */
