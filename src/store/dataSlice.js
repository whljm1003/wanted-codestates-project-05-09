import { createSlice } from "@reduxjs/toolkit";
import data from "../assets/data";

const initialState = {
  data: data,
};

const dataSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {
    addStar(state, action) {},
    addReview(state, action) {
      const newItem = action.payload;
      state.data.push({
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
    addComment(state, action) {},
  },
});

export const { addStar, addReview, addComment } = dataSlice.actions;

export default dataSlice.reducer;
