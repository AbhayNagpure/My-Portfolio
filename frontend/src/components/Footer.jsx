export default function Footer() {
  return (
    <footer className="py-8 text-center flex flex-col items-center justify-center">
      <div className="w-12 h-1 rounded-full bg-zinc-800 mb-6" />
      <p className="text-zinc-500 font-medium">
        © {new Date().getFullYear()} Abhay Nagpure. All rights reserved.
      </p>
    </footer>
  );
}
