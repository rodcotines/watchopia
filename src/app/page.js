import dynamic from "next/dynamic";
import Slider from "@/components/Slider";

const Popular = dynamic(() => import("@/components/Popular"));
const Upcoming = dynamic(() => import("@/components/Upcoming"));
const TopRated = dynamic(() => import("@/components/TopRated"));
const People = dynamic(() => import("@/components/People"));

export default function Home() {
  return (
    <div>
      <Slider />

      <Popular />
      <Upcoming />
      <TopRated />

      <People />
    </div>
  );
}
