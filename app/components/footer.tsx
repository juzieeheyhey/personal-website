export default function Footer() {
  return (
    <footer className="border-t border-violet-200 bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-zinc-600 lowercase">
            © {new Date().getFullYear()} jessica.ng. all rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
