import { useCallback, useEffect, useRef, useState } from 'react';
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Profile } from '../types';

interface Props {
  results?: Profile[];
  onChange: React.ChangeEventHandler;
  onSelect: (item: Profile) => void;
}

/**
 * 검색창 컴포넌트
 */
export default function LiveSearch({
  results = [],
  onChange,
  onSelect,
}: Props) {
  const [focusedIndex, setFocusedIndex] = useState(-1); // 커서 인덱스
  const seletedCursorRef = useRef<HTMLLIElement>(null); // 커서가 위치한 요소를 참조하는 Ref
  const [showResults, setShowResults] = useState(false); // 검색 결과 표시 여부
  const [keyword, setKeyword] = useState(''); // 검색창에 표시할 기본값

  const handleSelection = (selectedIndex: number) => {
    const selectedItem = results[selectedIndex];
    if (!selectedItem) return resetSearchComplete();
    onSelect(selectedItem);
    resetSearchComplete();
  };

  const resetSearchComplete = useCallback(() => {
    setFocusedIndex(-1);
    setShowResults(false);
  }, []);

  const handleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
    const { key } = e;

    let nextIndexCount = 0;

    if (key === 'ArrowDown') {
      nextIndexCount = (focusedIndex + 1) % results.length;
    } else if (key === 'ArrowUp') {
      nextIndexCount = (focusedIndex + results.length - 1) % results.length;
    } else if (key === 'Escape') {
      resetSearchComplete();
    } else if (key === 'Enter') {
      e.preventDefault();
      handleSelection(focusedIndex);
    } else {
      return;
    }

    setFocusedIndex(nextIndexCount);
    setKeyword(results[nextIndexCount]?.name || '');
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setKeyword(e.target.value);
    onChange(e);
  };

  /**
   * X 버튼 클릭시 검색창 초기화
   */
  const handleClickReset = () => {
    setKeyword('');
    resetSearchComplete();
  };

  useEffect(() => {
    if (!seletedCursorRef.current) return;
    //? 커서가 이동할 때마다 커서를 스크롤의 중앙에 위치시킨다.
    seletedCursorRef.current.scrollIntoView({
      block: 'center',
    });
  }, [focusedIndex]);

  useEffect(() => {
    if (results.length > 0 && !showResults) {
      setShowResults(true);
    }
    if (results.length <= 0) setShowResults(false);
  }, [results]);

  return (
    <div className="relative" onKeyDown={handleKeyDown}>
      <input
        type="text"
        className="w-[600px] max-w-[90vmin] rounded-full border border-gray-100 px-10
      py-3 text-lg outline-none transition focus:rounded-b-none focus:rounded-t-lg focus:border-gray-100"
        placeholder="Search..."
        onChange={handleChange}
        onBlur={resetSearchComplete}
        onFocus={() => results.length > 0 && setShowResults(true)}
        value={keyword}
      />

      <MagnifyingGlassIcon className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-500" />
      <XMarkIcon
        aria-label="Reset Button"
        onClick={handleClickReset}
        className={`absolute top-1/2 right-3  h-5 w-5 -translate-y-1/2 cursor-pointer text-gray-500 ${
          keyword ? 'flex' : 'hidden'
        }`}
      />

      {showResults && (
        <div
          aria-label="검색 제안 목록"
          className="absolute max-h-56 w-full overflow-y-auto rounded-b-lg  bg-white p-2 shadow-lg"
        >
          <ul>
            {results.map((result, index) => (
              <li
                key={result.id}
                ref={index === focusedIndex ? seletedCursorRef : null}
                onMouseDown={() => handleSelection(index)}
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
