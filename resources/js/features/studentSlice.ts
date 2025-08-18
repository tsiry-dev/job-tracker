import { Student } from '@/types/student';
import { createSlice } from '@reduxjs/toolkit'

interface StudentStateInterface {
  lists: number[];
  selected: Student | null;
}

const initialState: StudentStateInterface = {
  lists: [15,12,23],
  selected: null
}

const studentSlice = createSlice({
  name: 'student',
  initialState,
  reducers: {
    handleStudentSelected(state, action) {
      state.selected = action.payload;
    },
    handleResetStudentSelected(state) {
      state.selected = null;
    },
  },
})

export const { handleStudentSelected, handleResetStudentSelected } = studentSlice.actions
export default studentSlice.reducer
