"use client";
import React, { useEffect, useState } from "react";
import { getPopularPeople } from "@/service";
import { TrendingUp } from "lucide-react";

function People() {
  const [peopleList, setPeopleList] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPeople = async () => {
      try {
        const people = await getPopularPeople();
        setPeopleList(people);
      } catch (error) {
        setError("Failed to fetch popular people");
      }
    };

    fetchPeople();
  }, []);

  if (error) return <p className="p-4 text-red-400 font-secondary">{error}</p>;

  return (
    <section className="py-10 bg-[#1a1a1a]">
      <div className="flex items-center gap-3 px-8 pb-5">
        <div className="w-1 h-6 bg-[#FFD700] rounded-full flex-shrink-0" />
        <h2 className="text-xl font-primary font-semibold text-white tracking-wide">
          Top People
        </h2>
      </div>
      <div className="flex overflow-x-auto gap-4 px-8 pb-2 scrollbar-hide">
        {peopleList.map((actor) => (
          <div key={actor.id} className="flex-shrink-0">
            <div className="relative h-72 w-48 rounded-xl overflow-hidden cursor-pointer group">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                style={{
                  backgroundImage: `url('https://image.tmdb.org/t/p/w500${actor.profile_path}')`,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" />
              <div className="absolute inset-0 ring-1 ring-white/5 rounded-xl" />
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <h3 className="text-white text-xs font-semibold leading-tight line-clamp-1 mb-1.5">
                  {actor.name}
                </h3>
                <div className="flex items-center justify-between">
                  <span className="text-white/50 text-xs">
                    {actor.known_for_department}
                  </span>
                  <span className="flex items-center gap-1 text-[#FFD700] text-xs font-semibold">
                    <TrendingUp size={10} />
                    {Math.round(actor.popularity)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default People;
