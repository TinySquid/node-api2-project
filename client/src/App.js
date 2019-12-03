import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    fetch("http://localhost:4000/api/posts")
      .then(response => response.json())
      .then(response => setPosts(response))
      .catch(error => console.log(error));
  }, []);

  if (!posts) return <h1 style={{ textAlign: "center" }}>Loading...</h1>

  return (
    <div className="App">
      <h1>Posts from <i>Localhost</i></h1>
      {posts.map((post, idx) => (
        <article className="post" key={idx}>
          <h2>{post.title}</h2>
          <p>{post.contents}</p>
        </article>
      ))}
    </div>
  );
}

export default App;
