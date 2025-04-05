import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const PostDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/posts/${id}`);
        const data = await res.json();
        setPost(data);
      } catch (err) {
        console.error(err);
      }
    };
  
    fetchPostDetails();
  }, [id]);
  

  if (!post) return <div className="container mt-5">Loading...</div>;

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header">
          <h1 className="card-title">{post.title}</h1>
        </div>
        <div className="card-body">
          <p className="card-text">{post.content}</p>
        </div>
        <div className="card-footer text-muted">
          <p className="mb-1"><strong>Author:</strong> {post.author.username}</p>
          <p className="mb-0"><strong>Created At:</strong> {new Date(post.createdAt).toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
