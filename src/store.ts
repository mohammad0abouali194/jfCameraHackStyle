import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface ProductionData {
  id: number
  pellet_size_dist: number
  sphericity: number
  broken_pellet_percent: number
  sponge_iron_size_dist: number
  broken_sponge_iron_percent: number
  not_reduced_sponge_iron_percent: number
  createdAt: string
}

interface ProductionState {
  data: ProductionData[]
}

const initialState: ProductionState = {
  data: [],
}

const productionSlice = createSlice({
  name: 'production',
  initialState,
  reducers: {
    updateProductionData: (state, action: PayloadAction<ProductionData>) => {
      state.data.push(action.payload)
      if (state.data.length > 12) {
        state.data.shift()
      }
    },
  },
})

export const { updateProductionData } = productionSlice.actions

export const store = configureStore({
  reducer: {
    production: productionSlice.reducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch