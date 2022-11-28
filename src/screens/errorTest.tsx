import { useState } from 'react';

/**
 * Error Test용 페이지
 */
export default function ErrorTest() {
  const [test, setTest] = useState<any[]>([]);

  return <div>{test[0].name}</div>;
}
