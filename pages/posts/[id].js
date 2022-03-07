import Head from 'next/head'
import Layout from '../../components/layout.js'
import Date from '../../components/date.js'
import { getAllPostIds, getPostData } from '../../lib/posts.js'

import utilStyles from '../../styles/utils.module.css'

export default function Post({postData}) {
    return (
        <Layout>
            <Head>
                <title>{postData.title}</title>
            </Head>
            <article>
                <h1 className={utilStyles.headingX1}>{postData.title}</h1>
                <div className={utilStyles.ligthText}>
                    <Date dateString={postData.date}/>
                </div>
                <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
            </article>
        </Layout>
    )
}

export async function getStaticPaths() {
    const paths = getAllPostIds()
    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({params}) {
    const postData = await getPostData(params.id)
    return {
        props:{
            postData
        }
    }
}
