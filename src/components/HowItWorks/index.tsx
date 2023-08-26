import { Button } from '../ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '../ui/dialog'

export const HowItWorks = () => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button
					aria-label="how it works"
					className="w-full"
					variant="outline"
				>
					Como usar?
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-lg">
				<DialogHeader>
					<DialogTitle>Como usar?</DialogTitle>
					<DialogDescription>
						Certifique-se de utilizar o sistema de acordo com a instrução
						de select abaixo.
					</DialogDescription>
				</DialogHeader>
				<pre>
					{`SELECT DISTINCT
  NOME_COLUNA1 AS COD_PRODUTO,
  NOME_COLUNA2 AS COD_EAN
FROM
  NOME_TABELA`}
				</pre>
				<DialogFooter>
					<DialogDescription>
						Faça o select no banco desejado e exporte os resultados em um
						arquivo de texto (.txt). Volte aqui e use o validador com seu
						arquivo recém gerado.
					</DialogDescription>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
