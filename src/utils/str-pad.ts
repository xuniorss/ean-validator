export const strPad = (
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
