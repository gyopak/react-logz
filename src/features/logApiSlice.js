import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const logApiSlice = createApi({
  reducerPath: 'logApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
  }),
  endpoints(builder) {
    return {
      fetchLogs: builder.query({
        query(limit = 10) {
          return `/logs?limit=${limit}`;
        },
      }),
    };
  },
});

export const { useFetchLogsQuery } = logApiSlice;
export default logApiSlice;
