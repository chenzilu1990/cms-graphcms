import poetry from 'chinese-poetry/chinese-poetry/json/唐诗三百首.json';


async function fetchAPI(query, { variables, preview } = {}) {
  const res = await fetch(process.env.GRAPHCMS_PROJECT_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${
        preview
          ? process.env.GRAPHCMS_DEV_AUTH_TOKEN
          : process.env.GRAPHCMS_PROD_AUTH_TOKEN
      }`,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  })
  const json = await res.json()

  if (json.errors) {
    console.log(process.env.NEXT_EXAMPLE_CMS_GCMS_PROJECT_ID)
    console.error(json.errors)
    throw new Error('Failed to fetch API')
  }

  return json.data
}

export async function getPreviewPostBySlug(slug) {
  const data = await fetchAPI(
    `
    query PostBySlug($slug: String!, $stage: Stage!) {
      post(where: {slug: $slug}, stage: $stage) {
        slug
      }
    }`,
    {
      preview: true,
      variables: {
        stage: 'DRAFT',
        slug,
      },
    }
  )
  return data.post
}

export async function getAllPostsWithSlug() {
  // const data = await fetchAPI(`
  //   {
  //     postsCopy {
  //       slug
  //     }
  //   }
  // `)
  return poetry
}

export async function getAllPostsWithAuthor(author) {
  // const data = await fetchAPI(`
  //   {
  //     postsCopy {
  //       slug
  //     }
  //   }
  // `)
  // return poetry
  const a = poetry.filter( p => p.author === author )
  return a
}

export async function getAllPostsForHome(preview) {
//   const data = await fetchAPI(
//     `
//     {
//   postsCopy {
// 		title
//     author2 {
//       name
//     }
//     content {
//       html
//     }
//     slug
//   }
  
// }
//   `,
//     { preview }
//   )
  return poetry
}

export async function getPostAndMorePosts(slug, preview) {
  // const data = await fetchAPI(
  //   `
  //   query PostBySlug($slug: String!, $stage: Stage!) {
  //     postCopy(stage: $stage, where: {slug: $slug}) {
  //       title

  //       slug

  //       content {
  //         html
  //       }

  //       author2 {
  //         name

  //       }
  //     }

  //   }
  // `,
  //   {
  //     preview,
  //     variables: {
  //       stage: preview ? 'DRAFT' : 'PUBLISHED',
  //       slug,
  //     },
  //   }
  // )
  // return data
  const a = poetry.find( p =>p.title === slug )
  return {postCopy: a}
}
