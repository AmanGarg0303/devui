import Navbar from "@/components/Navbar";
import { getPost } from "@/lib/serverMethods";
import { formatDate } from "@/lib/utils";
import Image from "next/image";
import React from "react";

export default async function SinglePostPage({
  params,
}: {
  params: { id: number };
}) {
  const post: PostType = await getPost(params?.id);

  return (
    <div>
      <Navbar />

      <div className="flex justify-center items-center">
        <div className="text-left">
          <div className="max-w-3xl border rounded-md">
            <div className="flex justify-between flex-col">
              <div className="p-5 flex justify-between items-center">
                <h1 className="text-2xl font-bold">{post.user.name}</h1>
                <p>{formatDate(post.created_at)}</p>
              </div>

              <Image
                src={`http://localhost:3000/uploads/${post.image}`}
                width="50"
                height="50"
                alt="post img"
                className="w-full h-[300px] object-cover"
                unoptimized
              />

              <div className="p-5">
                <h1 className="text-2xl font-semibold">{post.title}</h1>
                <p className="text-sm ">{post.description}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
