import { useEffect, useRef, useState } from 'react';

const CommentList = ({ comments }) => {
  const textAreaRef = useRef(null);
  const [comment, setComment] = useState('');

  // focus cursor in textarea when user clicks comment
  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.focus();
    }
  }, []);

  const handleInput = () => {
    if (textAreaRef.current) {
      if (textAreaRef.current) {
        textAreaRef.current.style.height = 'auto';
        textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
      }
    }
  };

  return (
    <>
      <div className="relative">
        <textarea
          ref={textAreaRef}
          value={comment}
          rows={1}
          onChange={(e) => {
            setComment(e.target.value);
            handleInput();
          }}
          placeholder="Add comment..."
          className="bg-gray-50 md:w-200 text-black rounded p-2 pb-10 outline-none w-full min-h-25 resize-none overflow-hidden focus:ring-0 focus:border-transparent"
        />
        {comment && (
          <button className="absolute bottom-2 right-2 primary text-white px-1 md:px-3 py-1 rounded-full cursor-pointer">
            Comment
          </button>
        )}
      </div>
      {/* <ul>
        {comments.map((comment) => {
          <li key={comment._id}>
            <div
              className={`flex flex-col px-2 border border-gray-300 rounded shadow-lg bg-gray-50 w-screen md:w-200 text-black min-h-25`}
            >
              <p>{comment.comment}</p>
            </div>
          </li>;
        })}
      </ul> */}
    </>
  );
};

export default CommentList;
