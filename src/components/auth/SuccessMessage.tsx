import React from 'react';

function SuccessMessage({ message }: { message: string }) {
  if (!message) return;
  return (
    <div className="w-full p-3 bg-emerald-400 text-emerald-600">{message}</div>
  );
}

export default SuccessMessage;
