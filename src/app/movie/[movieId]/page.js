"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { getMoviePopularDetails } from "@/service";
import { Star, Play, Clock, Calendar, ChevronLeft } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useRouter } from "next/navigation";

const MovieDetails = ({ params }) => {
  const [progress, setProgress] = useState(33);
  const { movieId } = params;
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const movieData = await getMoviePopularDetails(movieId);
        setMovie(movieData);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch movie details");
        setLoading(false);
      }
    };
    fetchMovieDetails();
  }, [movieId]);

  if (loading) {
    return (
      <div className="h-screen flex flex-col items-center justify-center bg-[#141414] space-y-4">
        <h1 className="font-primary text-5xl font-black bg-gradient-to-r from-[#FFD700] to-[#FFA500] bg-clip-text text-transparent">
          WATCHOPIA
        </h1>
        <Progress value={progress} className="w-[30%]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen bg-[#141414] flex items-center justify-center">
        <p className="text-red-400 font-secondary">{error}</p>
      </div>
    );
  }

  if (!movie) return null;

  const trailer = movie.videos.find(
    (video) => video.type === "Trailer" && video.site === "YouTube"
  );

  const ratingColor =
    movie.vote_average >= 7
      ? "text-green-400"
      : movie.vote_average >= 5
      ? "text-yellow-400"
      : "text-red-400";

  return (
    <div className="relative min-h-screen bg-[#141414]">
      {/* Full-bleed backdrop */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
        }}
      >
        {/* Side gradient (left → transparent) for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#141414] via-[#141414]/85 to-transparent" />
        {/* Bottom gradient into page bg */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-[#141414]/50" />
      </div>

      {/* Back button */}
      <div className="relative z-10 pt-6 px-8">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1.5 text-white/50 hover:text-white transition-colors text-sm font-secondary"
        >
          <ChevronLeft size={16} />
          Back
        </button>
      </div>

      {/* Main content */}
      <div className="relative z-10 px-8 lg:px-16 pt-8 pb-20">
        <div className="max-w-2xl">
          {/* Title */}
          <h1 className="font-primary text-4xl lg:text-6xl font-black text-white leading-tight mb-4">
            {movie.title}
          </h1>

          {/* Metadata row */}
          <div className="flex items-center flex-wrap gap-5 mb-5 font-secondary text-sm">
            <span className={`font-bold text-base flex items-center gap-1.5 ${ratingColor}`}>
              <Star size={14} className="fill-current" />
              {movie.vote_average.toFixed(1)}
            </span>
            <span className="flex items-center gap-1.5 text-white/55">
              <Calendar size={13} />
              {movie.release_date?.substring(0, 4)}
            </span>
            <span className="flex items-center gap-1.5 text-white/55">
              <Clock size={13} />
              {movie.runtime} min
            </span>
          </div>

          {/* Genre pills */}
          <div className="flex flex-wrap gap-2 mb-6">
            {movie.genres.map((gen) => (
              <span
                key={gen.id}
                className="px-3 py-1 rounded-full text-xs font-medium font-secondary bg-white/10 text-white/75 border border-white/15"
              >
                {gen.name}
              </span>
            ))}
          </div>

          {/* Overview */}
          <p className="font-secondary text-white/70 text-base leading-relaxed mb-8 max-w-xl">
            {movie.overview}
          </p>

          {/* Action buttons */}
          <div className="flex items-center gap-3">
            {trailer && (
              <button
                className="flex items-center gap-2 px-8 py-3 bg-white hover:bg-white/90 text-black font-bold rounded-lg transition-all duration-200 font-primary text-sm shadow-lg"
                onClick={() => setIsTrailerOpen(true)}
              >
                <Play size={16} className="fill-black" />
                Watch Trailer
              </button>
            )}
          </div>
        </div>

        {/* Cast section */}
        <div className="mt-16">
          <h2 className="font-primary text-lg font-semibold text-white mb-5">
            Cast
          </h2>
          <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
            {movie.cast.slice(0, 8).map((member) => (
              <div key={member.cast_id} className="flex-shrink-0 w-28">
                <div className="relative h-36 w-28 rounded-xl overflow-hidden mb-2 bg-white/5">
                  {member.profile_path ? (
                    <Image
                      src={`https://image.tmdb.org/t/p/w500${member.profile_path}`}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center text-white/25 text-xs font-secondary text-center px-2">
                      No Image
                    </div>
                  )}
                </div>
                <p className="text-white text-xs font-semibold font-primary leading-tight line-clamp-2">
                  {member.name}
                </p>
                <p className="text-white/40 text-xs font-secondary mt-0.5 line-clamp-1">
                  {member.character}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Trailer modal */}
      {isTrailerOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black/90 z-50 p-4"
          onClick={() => setIsTrailerOpen(false)}
        >
          <div
            className="rounded-2xl overflow-hidden max-w-4xl w-full shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              width="100%"
              height="500"
              src={`https://www.youtube.com/embed/${trailer?.key}`}
              style={{ border: 0 }}
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Movie Trailer"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetails;
