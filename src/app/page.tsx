'use client'

import { Input } from '@/components/ui/input'
import { eanValidator } from '@/utils/ean-validate'
import { ChangeEvent, useCallback, useState } from 'react'

type EansTypes = {
	codProduto: string
	ean: string
}

export default function Home() {
	const [fileContent, setFileContent] = useState<string | null>(null)
	const [validEANs, setValidEANs] = useState<EansTypes[]>([])
	const [invalidEANs, setInvalidEANs] = useState<EansTypes[]>([])

	// 1 - 8 codigo produto
	// 9 - 21 cod ean

	const handleFileChange = useCallback(
		(event: ChangeEvent<HTMLInputElement>) => {
			const selectedFile = event.target.files?.[0]

			if (!selectedFile) return

			const fileReader = new FileReader()
			fileReader.onload = (e) => {
				const content = e.target?.result as string
				setFileContent(content)
			}

			fileReader.readAsText(selectedFile)
		},
		[],
	)

	const onValidate = useCallback((value: string) => {
		return eanValidator(value)
	}, [])

	const validateEan = useCallback(() => {
		if (fileContent) {
			const lines = fileContent.split('\n')
			const validEANsArray: EansTypes[] = []
			const invalidEANsArray: EansTypes[] = []

			lines.forEach((line, idx) => {
				const [codProduto, ean] = line.split('**')
				if (onValidate(ean)) validEANsArray.push({ codProduto, ean })
				else invalidEANsArray.push({ codProduto, ean })
			})

			setValidEANs(validEANsArray)
			setInvalidEANs(invalidEANsArray)
		}
	}, [fileContent, onValidate])

	return (
		<div>
			<Input type="file" accept=".txt" onChange={handleFileChange} />
			<button type="button" onClick={validateEan}>
				Validar
			</button>
			<div>
				<h2>EANs Válidos:</h2>
				<ul>
					<p>Qtd: {validEANs.length}</p>
					{validEANs.map((ean, index) => (
						<li key={index}>
							<strong>Código do Produto:</strong> {ean.codProduto},{' '}
							<strong>EAN:</strong> {ean.ean}
						</li>
					))}
				</ul>
			</div>

			<div>
				<h2>EANs Inválidos:</h2>
				<ul>
					<p>Qtd: {invalidEANs.length}</p>
					{invalidEANs.map((ean, index) => (
						<li key={index}>
							<strong>Código do Produto:</strong> {ean.codProduto},{' '}
							<strong>EAN:</strong> {ean.ean}
						</li>
					))}
				</ul>
			</div>
		</div>
	)
}
