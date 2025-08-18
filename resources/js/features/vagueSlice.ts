import { Student } from '@/types/student';
import { Vague } from '@/types/vague';
import { createSlice } from '@reduxjs/toolkit'

interface VagueStateInterface {
  actifs: Vague[];
  vagues: Vague[];
  selectedVague: Vague | null;
}

const initialState: VagueStateInterface = {
  actifs: [],
  vagues: [],
  selectedVague: null
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

    }

  },
})

export const { setActif , setVague, handleUpdateStudentSlice, handleSelectedVague} = vagueSlice.actions
export default vagueSlice.reducer
