import BlogCategoryCard from '@/components/BlogcategoryCard/BlogCategoryCard';
import {FC, useEffect, useState} from 'react';
import Image from 'next/image';
import BlogCard from '@/components/BlogCard/BlogCard';
import { NextPage, NextPageContext } from 'next';
import Blog from '@/models/blog';

interface IBlogProps {
  blogContent:Blog[]
}

const Blog: NextPage<IBlogProps> = (props) => {
  const {blogContent} = props
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
          <BlogCategoryCard
          key={'1'}
          description='sldkjf jkqedfe sajlkdf'
          image={'https://images.pexels.com/photos/262508/pexels-photo-262508.jpeg?auto=compress&cs=tinysrgb&w=600'}
          name='sanity blog'
          slug='sanity-blog'
          />
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
        {blogContent?.map((blog:Blog) => (
          <BlogCard
            key={blog.title}
            author={blog.author}
            date={blog.date}
            description={blog.description}
            image={blog.image}
            title={blog.title}
            // slug={blog.slug.current}
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

  const blogContent = [
    {
      image:
        "https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      title: "Lorem ipsum dolor sit amet",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla malesuada velit eu enim facilisis, at varius nulla congue. Vestibulum pharetra urna euismod, hendrerit dolor eget, bibendum purus.",
      author: "John Doe",
      date: "April 25, 2023",
    },
    {
      image:
        "https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      title: "Praesent id velit nec felis congue suscipit eu et ipsum",
      description:
        "Praesent id velit nec felis congue suscipit eu et ipsum. Aliquam congue mi eu urna efficitur vestibulum. Donec euismod, ex ut suscipit tristique, nibh nibh venenatis nulla, quis aliquam neque ex a nunc.",
      author: "Jane Smith",
      date: "April 23, 2023",
    },
    {
      image:
        "https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      title: "Etiam cursus dui a neque vulputate consectetur",
      description:
        "Etiam cursus dui a neque vulputate consectetur. In ultrices eros quis enim consectetur, vitae gravida tellus hendrerit. Ut vel efficitur sapien. Sed rhoncus hendrerit sapien vitae venenatis.",
      author: "Mike Johnson",
      date: "April 20, 2023",
    },
    {
      image:
        "https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
      title:
        "Suspendisse potenti. Fusce fermentum lorem et est elementum, a pharetra turpis tincidunt.",
      description:
        "Suspendisse potenti. Fusce fermentum lorem et est elementum, a pharetra turpis tincidunt. Nam porttitor nisi nec leo molestie, eu ullamcorper velit malesuada. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Fusce vel velit eget elit lobortis elementum non eget elit.",
      author: "Sarah Lee",
      date: "April 18, 2023",
    },
  ];

  return{
    props:{blogContent},
    revalidate:3600,
  }
  
}