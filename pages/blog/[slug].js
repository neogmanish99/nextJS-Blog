import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";
import Link from "next/link";

const postPage = ({
    frontmatter: { title, date, cover_image },
    slug,
    content,
}) => {
    return (
        <>
            <Link href="/">
                <a className="btn btn-back">Go Back</a>
            </Link>
            <div className="card card-page">
                <h1 className="post-title">{title}</h1>
                <div className="post-date">Posted on {date}</div>
                <img src={cover_image} />
                <div className="post-body">
                    <div
                        dangerouslySetInnerHTML={{ __html: marked(content) }}
                    ></div>
                </div>
            </div>
        </>
    );
};

export async function getStaticPaths() {
    const files = fs.readdirSync(path.join("posts"));

    const paths = files.map((filename) => ({
        params: { slug: filename.replace(".md", "") },
    }));

    return {
        // suppose the path is like /blog/[slug] or if /blog/[id] then slug will be like
        // paths: [{params: {id:1},}]
        // or
        // paths: [{ params: { slug: " my slug 1" } }],
        paths,

        //if fallback is false it means if there is a path that doesn't exist it will give 404 page'
        fallback: false,
    };
}

export async function getStaticProps({ params: { slug } }) {
    const markdownWithMeta = fs.readFileSync(
        path.join("posts", slug + ".md"),
        "utf-8"
    );

    const { data: frontmatter, content } = matter(markdownWithMeta);
    return {
        props: {
            frontmatter,
            slug,
            content,
        },
    };
}

export default postPage;
