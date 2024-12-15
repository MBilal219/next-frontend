"use client";
import React from "react";
import { usePosts } from "../app/context/PostContext";
import { DataTable } from "./DataTable";

const Posts = () => {
  const { posts } = usePosts();
  console.log(posts, "posts");
  return <DataTable data={posts} />;
};

export default Posts;
