import { baseApi } from "./baseapi";

const ProjectsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    GetProjectsList: build.query({
      query: () => {
        return {
          url: "projects",
          method: "GET",
        };
      },
    }),
    GetSingleProjectsList: build.query({
      query: (Id: string) => {
        return {
          url: `singleprojects/${Id}`,
          method: "GET",
        };
      },
    }),
  }),
});

export const { useGetProjectsListQuery, useGetSingleProjectsListQuery } =
  ProjectsApi;
