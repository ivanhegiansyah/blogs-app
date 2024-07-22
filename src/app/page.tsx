'use client';

import { useEffect, useState } from 'react';
import Card from '@/components/Card';
import Pagination from '@/components/Pagination';
import { PostsResponse } from './constant/types';

export default function Home() {
  const [data, setData] = useState<PostsResponse | null>(null);
  const [skip, setSkip] = useState<number>(0);
  const [isFetching, setIsFetching] = useState<boolean>(false);

  const getPosts = async (skip: number) => {
    try {
      const response = await fetch(
        `https://dummyjson.com/posts?limit=6&skip=${skip}`
      );

      if (response) {
        const res = await response.json();
        if (res) setData(res);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const onChangePage = (page: any) => {
    setSkip((page.currentPage - 1) * 6);
    setIsFetching(true);
  };

  useEffect(() => {
    getPosts(skip);
  }, []);

  useEffect(() => {
    if (isFetching) {
      getPosts(skip);
      setIsFetching(false);
    }
  }, [isFetching]);

  return (
    <main className="flex min-h-screen flex-col items-center space-y-10 px-20 py-10">
      <div className="md:grid md:grid-cols-1 space-y-6 md:space-y-4 md:gap-x-4">
        {data?.posts?.map((item) => {
          return <Card key={item?.id} item={item} />;
        })}
      </div>

      <Pagination
        pageLimit={6}
        totalRecords={data?.total ?? 0}
        currentPage={Math.floor(skip / 6) + 1}
        onPageChanged={(data: any) => onChangePage(data)}
      />
    </main>
  );
}
