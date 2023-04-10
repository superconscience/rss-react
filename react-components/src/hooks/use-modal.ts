import { useState } from 'react';

export default function useModal() {
  const [isOpen, setisOpen] = useState(false);

  const toggle = (toggle: boolean) => {
    setisOpen(toggle);
  };

  return {
    isOpen,
    toggle,
  };
}
