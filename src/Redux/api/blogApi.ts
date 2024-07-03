import { baseApi } from "./baseapi";

const BlogApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    GetBlogList: build.query({
      query: () => {
        return {
          url: "blogs",
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetBlogListQuery } = BlogApi;
