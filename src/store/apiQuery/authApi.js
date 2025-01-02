import { api } from './api';

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: '/d5e1526d-8de3-42b0-a430-a74e28839a5a',
        method: 'POST',
        body: credentials,
      }),
    }),
    sendotp: builder.mutation({
      query: (userData) => ({
        url: '/d5e1526d-8de3-42b0-a430-a74e28839a5a',
        method: 'POST',
        body: userData,
      }),
    }),
    sapDetail: builder.mutation({
      query: (userData) => ({
        url: '/2afb4800-4fe6-4423-9e51-69aa43953294',
        method: 'POST',
        body: userData,
      }),
    }),
  }),
});

export const { useLoginMutation, useSendotpMutation, useSapDetailMutation } = authApi;
