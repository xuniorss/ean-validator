import { SYSTEM_VERSION } from '@/constants'
import { useState } from 'react'

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '../ui/dialog'
import { Separator } from '../ui/separator'
import { ListRelease } from './list-release'

export const ReleasesNotes = () => {
	const [isOpen, setIsOpen] = useState(true)

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogContent className="overflow-hidden bg-white text-black">
				<DialogHeader>
					<DialogTitle className="text-2xl">Notas da versão</DialogTitle>
					<DialogDescription>
						Versão atual {SYSTEM_VERSION} (beta)
					</DialogDescription>
				</DialogHeader>
				<article className="my-2">
					<section className="flex flex-col space-y-1">
						<ListRelease
							title="Ajuste na verificação do cabeçalho."
							description="Foi aprimorada a verificação do cabeçalho do arquivo."
						/>
					</section>
				</article>
				<Separator />
				<DialogFooter>
					<p className="text-sm">
						Sistema em <strong>beta</strong>, isso significa que todas as
						funcionalidades principais estão disponíveis e foi liberado
						para outros usuários para teste. Caso tenha alguma sugestão ou
						o sistema apresente falha, entre em contato com{' '}
						<strong>Gilberto Fortunato</strong> da Conversão
					</p>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
