'use client'

import { cn } from '@/lib/utils'
import { eanValidator } from '@/utils/ean-validate'
import { useEffect, useState } from 'react'
import { Input } from '../ui/input'

export const SValidator = () => {
	const [input, setInput] = useState('')
	const [status, setStatus] = useState(false)

	useEffect(() => {
		if (input.length <= 1 || input.length > 13) return
		setStatus(eanValidator(input))
	}, [input, input.length])

	return (
		<div className="space-y-2">
			<Input
				value={input}
				minLength={2}
				maxLength={13}
				onChange={(e) => setInput(e.target.value)}
			/>
			{input.length > 1 && (
				<p
					className={cn(
						'text-sm font-semibold',
						status ? 'text-emerald-500' : 'text-red-500',
					)}
				>
					{`Ean ${status ? 'válido.' : 'inválido.'}`}
				</p>
			)}
		</div>
	)
}
