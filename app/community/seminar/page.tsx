'use client';

import { useCallback, useEffect, useState } from 'react';

import { getMockSeminarPosts } from '@/apis/seminar';

import Pagination from '@/components/common/Pagination';
import PageLayout from '@/components/layout/PageLayout';
import SeminarList from '@/components/seminar/SeminarList';

import { useCustomSearchParams } from '@/hooks/useCustomSearchParams';

import { seminar } from '@/types/page';
import { GETSeminarPostsResponse } from '@/types/post';

const postsCountPerPage = 10;

export default function SeminarPage() {
  const { page, keyword, setSearchParams } = useCustomSearchParams();
  const [totalPostsCount, setTotalPostsCount] = useState(0);
  const [posts, setPosts] = useState<GETSeminarPostsResponse['searchList']>([]);

  const setCurrentPage = (pageNum: number) => {
    setSearchParams({ purpose: 'navigation', page: pageNum });
  };

  const fetchPost = useCallback(async () => {
    const res = await getMockSeminarPosts({
      keyword: keyword === null ? undefined : keyword,
      page: page + '',
    });
    setTotalPostsCount(res.total);
    setPosts(res.searchList);
  }, [keyword, page]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  return (
    <PageLayout currentPage={seminar} title="세미나" titleSize="text-2xl">
      {/* <SearchForm key={tags + ''} initKeyword={keyword ?? ''} setSearchParams={setSearchParams} /> */}
      <div className="flex flex-col gap-4 mt-10 mb-8">
        {posts.map((post) => (
          <div key={post.year}>
            <h3>{post.year}</h3>
            <div>
              {post.seminarList.map((seminar) => (
                <SeminarList
                  key={seminar.id}
                  title={seminar.title}
                  author={seminar.author}
                  company={seminar.company}
                  date={new Date(seminar.date)}
                  location={seminar.location}
                  imageURL={seminar.imageURL}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
      <Pagination
        totalPostsCount={totalPostsCount}
        postsCountPerPage={postsCountPerPage}
        currentPage={page}
        setCurrentPage={setCurrentPage}
      />
    </PageLayout>
  );
}
