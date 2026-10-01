"use client"

import { Clock, ChevronRight } from "lucide-react"

interface TimelineNavProps {
  selectedYear: number | null
  onSelectYear: (year: number | null) => void
  onSelectDecade: (start: number, end: number) => void
}

const DECADES = [
  { label: "1880s", start: 1880, end: 1889, highlight: 1886 },
  { label: "1890s", start: 1890, end: 1899, highlight: 1896 },
  { label: "1900s", start: 1900, end: 1909, highlight: 1908 },
  { label: "1910s", start: 1910, end: 1919, highlight: 1914 },
  { label: "1920s", start: 1920, end: 1929, highlight: 1928 },
  { label: "1930s", start: 1930, end: 1939, highlight: 1936 },
  { label: "1940s", start: 1940, end: 1949, highlight: 1948 },
  { label: "1950s", start: 1950, end: 1959, highlight: 1954 },
  { label: "1960s", start: 1960, end: 1969, highlight: 1962 },
  { label: "1970s", start: 1970, end: 1979, highlight: 1974 },
  { label: "1980s", start: 1980, end: 1989, highlight: 1987 },
  { label: "1990s", start: 1990, end: 1999, highlight: 1992 },
  { label: "2000s", start: 2000, end: 2009, highlight: 2004 },
  { label: "2010s", start: 2010, end: 2019, highlight: 2016 },
  { label: "2020s", start: 2020, end: 2026, highlight: 2026 }
]

export default function TimelineNav({
  selectedYear,
  onSelectYear,
  onSelectDecade
}: TimelineNavProps) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-zinc-800">
        <div className="flex items-center gap-2 text-xs font-bold text-red-500 uppercase tracking-wider">
          <Clock className="w-4 h-4" />
          <span>Chronological Timeline Navigator (1880 to 2026)</span>
        </div>
        {selectedYear !== null && (
          <button
            onClick={() => onSelectYear(null)}
            className="text-xs text-red-400 hover:text-red-300 font-medium underline text-left sm:text-right"
          >
            Show All Decades
          </button>
        )}
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {DECADES.map((dec) => {
          const isSelected = selectedYear && selectedYear >= dec.start && selectedYear <= dec.end

          return (
            <button
              key={dec.label}
              onClick={() => {
                onSelectDecade(dec.start, dec.end)
                onSelectYear(dec.highlight)
              }}
              className={`flex-shrink-0 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                isSelected
                  ? "bg-red-600 text-white shadow-lg shadow-red-600/30"
                  : "bg-zinc-950 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700"
              }`}
            >
              <span>{dec.label}</span>
              <ChevronRight className="w-3 h-3 opacity-60" />
            </button>
          )
        })}
      </div>
    </div>
  )
}
