import { useCallback, useEffect, useRef, useState } from 'react';
import { Profile } from '../App';

interface Props {
  results?: Profile[];
  onChange: React.ChangeEventHandler;
  onSelect: (item: Profile) => void;
  value?: string;
}

export default function LiveSearch({
  results = [],
  onChange,
  onSelect,
  value,
}: Props) {
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const seletedCursorRef = useRef<HTMLLIElement>(null);
  const [showResults, setShowResults] = useState(false);
  const [defaultValue, setDefaultValue] = useState('');

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
    }

    setFocusedIndex(nextIndexCount);
  };

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setDefaultValue(e.target.value);
    onChange(e);
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

  useEffect(() => {
    if (value) setDefaultValue(value);
  }, [value]);

  return (
    <div className="relative" onKeyDown={handleKeyDown}>
      <input
        type="text"
        className="w-[600px] max-w-[90vmin] px-5 py-3 text-lg rounded-full
      border-2 border-gray-500 focus:border-gray-700 outline-none transition"
        placeholder="Search..."
        onChange={handleChange}
        onBlur={resetSearchComplete}
        onFocus={() => results.length > 0 && setShowResults(true)}
        value={defaultValue}
      />
      {showResults && (
        <div className="absolute mt-1 w-full p-2 bg-white shadow-lg  rounded-b-lg max-h-56 overflow-y-auto">
          <ul>
            {results.map((result, index) => (
              <li
                key={result.id}
                ref={index === focusedIndex ? seletedCursorRef : null}
                onMouseDown={() => handleSelection(index)}
                className={`p-2 hover:bg-black/10 cursor-pointer ${
                  index === focusedIndex ? 'bg-black/10' : ''
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
