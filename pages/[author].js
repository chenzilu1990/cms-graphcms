import Container from '../components/container'
import MoreStories from '../components/more-stories'
import HeroPost from '../components/hero-post'
import Intro from '../components/intro'
import Layout from '../components/layout'
import { getAllPostsForHome, getAllPostsWithAuthor } from '../lib/graphcms'
import Head from 'next/head'
import { CMS_NAME } from '../lib/constants'

export default function Index({ posts, preview }) {
  
  const morePosts = posts
  return (
    <>
      <Layout preview={preview}>
        <Head>
            
            <title>
          
            {`唐诗三百首`}
           
            </title>
        </Head>
        <Container>
        

          {morePosts && morePosts.length > 0 && <MoreStories posts={morePosts} />}
        </Container>
      </Layout>
    </>
  )
}

export async function getStaticProps({  params, preview = false }) {
  const posts = (await getAllPostsWithAuthor(params.author)) || []
  return {
    props: { posts, preview },
  }
}

export async function getStaticPaths() {
  const posts = await getAllPostsForHome()

  return {
    paths: posts.map(({ author }) => ({
      params: { author },
    })),
    fallback: true,
  }
}