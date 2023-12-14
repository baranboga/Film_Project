import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Product {
  original_title: string;
  poster_path: string;
  id: string;
}

interface CounterState {
  value: object[];
  FavoriteList: Product[];
  toplam: number;
  keyword: string;
}

const initialState: CounterState = {
  value: [],
  FavoriteList: [],
  toplam: 0,
  keyword: "",
};

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    holdkey: (state, action: PayloadAction<string>) => {
      state.keyword = action.payload;
      console.log(state.keyword);
    },
    addfavorite: (state, action: PayloadAction<Product>) => {
      const newItem = { ...action.payload };
      const existingItem = state.FavoriteList.find(
        (item) => item.id === newItem.id
      );

      if (existingItem) {
        alert("Item already in favorites!");
      } else {
        state.FavoriteList = [...state.FavoriteList, newItem];
       
      }
    },
  },
});

export const selectCount = (state: { counter: CounterState }) =>
  state.counter.value;
export const selectToplam = (state: { counter: CounterState }) =>
  state.counter.toplam;
export const selectFavoriteList = (state: { counter: CounterState }) =>
  state.counter.FavoriteList;
export const selectKeyword = (state: { counter: CounterState }) =>
  state.counter.keyword;

export const { holdkey, addfavorite } = counterSlice.actions;

export default counterSlice.reducer;
