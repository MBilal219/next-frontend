import { supabaseAdmin } from "@/lib/supbase";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    console.log(data, "data");
    const { event, uid, entry } = data;

    if (uid === "api::content.content") {
      if (event === "entry.create") {
        if (!entry?.FromSupaBase) {
          const { data: Supabasedata, error } = await supabaseAdmin
            .from("posts")
            .insert({
              title: entry.Title,
              description: entry.Description,
              strapi_document_id: entry.documentId,
              FromSupaBase: true,
            });

          console.log(Supabasedata, "supabase");
          console.log(error, "error");
        }
      }
      if (event === "entry.update") {
        if (!entry?.FromSupaBase) {
          const { data: Supabasedata, error } = await supabaseAdmin
            .from("posts")
            .update({
              title: entry.Title,
              description: entry.Description,
              strapi_document_id: entry.documentId,
            })
            .eq("strapi_document_id", entry.documentId);

          console.log(Supabasedata, "supabase");
          console.log(error, "error");
        }
      }

      if (event === "entry.delete") {
        if (!entry?.FromSupaBase) {
          const { data: Supabasedata, error } = await supabaseAdmin
            .from("posts")
            .delete()
            .eq("strapi_document_id", entry.documentId);

          console.log(Supabasedata, "supabase");
          console.log(error, "error");
        }
      }

      if (event === "entry.publish") {
        const { data: Supabasedata, error } = await supabaseAdmin
          .from("posts")
          .update({
            isPublished: true,
          })
          .eq("strapi_document_id", entry.documentId);
        console.log(Supabasedata, "supabase");
        console.log(error, "error");
      }

      if (event === "entry.unpublish") {
        const { data: Supabasedata, error } = await supabaseAdmin
          .from("posts")
          .update({
            isPublished: false,
          })
          .eq("strapi_document_id", entry.documentId);
        console.log(Supabasedata, "supabase");
        console.log(error, "error");
      }
    }

    return NextResponse.json(
      {
        success: true,
      },
      { status: 200 }
    );
  } catch (err: unknown) {
    if (err instanceof Error) {
      return NextResponse.json(
        {
          success: false,
          message: err.message || "Internal Server Error",
        },
        { status: 500 }
      );
    }
    // Handle unexpected error types
    return NextResponse.json(
      {
        success: false,
        message: "Internal Server Error",
      },
      { status: 500 }
    );
  }
}
