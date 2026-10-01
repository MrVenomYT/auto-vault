"use client"

import React, { createContext, useContext, useState, useEffect } from "react"
import { PlatformSettings, DEFAULT_SETTINGS } from "@/lib/types/settings"

interface SettingsContextType {
  settings: PlatformSettings
  loading: boolean
  refreshSettings: () => Promise<void>
  updateSettings: (newSettings: Partial<PlatformSettings>) => Promise<boolean>
}

const PlatformSettingsContext = createContext<SettingsContextType>({
  settings: DEFAULT_SETTINGS,
  loading: false,
  refreshSettings: async () => {},
  updateSettings: async () => false,
})

export function PlatformSettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<PlatformSettings>(DEFAULT_SETTINGS)
  const [loading, setLoading] = useState<boolean>(true)

  const refreshSettings = async () => {
    try {
      const res = await fetch("/api/settings")
      if (res.ok) {
        const data = await res.json()
        if (data.settings) {
          setSettings(data.settings)
        }
      }
    } catch (e) {
      // Fallback to local default
    } finally {
      setLoading(false)
    }
  }

  const updateSettings = async (newSettings: Partial<PlatformSettings>): Promise<boolean> => {
    try {
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newSettings),
      })
      if (res.ok) {
        const data = await res.json()
        if (data.settings) {
          setSettings(data.settings)
          return true
        }
      }
      return false
    } catch (e) {
      return false
    }
  }

  useEffect(() => {
    refreshSettings()
    // Poll settings every 5 seconds for live realtime updates across tabs
    const interval = setInterval(refreshSettings, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <PlatformSettingsContext.Provider value={{ settings, loading, refreshSettings, updateSettings }}>
      {children}
    </PlatformSettingsContext.Provider>
  )
}

export function usePlatformSettings() {
  return useContext(PlatformSettingsContext)
}
