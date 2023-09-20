'use client'

import { EansArray } from '@/components/EansArray'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { EansProps } from '@/types'
import { processFileContent } from '@/utils/process-file-content'
import { ChangeEvent, useCallback, useState } from 'react'

export default function ValidatorPage() {
	const [eanData, setEanData] = useState<{
		valid: EansProps[]
		invalid: EansProps[]
	}>({ valid: [], invalid: [] })

	const [file, setFile] = useState<File | null>(null)
	const [fileContent, setFileContent] = useState<string | null>(null)

	const handleFileChange = useCallback(
		(event: ChangeEvent<HTMLInputElement>) => {
			const selectedFile = event.target.files?.[0]

			if (!selectedFile) return

			setFile(selectedFile)

			const fileReader = new FileReader()
			fileReader.onload = (e) => {
				const content = e.target?.result as string
				setFileContent(content)
			}

			fileReader.readAsText(selectedFile)
		},
		[],
	)

	const onValidate = () => {
		const processedData = processFileContent(fileContent)
		setEanData(processedData)
	}

	return (
		<section className="flex h-full w-full flex-col">
			<header className="fixed top-0 flex w-full items-center border-b bg-slate-50 p-3">
				<div className="flex items-center gap-x-1">
					<Input type="file" accept=".txt" onChange={handleFileChange} />
					<Button
						aria-label="validate-ean-txt"
						size="sm"
						onClick={onValidate}
						disabled={!file}
					>
						Validar
					</Button>
				</div>
			</header>

			<section className="mt-16 flex flex-col items-center">
				<div className="grid h-full w-full max-w-screen-lg grid-cols-1 lg:grid-cols-2">
					<div className="mt-4 flex">
						{eanData.valid.length > 0 && (
							<div className="flex h-full flex-col">
								<h3>EANs Válidos: {eanData.valid.length}</h3>
								<EansArray data={eanData.valid} />
							</div>
						)}
					</div>

					<div className="mt-4">
						{eanData.invalid.length > 0 && (
							<div className="flex h-full flex-col">
								<h3>EANs Inválidos: {eanData.invalid.length}</h3>
								<EansArray data={eanData.invalid} />
							</div>
						)}
					</div>
				</div>
			</section>
		</section>
	)
}
