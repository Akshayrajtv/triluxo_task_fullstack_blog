import React, { useState } from "react";
import "./write.css";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase";

const Write = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [imageURL, setImageURL] = useState("");
    const [videoURL, setVideoURL] = useState("");
    const [authorName, setAuthorName] = useState("");
    const currentDate = new Date().toLocaleString();

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleContentChange = (e) => {
        setContent(e.target.value);
    };

    const handleImageURLChange = (e) => {
        setImageURL(e.target.value);
    };

    const handleVideoURLChange = (e) => {
        setVideoURL(e.target.value);
    };

    const handleAuthorNameChange = (e) => {
        setAuthorName(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Prepare the blog post data
        const postData = {
            title,
            content,
            imageURL,
            videoURL,
            author: authorName,
            date: currentDate,
        };

        try {
            // Save the blog post data to Firestore
            const docRef = await addDoc(collection(db, "blogPosts"), postData);
            console.log("Blog post created with ID:", docRef.id);

            // Clear form fields and state after submission
            setTitle("");
            setContent("");
            setImageURL("");
            setVideoURL("");
            setAuthorName("");
        } catch (error) {
            console.log("Error creating blog post:", error);
        }
    };

    return (
        <div className="write">
            <h2 className="writeTitle">Create a New Blog</h2>
            <form className="writeForm" onSubmit={handleSubmit}>
                <div className="writeFormGroup">
                    <label htmlFor="imageURLInput" className="writeLabel">
                        <i className="fas fa-image writeIcon"></i>
                        Add Image URL
                    </label>
                    <input
                        type="text"
                        id="imageURLInput"
                        className="writeInput"
                        value={imageURL}
                        onChange={handleImageURLChange}
                    />
                </div>

                <div className="writeFormGroup">
                    <label htmlFor="videoURLInput" className="writeLabel">
                        <i className="fas fa-video writeIcon"></i>
                        Add Video URL
                    </label>
                    <input
                        type="text"
                        id="videoURLInput"
                        className="writeInput"
                        value={videoURL}
                        onChange={handleVideoURLChange}
                    />
                </div>

                <input
                    type="text"
                    placeholder="Title"
                    className="writeInput writeTitleInput"
                    autoFocus={true}
                    value={title}
                    onChange={handleTitleChange}
                />

                <textarea
                    placeholder="Tell your story..."
                    type="text"
                    className="writeInput writeContentInput"
                    value={content}
                    onChange={handleContentChange}
                ></textarea>

                <input
                    type="text"
                    placeholder="Author's Name"
                    className="writeInput"
                    value={authorName}
                    onChange={handleAuthorNameChange}
                />

                <button type="submit" className="writeSubmit">
                    Publish
                </button>
            </form>
        </div>
    );
};

export default Write;
