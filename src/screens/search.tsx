import React from 'react';
import { useParams } from 'react-router-dom';

/**
 * 검색 결과 페이지
 */
export default function Search() {
  //? TODO: query string으로 검색어를 받아서 검색 결과를 보여준다.
  const { keyword } = useParams();

  return (
    <div>
      <h1 className="text-5xl font-bold">검색 키워드 : {keyword}</h1>
    </div>
  );
}
