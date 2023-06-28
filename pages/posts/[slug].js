import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Container from 'components/container'
import PostBody from 'components/post-body'
import MoreStories from 'components/more-stories'
import Header from 'components/header'
import PostHeader from 'components/post-header'
import SectionSeparator from 'components/section-separator'
import Layout from 'components/layout'
import { getAllPostsWithSlug, getPostAndMorePosts } from 'lib/graphcms'
import PostTitle from 'components/post-title'
import Head from 'next/head'
import { CMS_NAME } from 'lib/constants'
import { useState } from 'react';
import { generatedImg } from "lib/getData";
export default function Post({ post, morePosts, preview }) {

  let [imgURL , setImgURL] = useState()

  const router = useRouter()

  if (!router.isFallback && !post?.id) {
    return <ErrorPage statusCode={404} />
  }



  generatedImg({"inputs": post.paragraphs[0]}, post.title)
  // .then((response) => {
  //   const imgURL = URL.createObjectURL(response)
    
  //   setImgURL(imgURL)

  // });

  return (
    <Layout preview={preview}>
      <Container>
        <Header />
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            <article>
              <Head>
                <title>
                  {`${post.title} | Next.js Blog Example with ${CMS_NAME}`}
                </title>
                {/* <meta property="og:image" content={post.ogImage.url} /> */}
              </Head>
              <PostHeader
                title={post.title}
             
                author={post.author}
              />
              <img src={imgURL}></img>
              <PostBody content={post.paragraphs} />
            </article>

          </>
        )}
      </Container>
    </Layout>
  )
}

export async function getStaticProps({ params, preview = false }) {
  const data = await getPostAndMorePosts(params.slug, preview)
  return {
    props: {
      preview,
      post: data.postCopy,
     
    },
  }
}

export async function getStaticPaths() {
  const posts = await getAllPostsWithSlug()
  return {
    paths: posts.map(({ title }) => ({
      params: { slug: title },
    })),
    fallback: true,
  }
}
