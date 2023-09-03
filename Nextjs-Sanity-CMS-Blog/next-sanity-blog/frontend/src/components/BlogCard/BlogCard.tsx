import Image from 'next/image';
import blogCardClassNames from './blogCardClassNames';

interface IBlogCardProps {
    title:string,
    description:string,
    image:string,
    author:string,
    date:string,
}

const BlogCard: React.FC<IBlogCardProps> = ({title, description, image, author, date}) => {

  return(
    // <Link href={`/blog/${slug}`}>
      <div className={blogCardClassNames.card}>
        <div className={blogCardClassNames.imageContainer}>
          <Image
            width="100"
            height="100"
            className={blogCardClassNames.image}
            src={image}
            alt={title}
          />
        </div>
        <div className={blogCardClassNames.textContainer}>
          <h2 className={blogCardClassNames.title}>{title}</h2>
          <p className={blogCardClassNames.description}>
            {description.slice(0, 200)}...
          </p>
          <div className={blogCardClassNames.metaContainer}>
            <p className={blogCardClassNames.author}>
                By {author}
                {/* {author.name} */}
            </p>
            <p className={blogCardClassNames.date}>
                {/* {formatDate( */}
                {date}
                {/* )} */}
            </p>
          </div>
        </div>
      </div>
    // </Link>
  ) ;
};

export default BlogCard;