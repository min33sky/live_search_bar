import { useCallback, useEffect, useRef, useState } from 'react';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Profile } from '../types';

interface Props {
  results?: Profile[]; // 검색결과목록
  onUpdateResult: React.ChangeEventHandler; // 검색결과목록 업데이트하는 함수
  onSelect: (item: Profile) => void; // 선택한 키워드
}

/**
 * 검색창 컴포넌트
 */
export default function LiveSearch({
  results = [],
  onUpdateResult,
  onSelect,
}: Props) {
  const [focusedIndex, setFocusedIndex] = useState(-1); // 커서 인덱스
  const seletedCursorRef = useRef<HTMLLIElement>(null); // 커서가 위치한 요소를 참조하는 Ref
  const [showResults, setShowResults] = useState(false); // 검색 결과 표시 여부
  const [keyword, setKeyword] = useState(''); // 검색창에 표시할 기본값

  /**
   * 검색어 선택시 실행되는 함수
   * @param selectedIndex 선택한 검색결과 인덱스
   */
  const handleSelection = (selectedIndex: number) => {
    const selectedItem = results[selectedIndex];
    if (!selectedItem) return resetSearchComplete();
    onSelect(selectedItem);
    resetSearchComplete();
  };

  /**
   * 검색결과목록을 초기화하는 함수
   */
  const resetSearchComplete = useCallback(() => {
    setFocusedIndex(-1);
    setShowResults(false);
  }, []);

  /**
   * 키보드 이벤트 핸들러
   */
  const handleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (results.length === 0) return;

    const { key } = e;

    let nextIndexCount = -1;

    //? 커서 이동은 위, 아래 방향키로만 이동할 수 있고 순환되도록 구현
    if (key === 'ArrowDown') {
      nextIndexCount = (focusedIndex + 1) % results.length;
    } else if (key === 'ArrowUp') {
      //? 첫 검색 결과에서 위 방향키를 누르면 마지막 검색 결과로 이동
      nextIndexCount =
        focusedIndex === -1
          ? results.length - 1
          : (focusedIndex + results.length - 1) % results.length;
    } else if (key === 'Escape') {
      resetSearchComplete();
    } else if (key === 'Enter') {
      e.preventDefault();
      handleSelection(focusedIndex);
      return; //* return 하지않으면 keyword가 nextIndexCount에 해당하는 값으로 변경됨
    } else {
      return;
    }

    //? 커서를 업데이트하고, 현재 커서에 위치한 키워드를 화면에 표시
    setFocusedIndex(nextIndexCount);
    setKeyword(results[nextIndexCount]?.name || '');
  };

  /**
   * 검색어 입력 핸들러
   */
  const handleChangeKeyword: React.ChangeEventHandler<HTMLInputElement> = (
    e,
  ) => {
    setKeyword(e.target.value); //? 키워드를 업데이트
    onUpdateResult(e); //? 검색결과를 업데이트
  };

  /**
   * X 버튼 (리셋 버튼) 클릭 핸들러
   */
  const handleClickReset = useCallback(() => {
    setKeyword('');
    resetSearchComplete();
  }, []);

  /**
   * 검색결과목록을 클릭했을 때
   */
  const handleClickItem = (index: number) => {
    setKeyword(results[index].name);
    handleSelection(index);
  };

  /**
   * 검색 결과 목록 스크롤 관련
   */
  useEffect(() => {
    if (!seletedCursorRef.current) return;
    //? 커서가 이동할 때마다 커서를 스크롤의 중앙에 위치시킨다.
    seletedCursorRef.current.scrollIntoView({
      block: 'center',
    });
  }, [focusedIndex]);

  /**
   * 검색결과 목록 표시 여부를 결정
   */
  useEffect(() => {
    if (results.length > 0 && !showResults) setShowResults(true);
    if (results.length <= 0) setShowResults(false);
  }, [results]);

  return (
    <div className="relative" onKeyDown={handleKeyDown}>
      <input
        type="text"
        className="w-[600px] max-w-[90vmin] rounded-full border border-gray-100 px-10
      py-3 text-lg outline-none transition focus:rounded-b-none focus:rounded-t-lg focus:border-gray-100"
        placeholder="검색어를 입력하세요"
        onChange={handleChangeKeyword}
        onBlur={resetSearchComplete}
        onFocus={() => results.length > 0 && setShowResults(true)}
        value={keyword}
      />

      {/* 아이콘 */}
      <MagnifyingGlassIcon className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-500" />
      <XMarkIcon
        aria-label="Reset Button"
        onClick={handleClickReset}
        className={`absolute top-1/2 right-3  h-5 w-5 -translate-y-1/2 cursor-pointer text-gray-500 ${
          keyword ? 'flex' : 'hidden'
        }`}
      />

      {/* 검색 목록 */}
      {showResults && (
        <div
          aria-label="검색 제안 목록"
          className="absolute max-h-[200px] w-full overflow-y-auto rounded-b-lg  bg-white p-2 shadow-lg scrollbar-thin scrollbar-track-slate-300  scrollbar-thumb-slate-500"
        >
          <ul>
            {results.map((result, index) => (
              <li
                key={result.id}
                ref={index === focusedIndex ? seletedCursorRef : null}
                onMouseDown={() => handleClickItem(index)}
                className={`cursor-pointer p-2 hover:bg-indigo-100 ${
                  index === focusedIndex ? 'bg-indigo-100' : ''
                }`}
              >
                <p>{result.name}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
