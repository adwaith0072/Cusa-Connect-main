import { Link } from 'wouter';

export default function NotFound() {
  return (
    <main className="flex min-h-[100dvh] w-full items-center justify-center bg-[#f4f0e8] px-6 text-[#17363a]">
      <div className="max-w-md text-center">
        <p className="section-label text-[#b8431f]">404</p>
        <h1 className="display mt-3 text-4xl font-bold tracking-[-.05em]">That page wandered off.</h1>
        <p className="mt-4 text-sm leading-6 text-[#566761]">
          The link may be old or mistyped. The noticeboard is still where you left it.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex rounded-full bg-[#c9502f] px-5 py-3 text-sm font-bold text-[#fff8e9] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#17363a] focus-visible:ring-offset-2"
        >
          Back to CusatThings
        </Link>
      </div>
    </main>
  );
}
