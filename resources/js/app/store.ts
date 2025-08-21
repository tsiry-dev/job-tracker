import { configureStore } from '@reduxjs/toolkit'
import studentReducer from '@/features/studentSlice'
import vagueReducer from '@/features/vagueSlice'
import levelSlice from '@/features/levelSlice'


export const store = configureStore({
  reducer: {
     students: studentReducer,
     vagues: vagueReducer,
     levels: levelSlice
  },
})

export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
