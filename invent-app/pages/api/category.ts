import { prisma } from "@/config/prisma";
import { authOptions } from "./auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { NextApiRequest, NextApiResponse } from "next";
import { PostCategorySchema } from "@/types/postCategories";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    res.status(401).json({ message: "Unauthorised" });
  }

  if (req.method === "POST") {
    const { name } = req.body;
    const response = PostCategorySchema.safeParse(req.body);
    if (!response.success) {
      res.status(400).json({ message: response.error.issues });
    }

    try {
      const category = await prisma.category.create({
        data: {
          name,
          userId: session?.user?.id,
        },
      });

      res.status(201).json(category);
    } catch (error) {
      res
        .status(500)
        .json({ message: " Error : Category Could Not Be Created" });
    }
  }
  res.end();
};
