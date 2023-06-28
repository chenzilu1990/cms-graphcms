import Avatar from '../components/avatar'
import Date from '../components/date'
import CoverImage from '../components/cover-image'
import PostTitle from '../components/post-title'
import Link from "next/link";
export default function PostHeader({ title, author }) {
  return (
    <>
      <PostTitle>{title}</PostTitle>
      <div className="hidden md:block md:mb-12">

        <Link href={`/${author}`} className="hover:underline">
                  
          <div className="text-xl font-bold" >--{author}</div>
          
        </Link>
      </div>


    </>
  )
}
