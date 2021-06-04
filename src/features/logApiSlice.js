import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const logApiSlice = createApi({
  reducerPath: 'logApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:9000',
  }),
  endpoints(builder) {
    return {
      fetchLogs: builder.query({
        query(before = Date.now(), after = 0, limit = 50) {
          return `/logs?limit=${limit}&before=${before}&after=${after}`;
        },
      }),
    };
  },
});

export const { useFetchLogsQuery } = logApiSlice;
export default logApiSlice;
