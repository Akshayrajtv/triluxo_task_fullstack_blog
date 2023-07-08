import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
    collection,
    doc,
    getDoc,
    addDoc,
    query,
    orderBy,
    onSnapshot,
    where,
} from "firebase/firestore";
import { db } from "../../firebase";

const SinglePost = () => {
    const { postId } = useParams();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const userEmail = JSON.parse(localStorage.getItem("user")).email;

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const docRef = doc(db, "blogPosts", postId);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const postData = { id: docSnap.id, ...docSnap.data() };
                    setPost(postData);
                } else {
                    console.log("No such document!");
                }
            } catch (error) {
                console.error("Error fetching post:", error);
            }
        };

        fetchPost();
    }, [postId]);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const commentsRef = collection(db, "comments");
                const postCommentsQuery = query(
                    commentsRef,
                    where("postId", "==", postId),
                    orderBy("timestamp")
                );

                const unsubscribe = onSnapshot(
                    postCommentsQuery,
                    (querySnapshot) => {
                        const commentsData = [];
                        querySnapshot.forEach((doc) => {
                            const commentData = { id: doc.id, ...doc.data() };
                            commentsData.push(commentData);
                        });
                        setComments(commentsData);
                    }
                );

                return () => unsubscribe();
            } catch (error) {
                console.error("Error fetching comments:", error);
            }
        };

        fetchComments();
    }, [postId]);

    const handleNewCommentChange = (e) => {
        setNewComment(e.target.value);
    };

    const handleSubmitComment = async (e) => {
        e.preventDefault();

        if (newComment.trim() === "") {
            return;
        }

        try {
            const commentData = {
                postId,
                content: newComment,
                author: userEmail,
                timestamp: new Date().toISOString(),
            };

            await addDoc(collection(db, "comments"), commentData);

            setNewComment("");
        } catch (error) {
            console.error("Error adding comment:", error);
        }
    };

    if (!post) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container py-4">
            <div className="row">
                <div className="col-md-6">
                    <div className="embed-responsive embed-responsive-16by9 mb-4">
                        <iframe
                            className="embed-responsive-item"
                            src={post.videoURL}
                            title="Video"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
                <div className="col-md-6">
                    <h1 className="mb-4">{post.title}</h1>
                    <div className="d-flex justify-content-between mb-3">
                        <span className="text-muted">
                            Author: <b>{post.author}</b>
                        </span>
                        <span className="text-muted">{post.date}</span>
                    </div>
                    <p>{post.content}</p>
                </div>
            </div>
            <div className="row mt-4">
                <div className="col">
                    <h3>Comments</h3>
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <form onSubmit={handleSubmitComment}>
                                <div className="mb-3">
                                    <label
                                        htmlFor="comment"
                                        className="form-label"
                                    >
                                        Leave a comment
                                    </label>
                                    <textarea
                                        className="form-control"
                                        id="comment"
                                        rows="3"
                                        value={newComment}
                                        onChange={handleNewCommentChange}
                                    ></textarea>
                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                >
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                    {comments.length > 0 ? (
                        comments.map((comment) => (
                            <div className="card mt-3" key={comment.id}>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-9">
                                            <h6>{comment.author}</h6>
                                        </div>
                                        <div className="col-md-3">
                                            <span className="text-muted">
                                                {comment.timestamp}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <p className="card-text">
                                            {comment.content}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No comments yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SinglePost;
