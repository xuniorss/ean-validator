import { Button } from '../ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '../ui/dialog'
import { SValidator } from './single-validator'

export const SingleValidator = () => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button
					variant="outline"
					aria-label="single validator"
					className="w-full"
				>
					Validação única
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-lg">
				<DialogHeader>
					<DialogTitle>Validação única</DialogTitle>
					<DialogDescription>
						Digite ou copie e cole um ean por vez e veja se está válido ou
						não.
					</DialogDescription>
				</DialogHeader>
				<div className="w-full">
					<SValidator />
				</div>
			</DialogContent>
		</Dialog>
	)
}
