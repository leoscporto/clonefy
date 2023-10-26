import { ReactNode } from "react";

interface ShowProps {
  children: ReactNode;
  when: boolean;
  fallback?: ReactNode;
}

export default function Show({ children, when, fallback }: ShowProps) {
  if (when) return <>{children}</>;

  return <>{fallback}</>;
}
