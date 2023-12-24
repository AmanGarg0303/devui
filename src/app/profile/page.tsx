import Navbar from "@/components/Navbar";
import { getServerSession } from "next-auth";
import {
  CustomSession,
  authOptions,
} from "../api/auth/[...nextauth]/authOptions";
import SignOutBtn from "@/components/SignOutBtn";
import AddPost from "@/components/AddPost";
import UserPostCard from "@/components/UserPostCard";
import { getUserPosts } from "@/lib/serverMethods";

export default async function ProfilePage() {
  const session: CustomSession | null = await getServerSession(authOptions);

  const posts = await getUserPosts();

  return (
    <div>
      <Navbar />
      <div className="container mt-5">
        <div className="text-center">
          <h1 className="text-3xl">Hello, {session?.user?.name}</h1>
          <div className="mt-5 flex justify-center items-center gap-4">
            <AddPost user_id={session?.user?.id!} />
            <SignOutBtn />
          </div>
          <div className="flex justify-center items-center mt-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {posts ? (
                posts.map((post: PostType) => (
                  <UserPostCard key={post.id} post={post} />
                ))
              ) : (
                <div>No Posts found!</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
