import PostPreview from '../components/post-preview'
import Link from "next/link";
export default function MoreStories({ posts }) {
  return (
    <section>
      <h2 className="mb-8 text-6xl md:text-7xl font-bold tracking-tighter leading-tight">
        <Link href="/" className="hover:underline">
          唐诗三百首
        </Link>
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-16 lg:gap-x-32 gap-y-20 md:gap-y-32 mb-32">
        {posts.map((post) => (
          <PostPreview
            key={post.id}
            title={post.title}

            author={post.author}
            slug={post.title}
           
          />
        ))}
      </div>
    </section>
  )
}
