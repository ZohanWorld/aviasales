/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchSearchId = createAsyncThunk('data/fetchSearchId', async () => {
  const response = await fetch('https://aviasales-test-api.kata.academy/search')
  const data = await response.json()
  return data.searchId
})

export const fetchTickets = createAsyncThunk('data/fetchTickets', async (searchId, { rejectWithValue }) => {
  try {
    const response = await fetch(`https://aviasales-test-api.kata.academy/tickets?searchId=${searchId}`)
    const data = await response.json()
    if (data.tickets) {
      return data.tickets
    }
    return rejectWithValue('No tickets found')
  } catch (error) {
    return rejectWithValue(error.message)
  }
})

const dataSlice = createSlice({
  name: 'data',
  initialState: {
    data: [],
    searchId: '',
    status: 'idle',
    error: null,
    elemsPerPage: 5,
    tab: 'cheapest',
  },
  reducers: {
    increaseElemsPerPage(state) {
      state.elemsPerPage += 5
    },
    changeTab(state, action) {
      state.tab = action.payload.tab
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchId.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchSearchId.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.searchId = action.payload
      })
      .addCase(fetchSearchId.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(fetchTickets.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchTickets.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.data = action.payload
      })
      .addCase(fetchTickets.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

export const { increaseElemsPerPage, changeTab } = dataSlice.actions

export default dataSlice.reducer
