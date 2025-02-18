'use client';

import Pagination from '@/components/common/Pagination';
import PageLayout from '@/components/layout/pageLayout/PageLayout';
import SeminarSearchBar from '@/components/seminar/SearchBar';
import SeminarRow from '@/components/seminar/SeminarRow';
import SeminarYear from '@/components/seminar/SeminarYear';

import { useCustomSearchParams } from '@/hooks/useCustomSearchParams';

import { GETSeminarPostsResponse } from '@/types/post';

const postsCountPerPage = 10;

export default function SeminarContent({
  data: { searchList, total },
}: {
  data: GETSeminarPostsResponse;
}) {
  const { page, setSearchParams } = useCustomSearchParams();

  const setCurrentPage = (pageNum: number) => {
    setSearchParams({ purpose: 'navigation', page: pageNum });
  };

  return (
    <PageLayout titleType="big" titleMargin="mb-6">
      <div className="flex flex-row items-center gap-6">
        <h3 className="text-neutral-700 font-yoon text-md font-bold w-7 text-center leading-[1.2rem]">
          검색
        </h3>
        <SeminarSearchBar setSearchParams={setSearchParams} />
      </div>
      <div className="flex flex-col mt-10 mb-8 border-neutral-200 border-b-[1px]">
        {searchList.map((post, index) => (
          <div key={post.id}>
            {post.isYearLast && <SeminarYear index={index} startDate={post.startDate} />}
            <SeminarRow
              id={post.id}
              title={post.title}
              host={post.name}
              company={post.affiliation}
              date={new Date(post.startDate)}
              location={post.location}
              imageURL={post.imageURL}
              isYearLast={post.isYearLast}
            />
          </div>
        ))}
      </div>
      <Pagination
        totalPostsCount={total ?? 0}
        postsCountPerPage={postsCountPerPage}
        currentPage={page}
        setCurrentPage={setCurrentPage}
      />
    </PageLayout>
  );
}
