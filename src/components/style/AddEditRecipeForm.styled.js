import styled from "styled-components";

export const ModalAddEdit = styled.div`
  width: 940px;
  margin: 70px;
  padding: 20px 50px 50px 50px;
  position: fixed;
  z-index: 1;
  background-color: white;
  display: flex;
  flex-direction: column;
  border-radius: 0.4rem;
  margin-bottom: 3rem;
  background: #fff;
`;

export const IngredientsForm = styled.div`
  display: flex;
  justify-content: space-between;
  label {
    gap: 5px;
    margin-top: 14px;
  }
`;

export const IngredientsList = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  border: 0.1rem solid #000;
  border-collapse: collapse;
  table {
    margin-bottom: 1rem;
    border: 0.1rem solid #000;
    border-collapse: collapse;
    td {
      border: 0.1rem solid #000;
      border-collapse: collapse;
    }
  }
`;

export const TopFormSection = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
`;

export const Fields = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: end;
  margin-bottom: 0.5rem;
  gap: 15px;
  label {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
    display: flex;
    gap: 5px;
    align-items: center;
  }
`;

export const ImageInputBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 20rem;
  object-fit: cover;
  width: 12rem;
  border-radius: 0.4rem 0.4rem 0 0;
`;

export const ActionButtons = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const NoIngredients = styled.h3`
  text-align: center;
  color: #f00;
`;

export const DeleteButtonIng = styled.h4`
  text-align: center;
  color: #9f1108;
  &:hover {
    cursor: pointer;
    color: #f00;
  }
  margin: 0;
`;
