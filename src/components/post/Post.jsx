import React from "react";
import { Link } from "react-router-dom";
import "./post.css";

const Post = ({ imageUrl, title, content, postId, date }) => {
    const isLoggedIn = !!localStorage.getItem("user");

    return (
        <div className="post">
            <img className="postImg" src={imageUrl} alt="" />
            <div className="postInfo">
                <div className="postcats"></div>
                <span className="postTitle">{title}</span>
                <hr />
                <span className="postDate">{date}</span>
            </div>
            <p className="postDesc">{content}</p>
            {isLoggedIn ? (
                <Link to={`/post/${postId}`}>
                    <button className="viewMoreButton">View More</button>
                </Link>
            ) : (
                <Link to="/login">
                    <button className="viewMoreButton">
                        Login to View More
                    </button>
                </Link>
            )}
        </div>
    );
};

export default Post;
