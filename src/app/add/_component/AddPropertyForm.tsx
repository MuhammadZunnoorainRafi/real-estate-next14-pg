'use client';
import React, { useState } from 'react';
import Stepper from './Stepper';
import { Button } from '@nextui-org/react';

const items = [
  { label: 'Basic' },
  { label: 'Location' },
  { label: 'Features' },
  { label: 'Contact' },
];

function AddPropertyForm() {
  const [activeItem, setActiveItem] = useState(0);
  return (
    <div>
      <Stepper
        items={items}
        activeItem={activeItem}
        setActiveItem={setActiveItem}
      />
      <div className="flex items-center justify-between">
        <Button onClick={() => setActiveItem((prev) => prev - 1)}>Back</Button>
        <Button onClick={() => setActiveItem((prev) => prev + 1)}>Next</Button>
      </div>
    </div>
  );
}

export default AddPropertyForm;
