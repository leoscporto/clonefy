import { ReactNode } from "react";

interface ModalProps {
  className?: string;
  children: ReactNode;
}

export default function Modal({ className, children }: ModalProps) {
  return (
    <div className={`fixed inset-0 z-50 h-full w-full ${className}`}>
      {children}
    </div>
  );
}
