import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
      const fetchPostList = async () => {
        try {
          const res = await fetch('http://localhost:5000/api/posts');
          const data = await res.json();
          setPosts(data);
        } catch (err) {
          console.error(err);
        }
      };
    
      fetchPostList();
    }, []);

  return (
    <div className="container">
        <h1 className="my-4">Blog Posts</h1>
        <div className="row">
            {posts.map(post => (
            <div key={post._id} className="col-md-6 col-lg-4 mb-4">
                <div className="card h-100">
                <div className="card-body">
                    <h2 className="card-title"><Link to={`/posts/${post._id}`}>{post.title}</Link></h2>
                    <p className="card-text">{post.content}</p>
                </div>
                </div>
            </div>
            ))}
        </div>
    </div>
  );
};

export default PostList;