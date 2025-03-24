import { useState, useEffect } from "react";
import './UserInfoStyle.css';

export const UserInfo = () => {
    const [users, setUsers] = useState([]);
    const [posts, setPosts] = useState([]);
    const [activeUserId, setActiveUserId] = useState(null);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(json => setUsers(json));
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(response => response.json())
            .then(json => setPosts(json));
    }, []);

    const handleUserClick = (userId) => {
        setActiveUserId(activeUserId === userId ? null : userId);
    };

  
    const handleClear = () => {
        setActiveUserId(null);
    };

    const getUserPosts = (userId) => {
        return posts.filter(post => post.userId === userId);
    };

    return (
        <div className="container">
           
            <div className="user-list">
                {users.map(user => (
                    <div
                        key={user.id}
                        className={`user-button ${activeUserId === user.id ? 'active' : ''}`}
                        onClick={() => handleUserClick(user.id)}
                    >
                        {user.name}
                    </div>
                ))}
            </div>

            <div className="post-list">
                {activeUserId && (
                    <>
                        <div className="post-list-header">
                            <h2>Посты пользователя {users.find(user => user.id === activeUserId)?.name}</h2>
                            <button onClick={handleClear} className="clear-button">
                                Очистить
                            </button>
                        </div>
                        {getUserPosts(activeUserId).map(post => (
                            <div key={post.id} className="post-card">
                               
                                <div className="post-header">
                                    <strong>Автор:</strong> {users.find(user => user.id === post.userId)?.name}
                                </div>
                               
                                <div className="post-body">
                                    <strong>Title:</strong> {post.title}
                                    <br />
                                    <strong>Body:</strong> {post.body}
                                </div>
                            </div>
                        ))}
                    </>
                )}
            </div>
        </div>
    );
};