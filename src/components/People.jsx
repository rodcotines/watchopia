"use client";
import React, { useEffect, useState } from "react";
import { getPopularPeople } from "@/service";
import { Activity } from "lucide-react";

function People() {
  const [peopleList, setPeopleList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPeople = async () => {
      try {
        const trendingPeople = await getPopularPeople();
        setPeopleList(trendingPeople);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching trending people:", error);
        setError("Failed to fetch trending people");
        setLoading(false);
      }
    };

    fetchPeople();
  }, []);

  if (loading) {
    return <p>Loading...</p>; // Placeholder for loading state
  }

  if (error) {
    return <p>{error}</p>; // Placeholder for error state
  }

  return (
    <div className="p-4 bg-black text-white">
      <div className="flex w-full px-4 py-2 text-2xl font-primary">
        <h1>Top People</h1>
      </div>
      <div className="flex overflow-x-auto space-x-4 px-4 py-2">
        {peopleList.map((actor, i) => (
          <div key={i} className="h-96 rounded-md duration-300">
            <div className="h-3/4 w-48 cursor-pointer transition-all hover:scale-105 relative">
              <div
                className="absolute inset-0 bg-cover bg-center rounded-md"
                style={{
                  backgroundImage: `url('https://image.tmdb.org/t/p/w500${actor.profile_path}')`,
                }}
              ></div>
            </div>
            <div className="py-4">
              <div className="flex flex-col justify-between h-16">
                <h1 className="text-white hover:text-primary-dark block cursor-pointer text-sm font-semibold transition-colors duration-300">
                  {actor.name}
                </h1>
                <div className="flex justify-between items-center mt-1">
                  <p className="text-sm text-gray-400 font-secondary">
                    {actor.known_for_department}
                  </p>
                  <p className="text-sm text-gray-400 font-secondary flex items-center">
                    <span className="mr-1">
                      {" "}
                      <Activity
                        size={20}
                        className="fill-[#FFD700] text-[#FFD700]"
                      />
                    </span>
                    {actor.popularity} %
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default People;
