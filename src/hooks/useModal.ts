import { ReactNode, useState } from "react";

export const useModal = () => {
  const [showModal, setShowModal] = useState<ReactNode | null>(null);

  return { showModal, setShowModal };
};
