import { useParams } from 'react-router-dom';
import PostList from '../components/PostList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { useContext, useEffect, useRef, useState } from 'react';
import { UserContext } from '../context/UserContext';
import { addPost } from '../api/forums';
import { fetchPosts } from '../api/forums';
import { userLike } from '../api/forums';

const ForumPage = () => {
  const [showTextArea, setShowTextArea] = useState(false);
  const [newPost, setNewPost] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);
  const { topic } = useParams();
  const { user, isAuthenticated } = useContext(UserContext);
  const textAreaRef = useRef(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      const data = await fetchPosts(topic);
      setPosts(data);
    };
    getPosts();
  }, [topic]);

  // focus cursor in textarea when user clicks new post
  useEffect(() => {
    if (showTextArea && textAreaRef.current) {
      textAreaRef.current.focus();
    }
  }, [showTextArea]);

  const handleClick = () => {
    // if not logged in alert
    if (!isAuthenticated) {
      alert('You must login to post!');
      return;
    }
    setShowTextArea(true);
  };

  const handleCancel = () => {
    setShowTextArea(false);
    setNewPost('');
  };

  const handleSubmitPost = async () => {
    if (!newPost.trim()) {
      alert('Post must contain text');
      return;
    }
    const postData = {
      username: user.username,
      sub: user.sub,
      post: newPost,
    };
    setIsDisabled(true);
    try {
      const newPostData = await addPost(topic, postData); // full post data returned

      if (newPostData && newPostData._id) {
        setPosts((prevPosts) => [newPostData, ...prevPosts]); // Add new post from backend
        setShowTextArea(false);
        setNewPost('');
        alert('Post added successfully!');
        setIsDisabled(false);
      }
    } catch (error) {
      alert('Error submitting post: ' + error.message);
    } finally {
      setIsDisabled(false);
    }
  };

  const handleLike = async (postId) => {
    if (!isAuthenticated) {
      alert('You must be logged in to like/comment');
      return;
    }
    // send users sub and postId to likedBy
    await userLike(topic, user.sub, postId);
    // Optimistically handle user like
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post._id === postId
          ? {
              ...post,
              likedBy:
                Array.isArray(post.likedBy) && post.likedBy.includes(user.sub)
                  ? post.likedBy.filter((sub) => sub !== user.sub) // Unlike
                  : [...(post.likedBy || []), user.sub], // Like
            }
          : post
      )
    );
  };

  return (
    <div className="flex flex-col mt-20 items-center">
      <h1>{topic.charAt(0).toUpperCase() + topic.slice(1)} Forum</h1>
      <div className="flex flex-col items-end">
        <button
          onClick={handleClick}
          className="inline-flex cursor-pointer justify-end items-center gap-x-2 mb-2 mr-2 w-auto"
        >
          <FontAwesomeIcon icon={faPenToSquare} className="fa-2x" />
          <span>New Post</span>
        </button>
        {showTextArea && (
          <div className="flex flex-col items-end">
            <textarea
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              ref={textAreaRef}
              className="flex flex-col border rounded shadow-lg bg-gray-50 w-screen md:w-200 text-black min-h-25 p-2"
            />
            <div className="mb-5 mt-2">
              <button
                onClick={handleCancel}
                className="bg-gray-200 rounded p-1 cursor-pointer"
              >
                Cancel
              </button>
              <button
                disabled={isDisabled}
                onClick={handleSubmitPost}
                className={`primary rounded p-1 w-15 mx-2 cursor-pointer ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                Post
              </button>
            </div>
          </div>
        )}
        <PostList posts={posts} onLike={handleLike} />
      </div>
    </div>
  );
};

export default ForumPage;
