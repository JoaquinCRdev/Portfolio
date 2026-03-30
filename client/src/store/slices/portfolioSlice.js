import { createSlice } from '@reduxjs/toolkit';
import { portfolioData } from '../../data/portfolioData';

const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState: {
    data: portfolioData,
  },
  reducers: {},
});

export default portfolioSlice.reducer;
