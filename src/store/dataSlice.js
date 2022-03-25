import { createSlice } from "@reduxjs/toolkit";
import data from "../assets/data";
import { v1 as userId } from "uuid";

const initialState = {
  data:
    JSON.parse(window.sessionStorage.getItem("data")) ||
    data.sort((a, b) => b.createDt - a.createDt),
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
      window.sessionStorage.setItem("data", JSON.stringify(state.data));
    },
    decreaseLike(state, action) {
      const id = action.payload;
      state.data.map((item) => {
        if (item.id === id) {
          item.likeCnt--;
          item.clicked = false;
        }
      });
      window.sessionStorage.setItem("data", JSON.stringify(state.data));
    },
    addReview(state, action) {
      const newItem = action.payload;
      state.data.unshift({
        id: userId(),
        productNm: newItem.productNm,
        productImg: newItem.productImg,
        createDt: newItem.createDt,
        review: newItem.review,
        reviewRate: newItem.reviewRate,
        comments: [],
        likeCnt: 0,
      });
      window.sessionStorage.setItem("data", JSON.stringify(state.data));
    },
    sortedData(state, action) {
      const index = action.payload;
      const LastestData = [...data];
      switch (index) {
        case 0:
          state.data.sort((a, b) => b.createDt - a.createDt);
          break;
        case 1:
          state.data.sort((a, b) => b.likeCnt - a.likeCnt);
          break;
        case 2:
          state.data.sort((a, b) => b.comments?.length - a.comments?.length);
          break;
        case 3:
          state.data.sort(() => Math.random() - 0.5);
          break;
        default:
          state.data = LastestData;
          break;
      }
    },
    addComments(state, action) {
      const { id, comment } = action.payload;
      const target = state.data.filter((data) => data.id === id.id);
      target[0].comments.push({
        commentId: userId(),
        comment,
      });
      window.sessionStorage.setItem("data", JSON.stringify(state.data));
    },
  },
});

export const {
  increaseLike,
  decreaseLike,
  addReview,
  sortedData,
  addComments,
} = dataSlice.actions;

export default dataSlice.reducer;
