import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../app/store'

export interface FlowrState {
  allFlowers: any[]
  token: string
  favorites: any[]
}

interface AllFlowers {
  favorite: boolean
  id: number
  latin_name: string
  name: string
  profile_picture: string
  sightings: number
}

const initialState: FlowrState = {
  allFlowers: [],
  token: '',
  favorites: [],
}

export const flowrSlice = createSlice({
  name: 'flowr',
  initialState,
  reducers: {
    setAllFlowersList: (state, action: PayloadAction<AllFlowers[]>) => {
      state.allFlowers = action.payload
    },

    setTokenValue: (state, action: PayloadAction<string>) => {
      state.token = action.payload
    },

    setFavoritesList: (state, action: PayloadAction<any>) => {
      state.favorites = action.payload
    },
  },
})

export const {
  setAllFlowersList,
  setTokenValue,
  setFavoritesList,
} = flowrSlice.actions

export const selectAllFlowers = (state: RootState) => state.flowr.allFlowers
export const selectToken = (state: RootState) => state.flowr.token
export const selectFavorites = (state: RootState) => state.flowr.favorites

export default flowrSlice.reducer
