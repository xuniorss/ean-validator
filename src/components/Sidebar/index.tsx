'use client'

import { cn } from '@/lib/utils'
import { Binary, CheckSquare, LucideIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

type RoutesProps = {
	label: string
	href: string
	icon: LucideIcon
}

const sidebarRoutes: RoutesProps[] = [
	{ label: 'Validador', href: '/', icon: CheckSquare },
]

export const Sidebar = () => {
	const pathname = usePathname()

	return (
		<aside className="fixed inset-y-0 hidden h-full w-72 border-r py-5 lg:flex lg:flex-col lg:items-center">
			<section className="flex-1 space-y-10">
				<Link href="/" className="flex items-center">
					<Binary className="h-7 w-7" />
					<h1 className="text-lg font-bold">Validador de Eans</h1>
				</Link>

				<ul className="w-full space-y-3">
					{sidebarRoutes.map((route) => (
						<li
							key={route.href}
							className={cn(
								'rounded-md px-4 py-3 transition hover:bg-secondary',
								route.href === pathname && 'bg-secondary',
							)}
						>
							<Link
								href={route.href}
								className="flex items-center gap-x-2"
							>
								<route.icon className="h-5 w-5" />
								<p>{route.label}</p>
							</Link>
						</li>
					))}
				</ul>
			</section>
			<section className="flex flex-col items-center">
				<p>Desenvolvido por:</p>
				<strong>Gilberto Fortunato - Conversão</strong>
			</section>
		</aside>
	)
}