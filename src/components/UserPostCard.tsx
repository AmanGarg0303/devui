"use client";
import { formatDate } from "@/lib/utils";
import Image from "next/image";
import { Trash2Icon } from "lucide-react";
import { Button } from "./ui/button";

export default function UserPostCard({ post }: { post: PostType }) {
  return (
    <div className="text-left">
      <div className="w-[500px] h-[500px] shadow-md rounded-md">
        <div className="flex justify-between flex-col">
          <div className="p-5 flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">{post.user.name}</h1>
              <p>{formatDate(post.created_at)}</p>
            </div>
            <Button size="icon" variant="destructive">
              <Trash2Icon />
            </Button>
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
            <h1 className="text-2xl line-clamp-1 font-semibold">
              {post.title}
            </h1>
            <p className="text-sm line-clamp-2">{post.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
