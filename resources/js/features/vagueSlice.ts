import { Student } from '@/types/student';
import { Vague } from '@/types/vague';
import { createSlice } from '@reduxjs/toolkit'

interface VagueStateInterface {
  actifs: Vague[];
  vagues: Vague[];
  selectedVague: Vague | null;
  isCreateStudent: boolean;
  selectedStudentDetail: Student | null;
}

const initialState: VagueStateInterface = {
  actifs: [],
  vagues: [],
  selectedVague: null,
  isCreateStudent: false,
  selectedStudentDetail: null
}

const vagueSlice = createSlice({
  name: 'vague',
  initialState,
  reducers: {
    setVague(state, action) {
       state.vagues = action.payload;
    },
    setActif(state, action) {
       state.actifs = action.payload;
    },
    handleSelectedVague(state, action) {
       state.selectedVague = action.payload;
    },
    handleUpdateStudentSlice(state, action) {
        console.log(JSON.parse(JSON.stringify(state.vagues)));
        console.log(action.payload);
    },
    createStudentHandler(state) {
       state.isCreateStudent = true;
    },
    closeCreateStudentHandler(state) {
       state.isCreateStudent = false;
    },
    selectedStudentDetailHandler(state, action) {
      state.selectedStudentDetail = action.payload;
    },
    removeSelectedStudentDetail(state) {
      state.selectedStudentDetail = null;
    }

  },
})

export const {
    setActif ,
    setVague,
    handleUpdateStudentSlice,
    handleSelectedVague,
    createStudentHandler,
    closeCreateStudentHandler,
    selectedStudentDetailHandler,
    removeSelectedStudentDetail
} = vagueSlice.actions
export default vagueSlice.reducer
