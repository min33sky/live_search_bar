import { useState } from 'react';
import LiveSearch from './components/LiveSearch';
import profiles from './data/profile.json';
import { Profile } from './types';

export default function App() {
  const [results, setResults] = useState<Profile[]>([]); // 검색결과목록
  const [selected, setSelected] = useState<Profile | null>(null); // 선택한 키워드

  /**
   * 입력값에 따라 검색 결과를 필터링하는 함수
   */
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { target } = e;

    if (!target.value.trim()) return setResults([]);

    const filteredValue = profiles.filter((profile) =>
      profile.name.toLowerCase().startsWith(target.value),
    );

    setResults(filteredValue);
  };

  /**
   * 현재 값을 선택하는 함수
   */
  const handleSelect = (item: Profile) => {
    console.log('현재 선택된 값: ', item);
    setSelected(item);
  };

  return (
    <div className="flex h-screen items-center justify-center bg-indigo-100">
      <div className="-mt-64 flex flex-col space-y-8">
        <h1 className="text-center text-2xl font-bold tracking-wide">검색창</h1>

        <LiveSearch
          results={results}
          onChange={handleChange}
          onSelect={handleSelect}
        />
      </div>
    </div>
  );
}
