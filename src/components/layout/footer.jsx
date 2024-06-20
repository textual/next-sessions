import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="bg-gray-800 pb-2 pt-1 px-2">
      <div className="text-gray-300">
        {/* <Link href="/info/releases">releases</Link> */}
        <Link href="/auth/token">cookies</Link>
      </div>
    </footer>
  );
};
