import React from 'react';

export default function About() {
  return (
    <div className="space-y-4">
      <h1 className="text-center text-3xl font-bold">검색창 컴포넌트</h1>
      <p className="text-xl">
        <span className="font-bold underline">react</span>와{' '}
        <span className="font-bold underline">react-router</span> 6버전을
        사용했습니다.
      </p>
    </div>
  );
}
