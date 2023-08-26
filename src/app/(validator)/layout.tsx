import { ReactNode } from 'react'

export default function ValidatorLayout({ children }: { children: ReactNode }) {
	return <main className="pl-0 lg:pl-72">{children}</main>
}
