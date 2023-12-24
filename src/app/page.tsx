import Navbar from "@/components/Navbar";
import { getPosts } from "@/lib/serverMethods";
import PostCard from "@/components/PostCard";

export default async function Home() {
  const posts = await getPosts();

  return (
    <div>
      <Navbar />

      <div className="container">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-5xl font-bold">UI Home</h1>
          <p className="text-2xl">
            Find worlds best UI/UX from amazing developers
          </p>

          <div className="mt-5 grid grid-cols-1 lg:grid-cols-2 gap-6">
            {posts ? (
              posts.map((post: PostType) => (
                <PostCard key={post.id} post={post} />
              ))
            ) : (
              <div>No posts found.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
