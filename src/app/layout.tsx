import { cn } from '@/lib/utils'

import './globals.css'

import { Sidebar } from '@/components/Sidebar'
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
				{children}
			</body>
		</html>
	)
}
