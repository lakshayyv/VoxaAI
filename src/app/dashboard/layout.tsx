export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className="md:flex w-full md:min-h-screen">{children}</div>;
}
