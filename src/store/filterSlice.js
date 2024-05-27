import { createSlice } from '@reduxjs/toolkit'

const filterSlice = createSlice({
  name: 'filter',
  initialState: {
    all: { active: true, stops: null },
    direct: { active: true, stops: 0 },
    oneStop: { active: true, stops: 1 },
    twoStops: { active: true, stops: 2 },
    threeStops: { active: true, stops: 3 },
  },
  reducers: {
    toggleAll(state) {
      const newState = {
        all: { ...state.all, active: !state.all.active },
        direct: { ...state.direct, active: !state.all.active },
        oneStop: { ...state.oneStop, active: !state.all.active },
        twoStops: { ...state.twoStops, active: !state.all.active },
        threeStops: { ...state.threeStops, active: !state.all.active },
      }

      return newState
    },
    toggleFilter(state, action) {
      const newState = {
        ...state,
        [action.payload]: {
          ...state[action.payload],
          active: !state[action.payload].active,
        },
      }

      const allFiltersSelected =
        newState.direct.active && newState.oneStop.active && newState.twoStops.active && newState.threeStops.active

      return {
        ...newState,
        all: { ...newState.all, active: allFiltersSelected },
      }
    },
  },
})

export const { toggleAll, toggleFilter } = filterSlice.actions

export default filterSlice.reducer
