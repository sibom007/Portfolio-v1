import { baseApi } from "./baseapi";

const skillsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    GetSkillsList: build.query({
      query: () => {
        return {
          url: "skills",
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetSkillsListQuery } = skillsApi;
