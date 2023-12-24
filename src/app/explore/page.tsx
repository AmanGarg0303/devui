"use client";
import Navbar from "@/components/Navbar";
import PostCard from "@/components/PostCard";
import { Input } from "@/components/ui/input";
import { loadingSvg } from "@/svgs/svgs";
import axios from "axios";
import React, { useState } from "react";

export default function ExplorePage() {
  const [search, setSearch] = useState<string>("");
  const [posts, setPosts] = useState<Array<PostType>>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [notFound, setNotFound] = useState<boolean>(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setPosts([]);
    setNotFound(false);

    if (search.length > 0) {
      axios
        .get(`/api/post/search?query=${search}`)
        .then((res) => {
          const response = res.data;
          if (response.status == 200) {
            if (response?.data?.length > 0) {
              setPosts(response.data);
            } else {
              setNotFound(true);
            }
          }
        })
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
    }
  };

  return (
    <div>
      <Navbar />

      <div className="container">
        <div className="flex flex-col justify-center items-center mt-10">
          <form onSubmit={submit}>
            <Input
              type="text"
              placeholder="Seach your UI"
              className="w-full lg:w-[700px] h-22 rounded-lg text-2xl"
              onChange={(e) => setSearch(e.target.value)}
            />
          </form>

          {loading && <div className="my-5">{loadingSvg}</div>}
          {notFound && <div className="my-5">No posts found!</div>}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 my-5">
            {posts.map((post: PostType) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
