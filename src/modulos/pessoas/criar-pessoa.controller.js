export class CriarPessoaController {
    handle(request, response) {
        response.status(201).json({ status: 'pessoa criada com sucesso' })
    }
}
