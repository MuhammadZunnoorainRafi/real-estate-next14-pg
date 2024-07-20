import React from 'react';

function ErrorMessage({ message }: { message: string }) {
  if (!message) return;
  return (
    <div className="w-full p-1 bg-red-300 text-red-600 rounded-lg mt-2 text-center">
      {message}
    </div>
  );
}

export default ErrorMessage;
