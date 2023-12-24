import { headers } from "next/headers";

export async function getUserPosts() {
  const res = await fetch(`${process.env.APP_URL}/api/user/post`, {
    headers: headers(),
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Could not get user posts!");
  }

  const response = await res.json();
  return response?.data;
}

export async function getPosts() {
  const res = await fetch(`${process.env.APP_URL}/api/post`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Could not get user posts!");
  }

  const response = await res.json();
  return response?.data;
}

export async function getPost(id: number) {
  const res = await fetch(`${process.env.APP_URL}/api/post/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Could not get user posts!");
  }

  const response = await res.json();
  return response?.data;
}
