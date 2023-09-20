import { EansProps } from '@/types'
import { eanValidator } from './ean-validate'

export const processFileContent = (
	fileContent: string | null,
): {
	valid: EansProps[]
	invalid: EansProps[]
} => {
	const validEANsArray: EansProps[] = []
	const invalidEANsArray: EansProps[] = []

	if (fileContent) {
		const lines = fileContent.split('\n')

		for (const line of lines) {
			if (
				line.trim().startsWith('COD_PRODUTO') &&
				line.trim().endsWith('COD_EAN')
			) {
				continue
			}

			const [codProduto, ean] = line.trim().split(/\s+/)
			if (eanValidator(ean)) {
				validEANsArray.push({ codProduto, ean })
			} else {
				invalidEANsArray.push({ codProduto, ean })
			}
		}
	}

	return { valid: validEANsArray, invalid: invalidEANsArray }
}
