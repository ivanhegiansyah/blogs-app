'use client';

import { useEffect, useState } from 'react';
import CommentSection from '@/components/Comment';
import { CommentsResponse, Post } from '@/app/constant/types';

export default function Page({ params }: { params: { id: number } }) {
  const [data, setData] = useState<Post | null>(null);
  const [comments, setComments] = useState<CommentsResponse | null>(null);
  const [itemsToShow, setItemsToShow] = useState(3);

  const getPostById = async (id: number) => {
    try {
      const response = await fetch(`https://dummyjson.com/posts/${id}`);

      if (response) {
        const res = await response.json();
        setData(res);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getCommentsById = async (id: number) => {
    try {
      const response = await fetch(`https://dummyjson.com/comments/post/${id}`);

      if (response) {
        const res = await response.json();
        setComments(res);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const loadMore = () => {
    setItemsToShow((prev) => prev + 3);
  };

  useEffect(() => {
    if (params?.id) {
      getPostById(params.id);
      getCommentsById(params.id);
    }
  }, [params?.id]);

  const commentsList = comments?.comments ?? [];

  return (
    <main className="flex min-h-screen flex-col space-y-8 px-20 py-10">
      <h1 className="font-bold text-4xl text-center">{data?.title}</h1>
      <div className="flex space-x-2 justify-end font-semibold *:rounded-full *:border *:border-slate-100 *:bg-slate-50 *:px-2 *:py-0.5">
        {data?.tags?.map((item, idx) => (
          <div key={`tags-${idx}`}>{item}</div>
        ))}
      </div>
      <p className="text-justify">{data?.body}</p>
      {data?.reactions && (
        <div>
          <p>Likes: {data?.reactions?.likes}</p>
          <p>Dislikes: {data?.reactions?.dislikes}</p>
        </div>
      )}
      <div className="space-y-2">
        {commentsList.length > 0 && <p>Comments:</p>}
        <div className="md:grid md:grid-cols-1 space-y-6 md:space-y-4 md:gap-x-4">
          {commentsList.slice(0, itemsToShow).map((item) => (
            <CommentSection key={item.id} item={item} />
          ))}
          {commentsList.length > itemsToShow && (
            <div className="after:h-px my-24 flex items-center before:h-px before:flex-1 before:bg-gray-300 after:flex-1 after:bg-gray-300">
              <button
                type="button"
                className="flex items-center rounded-full border border-gray-300 bg-secondary-50 px-3 py-2 text-center text-sm font-medium text-gray-900 hover:bg-gray-100"
                onClick={loadMore}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="mr-1 h-4 w-4"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
                Load More
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
