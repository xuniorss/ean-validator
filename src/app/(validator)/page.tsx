'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { EansProps } from '@/types'
import { eanValidator } from '@/utils/ean-validate'

import { ChangeEvent, useCallback, useState } from 'react'

export default function ValidatorPage() {
	const [fileContent, setFileContent] = useState<string | null>(null)
	const [validEANs, setValidEANs] = useState<EansProps[]>([])
	const [invalidEANs, setInvalidEANs] = useState<EansProps[]>([])
	const [file, setFile] = useState<File | null>(null)

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

	const onValidate = useCallback(() => {
		if (fileContent) {
			const lines = fileContent.split('\n')
			const validEANsArray: EansProps[] = []
			const invalidEANsArray: EansProps[] = []

			for (const line of lines) {
				if (line.toLowerCase().includes('cod_produto cod_ean')) continue

				const [codProduto, ean] = line.trim().split(/\s+/)
				if (eanValidator(ean)) validEANsArray.push({ codProduto, ean })
				else invalidEANsArray.push({ codProduto, ean })
			}

			setValidEANs(validEANsArray)
			setInvalidEANs(invalidEANsArray)
		}
	}, [fileContent])

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
						{validEANs.length > 0 && (
							<div className="flex h-full flex-col">
								<h3>EANs Válidos: {validEANs.length}</h3>
								<ul>
									{validEANs.map((ean, idx) => (
										<li key={idx}>
											<strong>COD_PRODUTO:</strong> {ean.codProduto}
											{'; '}
											<strong>COD_EAN:</strong> {ean.ean}
										</li>
									))}
								</ul>
							</div>
						)}
					</div>

					<div className="mt-4">
						{invalidEANs.length > 0 && (
							<div className="flex h-full flex-col">
								<h3>EANs Inválidos: {invalidEANs.length}</h3>
								<ul>
									{invalidEANs.map((ean, idx) => (
										<li key={idx}>
											<strong>COD_PRODUTO:</strong> {ean.codProduto}
											{'; '}
											<strong>COD_EAN:</strong> {ean.ean}
										</li>
									))}
								</ul>
							</div>
						)}
					</div>
				</div>
			</section>
		</section>
	)
}
