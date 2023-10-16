import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
// import {"https://rx-opd-prod-4gag6.ondigitalocean.app/v2/",live} from "../../../.env"

const initialState = {
  loading: false,
  profiles: [],
  error: '',
};

export const fetchProfiles = createAsyncThunk(
  'profile/fetchProfiles',
  profileParams => {
    return axios
      .get(`${"https://rx-opd-prod-4gag6.ondigitalocean.app/v2/"}list/patient/profiles/${live}`, {
        headers: {
          pt_token: profileParams.pt_token,
          pt_key: profileParams.pt_key,
        },
      })
      .then(response => {console.log("--------------------------?   ",response.data); return response.data});
  },
);

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  extraReducers: builder => {
    builder.addCase(fetchProfiles.pending, state => {
      state.loading = true;
    });
    builder.addCase(fetchProfiles.fulfilled, (state, action) => {
      state.loading = false;
      state.profiles = action.payload;
      state.error = '';
    });
    builder.addCase(fetchProfiles.rejected, (state, action) => {
      state.loading = false;
      state.profiles = [];
      state.error = action.error.message;
    });
  },
});

export default profileSlice.reducer;
