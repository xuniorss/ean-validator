import { generateDigEan } from './generate-digit-ean'
import { strPad } from './str-pad'

export const eanValidator = (ean: string): boolean => {
	ean = ean.trim()
	let digit = ''

	if (ean.length > 13) return false

	ean = strPad(ean, 13, '0', 'L')
	const codWithOutDig = ean.slice(0, 12)
	digit = generateDigEan(codWithOutDig, 13)

	if (ean.charAt(12) !== digit) return false
	return true
}
