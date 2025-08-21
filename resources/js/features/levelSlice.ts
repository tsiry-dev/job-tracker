
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    isOpenModal: false,
    selectedLevel: null,
    lists: []
}

const levelSlice = createSlice({
  name: 'level',
  initialState,
  reducers: {
    getLevelHandler(state, action) {
        state.lists = action.payload;
    },
    openModalHandler(state) {
      state.isOpenModal = true;
    },
    closeModalHandler(state) {
      state.isOpenModal = false;
    },

  },
})

export const {
    openModalHandler,
    closeModalHandler,
    getLevelHandler
} = levelSlice.actions

export default levelSlice.reducer
