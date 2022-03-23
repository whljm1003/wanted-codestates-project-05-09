import { createSlice } from "@reduxjs/toolkit";
import data from "../assets/data";

const initialState = {
  data: JSON.parse(window.localStorage.getItem("data")) || data,
};

const dataSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {
    increaseLike(state, action) {
      const id = action.payload;
      state.data.map((item) => {
        if (item.id === id) {
          item.likeCnt++;
          item.clicked = true;
        }
      });
      window.localStorage.setItem("data", JSON.stringify(state.data));
    },
    decreaseLike(state, action) {
      const id = action.payload;
      state.data.map((item) => {
        if (item.id === id) {
          item.likeCnt--;
          item.clicked = false;
        }
      });
      window.localStorage.setItem("data", JSON.stringify(state.data));
    },
    addReview(state, action) {
      const newItem = action.payload;
      state.data.unshift({
        id: newItem.id,
        productNm: newItem.productNm,
        productImg: newItem.productImg,
        createDt: newItem.createDt,
        review: newItem.review,
        reviewRate: newItem.reviewRate,
        likeCnt: 0,
      });
      window.localStorage.setItem("data", JSON.stringify(state.data));
    },
    sortedData(state, action) {
      const index = action.payload;
      const newdata = [...data];
      switch (index) {
        case 0:
          state.data = data;
          break;
        case 1:
          state.data = newdata.sort((a, b) => b.likeCnt - a.likeCnt);
          break;
        case 2:
          state.data = newdata.sort(
            (a, b) => b.comments.length - a.comments.length
          );
          break;
        case 3:
          state.data = newdata.sort(() => Math.random() - 0.5);
          break;
        default:
          return state.data;
      }
    },
    addComment(state, action) {},
  },
});

export const { increaseLike, decreaseLike, addReview, sortedData, addComment } =
  dataSlice.actions;

export default dataSlice.reducer;
