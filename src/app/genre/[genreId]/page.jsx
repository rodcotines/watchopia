"use client";

import React, { useEffect, useState } from "react";
import { getMoviesByGenre } from "@/service";
import { genres } from "@/utils";
import { MovieCard } from "@/components/MovieCard";
import { ChevronLeft, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function GenreMoviesPage({ params }) {
  const genreId = parseInt(params.genreId);
  const genre = genres.find((g) => g.id === genreId);
  const router = useRouter();

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true);
        const results = await getMoviesByGenre(genreId, 1);
        setMovies(results);
        setHasMore(results.length === 20);
      } catch (e) {
        setError("Failed to load movies.");
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [genreId]);

  const loadMore = async () => {
    if (loadingMore) return;
    try {
      setLoadingMore(true);
      const nextPage = page + 1;
      const results = await getMoviesByGenre(genreId, nextPage);
      setMovies((prev) => [...prev, ...results]);
      setPage(nextPage);
      setHasMore(results.length === 20);
    } catch (e) {
      setError("Failed to load more movies.");
    } finally {
      setLoadingMore(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#141414] pt-24 pb-16 px-8">
      {/* Back + header */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-1.5 text-white/50 hover:text-white transition-colors text-sm font-secondary mb-8"
      >
        <ChevronLeft size={16} />
        All Genres
      </button>

      <div className="mb-10">
        <p className="font-secondary text-xs uppercase tracking-[0.3em] text-[#FFD700] font-semibold mb-2">
          Genre
        </p>
        <h1 className="font-primary text-4xl font-black text-white">
          {genre?.name ?? "Movies"}
        </h1>
        {!loading && (
          <p className="font-secondary text-white/40 text-sm mt-2">
            {movies.length} movies loaded
          </p>
        )}
      </div>

      {/* Loading state */}
      {loading && (
        <div className="flex items-center justify-center py-24">
          <Loader2 size={32} className="text-[#FFD700] animate-spin" />
        </div>
      )}

      {error && (
        <p className="text-red-400 font-secondary text-sm">{error}</p>
      )}

      {/* Movie grid */}
      {!loading && (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-4">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} className="h-64 w-full" />
            ))}
          </div>

          {/* Load more */}
          {hasMore && (
            <div className="flex justify-center mt-10">
              <button
                onClick={loadMore}
                disabled={loadingMore}
                className="flex items-center gap-2 px-8 py-3 bg-white/10 hover:bg-white/15 border border-white/10 text-white font-primary font-semibold text-sm rounded-xl transition-all duration-200 disabled:opacity-50"
              >
                {loadingMore ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Loading...
                  </>
                ) : (
                  "Load More"
                )}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
