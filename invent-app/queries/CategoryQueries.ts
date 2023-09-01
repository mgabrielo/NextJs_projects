import { useQuery, useMutation } from "@tanstack/react-query";
import axios from "../config/axios";
import { type GetCategory } from "@/types/getCategories";
import { type PostCategory } from "@/types/postCategories";

const getCategories = async (): Promise<GetCategory[]> => {
  const { data } = await axios.get("/categories");
  return data;
};

const postCategory = async (props: PostCategory) => {
  const { data } = await axios.post("/category", props);
  return data;
};

const useGetCategories = () => useQuery(["categories"], getCategories);
const usePostCategories = () => useMutation(["postCategory"], postCategory);
export { useGetCategories, usePostCategories };
