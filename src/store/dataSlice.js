/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchSearchId = createAsyncThunk('data/fetchSearchId', async () => {
  const response = await fetch('https://aviasales-test-api.kata.academy/search')
  const data = await response.json()
  return data.searchId
})

export const fetchTickets = createAsyncThunk('data/fetchTickets', async (searchId, { rejectWithValue }) => {
  const MAX_RETRIES = 30
  let tickets = []
  let stop = false
  let attempts = 0

  while (!stop && attempts < MAX_RETRIES) {
    try {
      const response = await fetch(`https://aviasales-test-api.kata.academy/tickets?searchId=${searchId}`)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      if (data.tickets) {
        tickets = tickets.concat(data.tickets)
        stop = data.stop
      } else {
        return rejectWithValue('No tickets found')
      }
    } catch (error) {
      attempts++
      if (attempts >= MAX_RETRIES) {
        return rejectWithValue(error.message)
      }
    }
  }
  return tickets
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
        state.data = state.data.concat(action.payload)
      })
      .addCase(fetchTickets.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

export const { increaseElemsPerPage, changeTab } = dataSlice.actions

export default dataSlice.reducer
