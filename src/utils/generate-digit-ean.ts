import { strPad } from './str-pad'

export const generateDigEan = (cod: string, num: number): string => {
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
