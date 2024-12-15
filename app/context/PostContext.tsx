"use client";
import { axiosInstance } from "@/lib/axios";
import { supabaseAdmin } from "@/lib/supbase"; // Ensure this is correctly configured
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

export interface Post {
  id: number | string;
  title: string;
  description: string;
  strapi_document_id: string;
  created_at: string;
  isPublished: boolean;
}

interface PostContextType {
  posts: Post[];
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
}

const PostContext = createContext<PostContextType | undefined>(undefined);

export const PostProvider = ({ children }: { children: ReactNode }) => {
  const [posts, setPosts] = useState<Post[]>([]);

  const addToStrapi = async (payload: Post) => {
    const { data } = await axiosInstance.post("/contents", {
      data: {
        Title: payload?.title,
        Description: payload?.description,
        FromSupaBase: true,
        publishedAt: new Date(),
      },
    });
    console.log(data, "strapi");
    const { data: Supabasedata, error } = await supabaseAdmin
      .from("posts")
      .update({
        strapi_document_id: data?.data?.documentId,
      })
      .eq("id", payload.id);
    console.log(Supabasedata, "dual");
    console.error(error);
  };

  const updateInStrapi = async (payload: Post) => {
    const { data: updateStrapi } = await axiosInstance.post(
      `/contents/${payload?.strapi_document_id}`,
      {
        data: {
          Title: payload?.title,
          Description: payload?.description,
        },
      }
    );
    console.log(updateStrapi, "strapi");
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data, error } = await supabaseAdmin.from("posts").select("*");
        if (error) {
          console.error("Error fetching posts:", error.message);
        } else {
          console.log(data, "data");
          setPosts(data || []);
        }
      } catch (err) {
        console.error("Error in fetchPosts:", err);
      }
    };

    const subscribeToPosts = () => {
      const channel = supabaseAdmin
        .channel("table-posts")
        .on(
          "postgres_changes",
          { event: "*", schema: "public", table: "posts" },
          (payload) => {
            const {
              id,
              title,
              description,
              strapi_document_id,
              created_at,
              isPublished,
            } = payload.new as Post;
            const newPost = {
              id,
              title,
              description,
              strapi_document_id,
              created_at,
              isPublished,
            };
            console.log("Realtime Update:", payload);

            if (payload.eventType === "INSERT") {
              if (!strapi_document_id) {
                addToStrapi(newPost);
              }
              setPosts((prev) => [...prev, newPost]);
            } else if (payload.eventType === "UPDATE") {
              updateInStrapi(newPost);
              setPosts((prev) =>
                prev.map((post) => (post.id === newPost.id ? newPost : post))
              );
            } else if (payload.eventType === "DELETE") {
              setPosts((prev) =>
                prev.filter((post) => post.id !== payload.old.id)
              );
            }
          }
        )
        .subscribe();

      return channel;
    };

    fetchPosts();
    const channel = subscribeToPosts();

    // Cleanup on unmount
    return () => {
      supabaseAdmin.removeChannel(channel);
    };
  }, []);

  return (
    <PostContext.Provider value={{ posts, setPosts }}>
      {children}
    </PostContext.Provider>
  );
};

export const usePosts = () => {
  const context = useContext(PostContext);
  if (!context) {
    throw new Error("usePosts must be used within a PostProvider");
  }
  return context;
};
