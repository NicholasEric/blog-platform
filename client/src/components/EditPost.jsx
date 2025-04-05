import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditPost = () => {
  const { id } = useParams(); 
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5000/api/posts/${id}`)
      .then(response => {
        if (!response.ok) throw new Error('Error fetching post');
        return response.json();
      })
      .then(data => {
        setTitle(data.title);
        setContent(data.content);
        setTags(data.tags.join(','));
      })
      .catch(err => console.error(err));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      alert('You must be logged in to edit a post');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/posts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title, content, tags: tags.split(',') }),
      });
      const data = await response.json();
      if (response.ok) {
        navigate(`/posts/${id}`);
      } else {
        console.error('Error updating post:', data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-body">
          <h1 className="card-title mb-4">Edit Post</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Title:</label>
              <input
                type="text"
                className="form-control"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Content:</label>
              <textarea
                className="form-control"
                rows="5"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Tags (comma-separated):</label>
              <input
                type="text"
                className="form-control"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Update Post
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditPost;
