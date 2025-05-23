import { validateRequest } from "@/auth";
import { prisma } from "@/lib/prisma";
import { CommentPage, getCommentDataInclude } from "@/lib/types";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { postId: string } },
) {
  try {
    const { postId } = await params;
    const cursor = req.nextUrl.searchParams.get("cursor") || undefined;

    const pageSize = 5;

    const { user } = await validateRequest();

    if (!user) {
      return Response.json({ error: "Unauthtorizen" }, { status: 401 });
    }

    const comments = await prisma.comment.findMany({
      where: {
        postId: postId,
      },
      include: getCommentDataInclude(user.id),
      orderBy: { createdAt: "asc" },
      take: -pageSize - 1,
      cursor: cursor ? { id: cursor } : undefined,
    });

    const previousCursor = comments.length > pageSize ? comments[0].id : null;

    const data: CommentPage = {
      comments: comments.length > pageSize ? comments.slice(1) : comments,
      previousCursor,
    };

    return Response.json(data);
  } catch (error) {
    console.error("Error fetching postId:", error);
    return Response.json({ error: "Internals server error" }, { status: 500 });
  }
}
