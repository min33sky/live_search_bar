import { useState } from 'react';
import LiveSearch from './components/LiveSearch';
import { profiles } from './data/profiles';

export interface Profile {
  id: string;
  name: string;
}

export default function App() {
  const [results, setResults] = useState<Profile[]>([]);
  const [selected, setSelected] = useState<Profile | null>(null);

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { target } = e;
    if (!target.value.trim()) return setResults([]);
    const filteredValue = profiles.filter((profile) =>
      profile.name.toLowerCase().startsWith(target.value),
    );
    setResults(filteredValue);
  };

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
