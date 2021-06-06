import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const logApiSlice = createApi({
  reducerPath: 'logApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:9000',
  }),
  endpoints(builder) {
    return {
      fetchNewLogs: builder.query({
        query(after = 0, before = Date.now(), limit = 50) {
          return `/logs?limit=${limit}&before=${before}&after=${after}`;
        },
      }),
      fetchOldLogs: builder.query({
        query(before = Date.now(), limit = 100) {
          return `/logs?limit=${limit}&before=${before}`;
        },
      }),
    };
  },
});

export const { useFetchNewLogsQuery, useFetchOldLogsQuery } = logApiSlice;
export default logApiSlice;
