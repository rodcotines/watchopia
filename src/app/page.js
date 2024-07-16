import People from "@/components/People";
import Popular from "@/components/Popular";
import Slider from "@/components/Slider";
import TopRated from "@/components/TopRated";
import Upcoming from "@/components/Upcoming";

export default function Home() {
  return (
    <div>
      <Slider />
      <Popular />
      <TopRated />
      <Upcoming />
      <People />
    </div>
  );
}
