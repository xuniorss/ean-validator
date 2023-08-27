'use client'

import { useEffect, useState } from 'react'
import { ReleasesNotes } from '../ReleasesNotes'

export const ReleasesNotesProvider = () => {
	const [isMounted, setIsMounted] = useState(false)

	useEffect(() => setIsMounted(true), [])

	if (!isMounted) return null

	return <ReleasesNotes />
}
