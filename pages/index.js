import Head from "next/head";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Post from "../components/Post";
import { sortByDate } from "../utils";

export default function Home({ posts }) {
    return (
        <div>
            <Head>
                <title>Markdown Blog</title>
            </Head>
            <div className="posts">
                {posts.map((post, index) => (
                    <Post post={post} />
                ))}
            </div>
        </div>
    );
}

//getStaticProps works on the serverSide so therefor we can fetch the posts files using the fs modules
export async function getStaticProps() {
    //Get files from the posts directory
    const files = fs.readdirSync(path.join("posts"));

    //Get slug and front matter
    const posts = files.map((filename) => {
        //Create slug
        const slug = filename.replace(".md", "");

        //Create front matter
        const markdownWithMeta = fs.readFileSync(
            path.join("posts", filename),
            "utf-8"
        );

        const { data: frontmatter } = matter(markdownWithMeta);
        return {
            slug,
            frontmatter,
        };
    });

    return {
        props: {
            //to align the posts according to the latest date
            posts: posts.sort(sortByDate),
        },
    };
}
