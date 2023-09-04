type Blog = {
  _id: string;
  title: string;
  description: string;
  image: string;
  author: string;
  date: string;
  isFeatured: boolean;
  slug: { current: string };
};
export default Blog;
