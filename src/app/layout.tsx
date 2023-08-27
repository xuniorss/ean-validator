import { Sidebar } from '@/components/Sidebar'
import { cn } from '@/lib/utils'

import './globals.css'

import { ReleasesNotesProvider } from '@/components/providers/release-note-provider'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ReactNode } from 'react'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Validador de EANS',
	description: 'Leia um arquivo de texto e valide os eans contidos nele.',
}

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="pt-BR">
			<body className={cn('antialiased', inter.className)}>
				<Sidebar />
				<ReleasesNotesProvider />
				{children}
			</body>
		</html>
	)
}
