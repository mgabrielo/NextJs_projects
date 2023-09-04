import BlogCategoryCard from '@/components/BlogcategoryCard/BlogCategoryCard';
import {FC, useEffect, useState} from 'react';
import Image from 'next/image';
import BlogCard from '@/components/BlogCard/BlogCard';
import { NextPage, NextPageContext } from 'next';
import Blog from '@/models/blog';
import client from '@/lib/sanity';
import { Category } from '@/models/categories';

interface IBlogProps {
  blogsPost:Blog[]
  categories: Category[]
}

const Blog: NextPage<IBlogProps> = (props) => {
  const {categories, blogsPost} = props
  console.log(blogsPost)
  // const [blogData, setBlogData] = useState([])

  // useEffect(()=>{
  //   async function fetchBlogData(){
  //     const res =await fetch("/api/blog");
  //     const data = await res.json()
  //     setBlogData(data)
  //   }
  //   fetchBlogData()
  // },[])

  return(
<>
    <section className={blogSectionClasses.container}>
        <h2 className={blogSectionClasses.heading}>Blog</h2>
        <p className={blogSectionClasses.subheading}>
        Lorem ipsum dolor sit amet,  consectetur adipiscing elit, sed do eiusmod tempor 
        </p>
        <div className={blogSectionClasses.categoriesContainer}>
          {
            categories.map((category)=>(
              <BlogCategoryCard
              key={category.name}
              description={category.description}
              image={category.image}
              name={category.name}
              slug={category.name}
              />
            ))
          }
        </div>
    </section>
    <div className={featuredPostSectionClasses.container}>
        <div className={featuredPostSectionClasses.imageContainer}>
          <Image
            width={200}
            height={100}
            className={featuredPostSectionClasses.image}
            src={'https://images.pexels.com/photos/5052875/pexels-photo-5052875.jpeg?auto=compress&cs=tinysrgb&w=600'}
            alt={'img-title'}
          />
        </div>
        <div className={featuredPostSectionClasses.contentContainer}>
          <h2 className={featuredPostSectionClasses.title}>
            {/* {featuredPost.title} */} Feature 1
          </h2>
          <p className={featuredPostSectionClasses.description}>
            {/* {featuredPost.description.slice(0, 150)}... */}
            Lorem ipsum dolor sit amet, consectetur adipiscing elit
          </p>
          {/* {featuredPost.features?.map((feature) => ( */}
            <div
              // key={feature}
              className={featuredPostSectionClasses.featuresContainer}
            >
              <span className={featuredPostSectionClasses.featureTick}>
                &#10003;
              </span>
              <span className={featuredPostSectionClasses.feature}>
                {/* {feature} */}
                feature 1
              </span>
            </div>
          {/* ))} */}
        </div>
    </div>

    <div className="grid gap-6 md:grid-cols-2">
        {blogsPost.map((blog:any) => (
          <BlogCard
            key={blog?.title}
            author={blog?.author}
            date={blog?.date}
            description={blog?.description}
            image={blog?.image.URL}
            title={blog?.title}
            slug={blog.slug.current}
          />
         ))}
      </div>
</>


  ) ;
};

const blogSectionClasses = {
  container: "pb-8 pt-40 text-primary-dark px-4 lg:px-36",
  heading: "text-4xl font-bold mb-6",
  subheading: "text-gray-200 text-lg mb-12",
  categoriesContainer:
    "flex flex-col lg:flex-row gap-8 justify-between items-center",
};

const featuredPostSectionClasses = {
  container:
    "py-20 text-white px-6 lg:px-36 flex flex-col lg:flex-row items-center justify-center",
  imageContainer: "w-full lg:w-2/3 order-2 lg:order-1",
  image: "w-full h-full object-cover rounded-lg shadow-md",
  contentContainer: "w-full lg:w-1/3 lg:pl-12 order-1 lg:order-2",
  title: "text-4xl font-bold mb-6",
  description: "text-gray-500 text-lg mb-8",
  featuresContainer: "flex items-center mb-2",
  featureTick: "text-green-500 mr-2",
  feature: "text-gray-500",
};

export default Blog;

export async function getStaticProps(context:NextPageContext) {
  const categoryQuery=`*[_type == "category"] {
    name ,
    slug {current},
    image,
    description,
    _id
  }`


  const categories = await client.fetch(categoryQuery);

  const  blogQuery =`*[_type == "blog"] {
    description,
    title,
    slug {current},
    image {URL},
    isFeatured,
    date,
    _id
  }`

  const blogsPost = await client.fetch(blogQuery);


  return{
    props:{blogsPost, categories},
    revalidate:3600,
  }
  
}