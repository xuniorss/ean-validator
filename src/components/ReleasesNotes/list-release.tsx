import { Dot, Hash } from 'lucide-react'

interface ListReleaseProps {
	title: string
	description?: string
}

export const ListRelease = ({ title = '', description }: ListReleaseProps) => {
	return (
		<>
			<span className="flex items-center gap-x-2">
				<Hash className="h-4 w-4" />
				<h4 className="text-base font-semibold text-secondary-foreground">
					{title}
				</h4>
			</span>
			{description && (
				<ul className="ml-4">
					<li className="flex">
						<Dot />
						<p className="text-sm text-gray-700">{description}</p>
					</li>
				</ul>
			)}
		</>
	)
}
