import Image from 'next/image';
import Link from 'next/link';
import {FC} from 'react';

interface IBlogCategoryCardProps {
    name:string,
    slug:string,
    description:string,
    image:string,
}

const BlogCategoryCard: React.FC<IBlogCategoryCardProps> = ({name, slug, description, image}) => {

  return(
    <Link href={`/blog/${slug}`}>
        <div className={blogCategoryCardClassNames.categoryCard}>
            <Image src={image} alt={name} width={200} height={200} className={blogCategoryCardClassNames.categoryImage}/>
            <h3 className={blogCategoryCardClassNames.categoryName}>{name}</h3>
            <p className={blogCategoryCardClassNames.categoryDescription}>
                {description.slice(0,100)}...Read More
            </p>
        </div>
    </Link>
  ) ;
};

const blogCategoryCardClassNames = {
    categoryCard: "w-full overflow-hidden bg-white p-6 rounded-lg shadow-md",
    categoryImage:
      "h-48 w-full object-cover rounded-lg mb-6 hover:scale-125 transition-all duration-500",
    categoryName: "text-xl font-bold mb-2",
    categoryDescription: "text-gray-500",
  };

export default BlogCategoryCard;