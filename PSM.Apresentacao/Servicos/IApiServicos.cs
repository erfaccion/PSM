using PSM.Database.Entity;
using Refit;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PSM.Apresentacao.Servicos
{
    public interface IApiServicos
    {
        #region Funções do Controlador Api/Movimentos


        [Headers("Content-Type: application/json")]
        [Post("/api/Movimentos/Listar")]
        Task<List<VW_MOVIMENTO_MANUAL>> Listar([Body] string body);

        [Headers("Content-Type: application/json")]
        [Post("/api/Movimentos/Adicionar")]
        Task<string> Adicionar([Body] string body);


        #endregion

        #region Funções do Controlador Api/Cadastros


        [Get("/api/Cadastros/ListarProdutos")]
        Task<List<PRODUTO>> ListarProdutos();

        [Get("/api/Cadastros/ListarProdutosCosif")]
        Task<List<PRODUTO_COSIF>> ListarProdutosCosif();


        #endregion

    }
}
