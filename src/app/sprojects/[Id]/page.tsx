"use client";
import { useGetSingleProjectsListQuery } from "@/Redux/api/ProjectsApi";
import { Tprops } from "@/Types";
import LoaderPage from "@/components/Loader/Loader";
import Image from "next/image";
import Link from "next/link";
import { AiFillGithub, AiOutlineDeliveredProcedure } from "react-icons/ai";

const SinglePage = (params: Tprops) => {
  const id = params.params.Id;

  const { data, isFetching, isLoading } = useGetSingleProjectsListQuery(id);
  const item = data?.result;

  return (
    <div>
      {isFetching && isLoading ? (
        <div className="mt-72">
          <LoaderPage />
        </div>
      ) : (
        <div className="flex text-white justify-center mt-10">
          {/* Left Column (Photo) */}
          <div className="p-6">
            <Image
              src={item?.img || ""}
              width={800}
              height={500}
              alt="Project"
              className="rounded-lg w-[400px] h-[300px]"
            />
          </div>

          {/* Right Column (Project Details) */}
          <div className="w-1/2 p-6">
            <h1 className="text-2xl font-semibold mb-4">
              {item?.name || "no name"}
            </h1>
            <p className="text-gray-500 mb-4">
              {item?.driscaption || "no discraotion"}
            </p>
            <p className="text-gray-400 mb-4">
              Technologies used: {item?.technologies || ""}
            </p>
            <div className="flex space-x-4 mb-4">
              <Link
                href={item?.Live}
                className="text-gray-400 flex items-center gap-2 bg-primary/60 rounded-full px-3 py-1">
                Live
                <AiOutlineDeliveredProcedure className=" size-6 lg:size-10 md:size-7 text-primary  border-2 rounded-full p-[3px] lg:p-2 md:p-1 border-primary  hover:text-white hover:bg-primary duration-500" />
              </Link>
              <Link
                href={item?.githubClient}
                className="text-gray-400 flex items-center gap-2 bg-primary/60 rounded-full px-3 py-1">
                Client
                <AiFillGithub className=" size-6 lg:size-10 md:size-7 text-primary  border-2 rounded-full p-[3px] lg:p-2 md:p-1 border-primary  hover:text-white hover:bg-primary duration-500" />
              </Link>
              <Link
                href={item?.githubServer}
                className="text-gray-400 flex items-center gap-2 bg-primary/60 rounded-full px-3 py-1">
                Server
                <AiFillGithub className=" size-6 lg:size-10 md:size-7 text-primary  border-2 rounded-full p-[3px] lg:p-2 md:p-1 border-primary  hover:text-white hover:bg-primary duration-500" />
              </Link>
            </div>
            <div className="flex space-x-4">
              <Link
                href="/"
                className="p-1 border-2 border-primary rounded-full hover:bg-primary/50 duration-700">
                Back to Portfolio
              </Link>
            </div>
            {/* Social media icons */}
            {/* Add your social media icons here */}
          </div>
        </div>
      )}
    </div>
  );
};

export default SinglePage;
