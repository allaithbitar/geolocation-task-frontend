/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

const inputsSlice = createSlice({
  name: "inputs",
  initialState: {
    address: "",
    email: "",
    sendResultViaMail: false,
  },
  reducers: {
    setEmail: (state, { payload }) => {
      state.email = payload;
    },
    setAddress: (state, { payload }) => {
      state.address = payload;
    },
    setSendResultViaMail: (state, { payload }) => {
      state.sendResultViaMail = payload;
    },
  },
});

export const { setEmail, setAddress, setSendResultViaMail } =
  inputsSlice.actions;

const inputsReducer = inputsSlice.reducer;

export const selectAddressInputValue = () =>
  useSelector((state) => state.inputs.address);

export const selectEmailInputValue = () =>
  useSelector((state) => state.inputs.email);

export const selectSendResultViaMailValue = () =>
  useSelector((state) => state.inputs.sendResultViaMail);

export default inputsReducer;
