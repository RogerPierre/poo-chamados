import { ICallController } from "../funcionalidade/iCallController";
import { ICallUI } from "./iCallUI";

/**
 * Interface de usuário textual (prompt/alert) para interação com o sistema de chamados.
 * Permite abrir chamados, listar e marcar como concluídos via menu simples.
 */
export class TextCallUI implements ICallUI{
    
    callController : ICallController;

    /**
     * Inicializa a UI com um controlador de chamados.
     * @param callController instância responsável pelas regras de negócio
     */
    constructor(callController:ICallController){
        this.callController = callController;
    }

    /**
     * Inicia o loop de interação com o usuário via prompt.
     * Opções: 1) Cadastrar, 2) Listar, 3) Marcar como concluído, 0) Sair.
     * Observação: As opções de listagem e marcação podem ser expandidas pelos alunos.
     */
    start(): void {
        let op = 1;
        while(op!=0){
            op = Number(prompt('Escolha uma opção/n1- Cadastrar/n2- Listar/n3- Marcar como concluido/n0- Sair'));
            switch(op){
                case 1:
                    let nome : string = prompt('Digite seu nome')!;
                    if(nome===null || nome.trim()===''){
                        alert('Nome inválido');
                        break;
                    }
                    let descricao : string = prompt('Digite a descrição do problema')!;
                    if(descricao===null || descricao.trim()===''){
                        alert('Descrição inválida');
                        break;
                    }
                    let deuCerto : boolean = this.callController.abrirChamado(nome,descricao);
                    if(deuCerto){
                        alert('Chamado cadastrado');
                    }else{
                        alert('Não foi possível cadastrar o chamado');
                    }
                    break;
                case 2:
                    this.callController.listarChamado().forEach(chamado=>{
                        alert(`\nSolicitante: ${chamado.solicitante}\nDescrição: ${chamado.descricao}\nStatus: ${chamado.status?'Atendido':'Pendente'}`);
                    });
                    break;
                case 3:
                    nome= prompt('Digite o nome de usuario do chamado a ser marcado como concluído')!;
                    if(nome===null || nome.trim()===''){
                        alert('Nome inválido');
                        break;
                    }
                    let chamadoParaMarcar = this.callController.listarChamado().find(chamado=>chamado.solicitante===nome);
                    if(chamadoParaMarcar){
                        this.callController.marcarComoAtendido(chamadoParaMarcar);
                        alert('Chamado marcado como atendido');
                    }else{
                        alert('Chamado não encontrado');
                    }
                    break;
                case 0:
                    break;
                default:
                    alert('Opcao Inválida');
            }
        }
    }

}
