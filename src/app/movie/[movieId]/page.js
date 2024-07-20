// app/movie/[movieId]/page.js
"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { getMoviePopularDetails } from "@/service";
import { Star } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const MovieDetails = ({ params }) => {
  const [progress, setProgress] = useState(33);
  const { movieId } = params;
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setProgress(55), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const movieData = await getMoviePopularDetails(movieId);
        console.log("Movie data:", movieData);
        setMovie(movieData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movie details:", error);
        setError("Failed to fetch movie details");
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (loading) {
    return (
      <div className="h-screen flex flex-col items-center justify-center mx-auto space-y-4 bg-primary-foreground">
        <h1 className="font-primary text-5xl font-black text-[#FFD700]">
          WATCHOPIA
        </h1>
        <Progress value={progress} className="w-[30%] text-[#FFD700]" />
      </div>
    ); // Placeholder for loading state
  }
  if (error) return <p>{error}</p>;
  if (!movie) return null;

  return (
    <div className="relative min-h-screen">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-10 bg-gradient-to-b from-transparent to-black"></div>
        <div className="relative p-4 text-white flex flex-col justify-start min-h-screen lg:flex-row lg:items-center lg:p-8">
          <div className="flex flex-col lg:max-w-2xl lg:mr-8">
            <h1 className="text-4xl lg:text-6xl font-black font-primary mb-4 lg:mb-6 pt-10">
              {movie.title}
            </h1>
            <p className="font-secondary text-[#BFBFBF] mb-4 lg:mb-6">
              {movie.release_date.substring(0, 4)}
              {" ◦ "} {movie.runtime} min {" ◦ "}{" "}
              {movie.genres.map((gen) => gen.name).join(" ◦ ")}
            </p>
            <p className="max-w-screen-md text-white font-secondary font-medium mb-6 lg:mb-8">
              {movie.overview}
            </p>
            <div className="mt-4">
              <h2 className="text-2xl lg:text-3xl font-primary font-semibold mb-4 lg:mb-6">
                Cast
              </h2>
              <div className="flex overflow-x-auto lg:overflow-visible space-x-4 py-2">
                {movie.cast.slice(0, 5).map((member) => (
                  <div key={member.cast_id} className="h-72 w-32 flex-shrink-0">
                    <div className="cursor-pointer transition-all hover:scale-105 relative">
                      {member.profile_path ? (
                        <Image
                          src={`https://image.tmdb.org/t/p/w500${member.profile_path}`}
                          alt={member.name}
                          width={128}
                          height={192}
                          className="h-48 w-32 rounded-md object-cover"
                        />
                      ) : (
                        <div className="absolute inset-0 h-full w-full object-cover rounded-md bg-gray-800 flex items-center justify-center text-white">
                          No Image is seen
                        </div>
                      )}
                    </div>
                    <div className="py-2">
                      <div className="flex flex-col justify-between h-16">
                        <h1 className="text-white hover:text-primary-dark block cursor-pointer text-sm font-semibold transition-colors duration-300 hover:text-danger">
                          {member.name.length > 30
                            ? `${member.name.substring(0, 27)}...`
                            : member.name}
                        </h1>
                        <div className="flex justify-between items-center mt-1">
                          <p className="text-sm text-gray-400 font-secondary">
                            {member.character}
                          </p>
                          <p className="flex items-center text-sm text-gray-400 font-secondary">
                            <Star size={20} className="mr-1 fill-[#FFD700]" />
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
