import { ReactNode, useState } from "react";

export const useModal = (): {
  showModal: ReactNode;
  setShowModal: React.Dispatch<React.SetStateAction<ReactNode>>;
} => {
  const [showModal, setShowModal] = useState<ReactNode | null>(null);

  return { showModal, setShowModal };
};
