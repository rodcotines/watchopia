"use client";
import React, { useState, useEffect } from "react";
import { handleSearch, getTrending } from "@/service";
import { Search as SearchIcon } from "lucide-react";
import { MovieCard } from "./MovieCard";

const Search = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  const fetchTrending = async () => {
    setLoading(true);
    setError(null);
    try {
      const recommendations = await getTrending();
      setResults(recommendations);
    } catch (error) {
      setError("Error fetching recommendations.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrending();
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);
    return () => clearTimeout(handler);
  }, [query]);

  useEffect(() => {
    if (!debouncedQuery) {
      fetchTrending();
      return;
    }

    const fetchResults = async () => {
      setLoading(true);
      setError(null);
      try {
        const searchResults = await handleSearch(debouncedQuery);
        setResults(searchResults);
      } catch (error) {
        setError("Error fetching search results.");
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, [debouncedQuery]);

  return (
    <div className="bg-[#141414] relative min-h-screen pt-24 pb-12">
      {/* Search bar */}
      <div className="px-8 pb-8">
        <div className="relative max-w-2xl mx-auto">
          <SearchIcon
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none"
          />
          <input
            type="text"
            placeholder="Search movies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-white/8 border border-white/10 text-white placeholder-white/30 font-secondary text-sm rounded-xl py-3 pl-11 pr-4 focus:outline-none focus:border-[#FFD700]/50 focus:bg-white/10 transition-all duration-200"
          />
        </div>
      </div>

      {/* Section label */}
      <div className="flex items-center gap-3 px-8 pb-5">
        <div className="w-1 h-5 bg-[#FFD700] rounded-full flex-shrink-0" />
        <h2 className="text-lg font-primary font-semibold text-white tracking-wide">
          {query ? "Search Results" : "Trending Now"}
        </h2>
        {loading && (
          <span className="text-white/30 text-xs font-secondary ml-1">Loading...</span>
        )}
      </div>

      {error && (
        <p className="px-8 text-red-400 text-sm font-secondary mb-4">{error}</p>
      )}

      {/* Results grid */}
      <div className="grid xl:grid-cols-7 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4 px-8">
        {results.map((movie) => (
          <MovieCard key={movie.id} movie={movie} className="h-64 w-full" />
        ))}
      </div>
    </div>
  );
};

export default Search;
