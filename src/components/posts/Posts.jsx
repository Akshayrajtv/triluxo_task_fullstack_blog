import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./posts.css";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import Post from "../post/Post";

const Posts = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const getPosts = async () => {
            try {
                const querySnapshot = await getDocs(
                    collection(db, "blogPosts")
                );
                const postsData = [];
                querySnapshot.forEach((doc) => {
                    const postData = {
                        id: doc.id,
                        ...doc.data(),
                    };
                    postsData.push(postData);
                });
                setPosts(postsData);
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };

        getPosts();
    }, []);

    return (
        <div className="posts">
            {posts.map((post) => (
                
                <Post
                    key={post.id}
                    imageUrl={post.imageURL}
                    title={post.title}
                    content={post.content}
                    postId={post.id}
                    author={post.author}
                    date={post.date}
                    
                /> 
            ))}
        </div>
    );
};

export default Posts;
