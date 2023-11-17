import Link from "next/link";

export default function Logo() {
  return (
    <Link
      href="/"
      className="font-bold font-3xl bg-gradient-to-r from-indigo-400 to-cyan-400 hover:cursor-pointer text-transparent bg-clip-text"
    >
      PageForm
    </Link>
  );
}
