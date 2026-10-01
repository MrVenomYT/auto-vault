import Link from "next/link"
import { ArrowLeft, Car } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center space-y-4">
      <div className="w-12 h-12 rounded-2xl bg-red-600/20 text-red-500 flex items-center justify-center">
        <Car className="w-6 h-6" />
      </div>
      <h2 className="text-3xl font-black text-white">Vehicle Record Not Found</h2>
      <p className="text-xs text-zinc-400 max-w-sm">
        The requested model specification is not available in our current catalog.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-all shadow-md shadow-red-600/30"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Showroom</span>
      </Link>
    </div>
  )
}
