import Link from "next/link";
import Image from "next/image";
const Post = ({ post }) => {
    return (
        <div className="card">
            <img
                src={post.frontmatter.cover_image}
                alt={post.frontmatter.date}
            />
            <div className="post-date">Posted on {post.frontmatter.date}</div>
            <h3>{post.frontmatter.title}</h3>
            <p>{post.frontmatter.excerpt}</p>
            <Link href={`/blog/${post.slug}`}>
                <a className="btn">Read More</a>
            </Link>
        </div>
    );
};

export default Post;
