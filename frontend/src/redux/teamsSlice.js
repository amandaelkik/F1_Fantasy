import { createAsyncThunk, createSlice, isAnyOf } from '@reduxjs/toolkit'
import { teamsApi } from '../api/teamsApi'

export const fetchTeams = createAsyncThunk('teams/fetchAll', () => teamsApi.getAll())
export const fetchTeamById = createAsyncThunk('teams/fetchOne', (id) => teamsApi.getOne(id))
export const fetchCatalog = createAsyncThunk('teams/fetchCatalog', () => teamsApi.getCatalog())
export const createTeam = createAsyncThunk('teams/create', (values) => teamsApi.create(values))
export const updateTeam = createAsyncThunk('teams/update', ({ id, values }) => teamsApi.update(id, values))
export const deleteTeam = createAsyncThunk('teams/delete', async (id) => {
  const data = await teamsApi.remove(id)
  return data.team.id
})

const initialState = {
  items: [], selectedTeam: null, drivers: [], constructors: [],
  listStatus: 'idle', detailStatus: 'idle', catalogStatus: 'idle',
  saveStatus: 'idle', deleteStatus: 'idle',
  listError: null, detailError: null, catalogError: null,
  saveError: null, deleteError: null, detailRequestId: null,
}

const teamsSlice = createSlice({
  name: 'teams', initialState,
  reducers: {
    resetTeamFeedback(state) {
      state.saveStatus = 'idle'
      state.deleteStatus = 'idle'
      state.saveError = null
      state.deleteError = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeams.pending, (state) => {
        state.listStatus = 'loading'; state.listError = null
      })
      .addCase(fetchTeams.fulfilled, (state, action) => {
        state.listStatus = 'succeeded'; state.items = action.payload
      })
      .addCase(fetchTeams.rejected, (state, action) => {
        state.listStatus = 'failed'; state.listError = action.error.message
      })
      .addCase(fetchTeamById.pending, (state, action) => {
        state.detailStatus = 'loading'; state.detailError = null
        state.selectedTeam = null; state.detailRequestId = action.meta.requestId
      })
      .addCase(fetchTeamById.fulfilled, (state, action) => {
        if (state.detailRequestId !== action.meta.requestId) return
        state.detailStatus = 'succeeded'; state.selectedTeam = action.payload
      })
      .addCase(fetchTeamById.rejected, (state, action) => {
        if (state.detailRequestId !== action.meta.requestId) return
        state.detailStatus = 'failed'; state.detailError = action.error.message
      })
      .addCase(fetchCatalog.pending, (state) => {
        state.catalogStatus = 'loading'; state.catalogError = null
      })
      .addCase(fetchCatalog.fulfilled, (state, action) => {
        state.catalogStatus = 'succeeded'
        state.drivers = action.payload.drivers
        state.constructors = action.payload.constructors
      })
      .addCase(fetchCatalog.rejected, (state, action) => {
        state.catalogStatus = 'failed'; state.catalogError = action.error.message
      })
      .addCase(createTeam.fulfilled, (state, action) => {
        state.saveStatus = 'succeeded'
        state.items.push(action.payload); state.selectedTeam = action.payload
      })
      .addCase(updateTeam.fulfilled, (state, action) => {
        state.saveStatus = 'succeeded'; state.selectedTeam = action.payload
        state.items = state.items.map(team => team.id === action.payload.id ? action.payload : team)
      })
      .addCase(deleteTeam.pending, (state) => {
        state.deleteStatus = 'loading'; state.deleteError = null
      })
      .addCase(deleteTeam.fulfilled, (state, action) => {
        state.deleteStatus = 'succeeded'
        state.items = state.items.filter(team => team.id !== action.payload)
        if (state.selectedTeam?.id === action.payload) state.selectedTeam = null
      })
      .addCase(deleteTeam.rejected, (state, action) => {
        state.deleteStatus = 'failed'; state.deleteError = action.error.message
      })
      .addMatcher(isAnyOf(createTeam.pending, updateTeam.pending), (state) => {
        state.saveStatus = 'loading'; state.saveError = null
      })
      .addMatcher(isAnyOf(createTeam.rejected, updateTeam.rejected), (state, action) => {
        state.saveStatus = 'failed'; state.saveError = action.error.message
      })
  },
})

export const { resetTeamFeedback } = teamsSlice.actions
export default teamsSlice.reducer
