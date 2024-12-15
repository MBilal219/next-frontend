import Posts from "@/components/Posts";

export default function Home() {
  return (
    <div className="w-full lg:max-w-4xl xl:max-w-6xl 2xl:max-w-7xl mx-auto">
      <div className="flex items-center justify-center min-h-screen flex-col ">
        <div className="mb-9 text-center text-lg md:text-2xl xl:text-3xl 2xl:text-4xl font-bold">
          Realtime Posts
        </div>
        <Posts />
      </div>
    </div>
  );
}
