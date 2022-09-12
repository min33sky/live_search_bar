import { useState } from 'react';
import LiveSearch from './components/LiveSearch';
import { profiles } from './data/profiles';

export interface Profile {
  id: string;
  name: string;
}

export default function App() {
  const [results, setResults] = useState<Profile[]>([]); // search results
  const [selected, setSelected] = useState<Profile | null>(null); // selected keyword

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
    setSelected(item);
  };

  return (
    <div className="h-screen bg-indigo-100 flex items-center justify-center">
      <LiveSearch
        results={results}
        onChange={handleChange}
        onSelect={handleSelect}
        value={selected?.name}
      />
    </div>
  );
}
