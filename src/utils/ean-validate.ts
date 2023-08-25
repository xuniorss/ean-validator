const strPad = (
	input: string,
	length: number,
	padChar: string,
	padType: string,
): string => {
	if (input.length >= length) return input

	const diff = length - input.length
	const pad = padChar.repeat(diff)

	if (padType === 'L') return pad + input

	return input + pad
}

const generateDigEan = (cod: string, num: number): string => {
	let tot1 = 0
	let tot2 = 0
	let tot3 = 0
	let codRef = strPad(cod, num - 1, '0', 'L')

	for (let i = 0; i < num - 1; i++) {
		if (i % 2 === 0) tot1 += parseInt(codRef[i])
		else tot2 += parseInt(codRef[i])
	}

	tot2 *= 3
	tot3 = tot1 + tot2

	let dig = Math.ceil(tot3 / 10) * 10 - tot3
	return dig.toString()
}

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
