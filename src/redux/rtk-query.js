import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const geolocationApi = createApi({
  reducerPath: "geolocationApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
  }),
  endpoints: (builder) => ({
    searchGeoLocation: builder.mutation({
      query: (payload) => ({
        url: "/geolocation/search",
        body: payload,
        method: "POST",
      }),
    }),
  }),
});

export const { useSearchGeoLocationMutation } = geolocationApi;
