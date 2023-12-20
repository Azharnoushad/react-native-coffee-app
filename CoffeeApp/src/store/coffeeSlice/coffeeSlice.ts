import {createSlice} from '@reduxjs/toolkit';
import CoffeeData from '../../data/CoffeeData';
import BeansData from '../../data/BeansData';

const initialState = {
  coffeeList: CoffeeData,
  BeansList: BeansData,
  favoriteList: [],
  cartList: [],
  orderHistoryList: [],
  cartPrice: 0,
};

const coffeeSlice = createSlice({
  name: 'coffee',
  initialState,
  reducers: {},
});

export default coffeeSlice.reducer;

export const {} = coffeeSlice.actions;
