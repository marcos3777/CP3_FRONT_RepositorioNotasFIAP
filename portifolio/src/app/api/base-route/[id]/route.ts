import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import { TipoLanche } from "@/types/types";

export async function GET(request:Request, {params}:{params:{id:number}}) {
    const file = await fs.readFile(process.cwd() + '/src/data/base.json','utf-8');
    const data:TipoLanche[] = JSON.parse(file);
    const produto = data.find(p => p.id == params.id);

    return NextResponse.json(produto);
}

export async function PUT(request:Request, {params}:{params:{id:number}}) {

    //Realizando a chamada para o arquivo .json que retorna a nossa lista em
    // formato string.
    const file = await fs.readFile(process.cwd() + '/src/data/base.json','utf-8');

    //Agora necessitamos converter o dados para Objeto.
    //Aproveitamos e tipamos a lista para podermos ter acesso a todos os recursos
    // que o array nos permite usar. Ex: métodos find, finIndex, map , forEach etc; 
    const produtos:TipoLanche[] = JSON.parse(file);

    //Realizar o destructuring no objeto request.
    //Este rqueste é um objeto que recebemos de um FORM, uma FERRAMENTA de testes, ou seja, algo que possa gerar uma requisição do tipo PUT com os dados mostrados abaixo.
    const{nome, preco, desc} = await request.json();
    
    //Pesquisando a posição do objeto que está sendo editado e retornando a posição deste.
    //Obs: Caso o indice não seja encontrado ele vai retornar -1.
    const indice  = produtos.findIndex( p => p.id == params.id );

    //Verificando o indice do produto:
    if(indice != -1){
        //Criando um obj para sobrepor o antigo, aproveitando isso e tipando e já
        // adicionando o id de volta ao obj.
        const produto = {nome, preco, desc} as TipoLanche;

        //Adicionando o id ao produto atualizado;
        produto.id = params.id;

        //Utilizando o método splice + o indice + o novo objeto, vamos atualizar a lista.
        produtos.splice(indice,1,produto);

        //Agora com a lista atualizada podemos converter ela para string. 
        const fileUpdate =  JSON.stringify(produtos);
    
        //Utilizando os método de manipulação de arquivo, colocamos a lista
        // em formato de string de volta no arquivo.
        await fs.writeFile(process.cwd() + '/src/data/base.json',fileUpdate);
        
        //Agora retornamos o response com uma reposta em formto json para quem chamou.
        return NextResponse.json({msg:"Produto atualizado com sucesso."});
    }

}


export async function DELETE(request:Request, {params}:{params:{id:number}}) {

    //Realizando a chamada para o arquivo .json que retorna a nossa lista em
    // formato string.
    const file = await fs.readFile(process.cwd() + '/src/data/base.json','utf-8');

    //Agora necessitamos converter o dados para Objeto.
    //Aproveitamos e tipamos a lista para podermos ter acesso a todos os recursos
    // que o array nos permite usar. Ex: métodos find, finIndex, map , forEach etc; 
    const produtos:TipoLanche[] = JSON.parse(file);

    //Pesquisando a posição do objeto que está sendo editado e retornando a posição deste.
    //Obs: Caso o indice não seja encontrado ele vai retornar -1.
    const indice  = produtos.findIndex( p => p.id == params.id );

    //Verificando o indice do produto:
    if(indice != -1){
        //Utilizando o método splice + o indice para remover o item da lista.
        produtos.splice(indice,1);

        //Agora com a lista atualizada podemos converter ela para string. 
        const fileUpdate =  JSON.stringify(produtos);
    
        //Utilizando os método de manipulação de arquivo, colocamos a lista
        // em formato de string de volta no arquivo.
        await fs.writeFile(process.cwd() + '/src/data/base.json',fileUpdate);
        
        //Agora retornamos o response com uma reposta em formto json para quem chamou.
        return NextResponse.json({msg:"Produto excluído com sucesso."});
    }

}