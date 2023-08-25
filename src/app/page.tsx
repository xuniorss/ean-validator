'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { eanValidator } from '@/utils/ean-validate'
import { Binary } from 'lucide-react'

import { ChangeEvent, useCallback, useState } from 'react'

type EansTypes = {
	codProduto: string
	ean: string
}

export default function Home() {
	const [fileContent, setFileContent] = useState<string | null>(null)
	const [validEANs, setValidEANs] = useState<EansTypes[]>([])
	const [invalidEANs, setInvalidEANs] = useState<EansTypes[]>([])
	const [isLoading, setIsLoading] = useState(false)
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
			const validEANsArray: EansTypes[] = []
			const invalidEANsArray: EansTypes[] = []

			lines.forEach((line) => {
				const [codProduto, ean] = line.split('**')
				if (eanValidator(ean)) validEANsArray.push({ codProduto, ean })
				else invalidEANsArray.push({ codProduto, ean })
			})

			setValidEANs(validEANsArray)
			setInvalidEANs(invalidEANsArray)
		}
	}, [fileContent])

	return (
		<section className="flex h-full w-full flex-col">
			<header className="fixed top-0 flex w-full items-center justify-center border-b bg-slate-50 px-5 py-3 lg:justify-between">
				<span className="hidden items-center gap-x-2 lg:flex">
					<Binary className="h-7 w-7" />
					<h1 className="text-lg font-bold">Validador de Eans</h1>
				</span>

				<div className="flex items-center gap-x-2">
					<Input
						type="file"
						accept=".txt"
						onChange={handleFileChange}
						className="col-span-1 lg:col-span-2"
					/>
					<Button
						className="col-span-1 select-none"
						onClick={onValidate}
						disabled={!file}
					>
						Validar
					</Button>
				</div>

				<h2 className="hidden text-sm font-semibold lg:inline-flex">
					Desenvolvido por: Gilberto Fortunato - Conversão
				</h2>
			</header>

			<article className="flex h-full w-full flex-col items-center pt-20">
				<section className="grid h-full w-full max-w-screen-lg grid-cols-1 lg:grid-cols-2">
					<div>
						{validEANs.length > 0 && (
							<div className="flex h-full flex-col">
								<h3>EANs Válidos: {validEANs.length}</h3>
								<ul>
									{validEANs.map((ean, idx) => (
										<li key={idx}>
											<strong>COD_PRODUTO:</strong> {ean.codProduto}
											<strong>COD_EAN:</strong> {ean.ean}
										</li>
									))}
								</ul>
							</div>
						)}
					</div>

					<div>
						{invalidEANs.length > 0 && (
							<div className="flex h-full flex-col">
								<h3>EANs Inválidos: {invalidEANs.length}</h3>
								<ul>
									{invalidEANs.map((ean, idx) => (
										<li key={idx}>
											<strong>COD_PRODUTO:</strong> {ean.codProduto}
											<strong>COD_EAN:</strong> {ean.ean}
										</li>
									))}
								</ul>
							</div>
						)}
					</div>
				</section>
			</article>
		</section>
	)
}
