import { useState } from 'react';
import LiveSearch from '../components/LiveSearch';
import { Profile } from '../types';
import profiles from '../data/profile.json';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const [results, setResults] = useState<Profile[]>([]); // 검색결과목록
  const navigate = useNavigate();

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
    navigate(`/search/${item.name}`);
  };

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gradient-to-tr from-indigo-400 to-indigo-200">
      <div className="-mt-64 flex flex-col space-y-8">
        <h1 className="select-none text-center text-2xl font-bold tracking-wide text-slate-700">
          검색 드가자
        </h1>

        <LiveSearch
          results={results}
          onUpdateResult={handleChange}
          onSelect={handleSelect}
        />
      </div>
    </div>
  );
}
