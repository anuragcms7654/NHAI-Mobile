import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://your-api-base-url.com', // Replace with your actual API base URL
  prepareHeaders: (headers, { getState }) => {
    const token = getState()?.auth?.token; // Assuming auth slice stores the token
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

export const api = createApi({
  baseQuery,
  endpoints: () => ({}), // Empty endpoints for now; each module will extend this
});

export default api;
