using Newtonsoft.Json;
using PSM.Apresentacao.Models;
using PSM.Database.Entity;
using Refit;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;

namespace PSM.Apresentacao.Servicos
{
    public class ApiServicos
    {
        public string baseAddress = "http://localhost:52447/";

        #region Movimentos

        public async Task<List<VW_MOVIMENTO_MANUAL>> Listar(CFiltro filtro)
        {
            var appApi = RestService.For<IApiServicos>(new HttpClient()
            {
                BaseAddress = new Uri(baseAddress)
            });

            if (filtro == null) filtro = new CFiltro();

            var objResponse = await appApi.Listar(JsonConvert.SerializeObject(filtro)).ContinueWith(task =>
            {
                if (task.IsFaulted)
                {
                    return new List<VW_MOVIMENTO_MANUAL>();
                }

                return task.Result;

            });

            return objResponse;
        }

        public async Task<string> Adicionar(MOVIMENTO_MANUAL_MODEL oRegistro)
        {
            var appApi = RestService.For<IApiServicos>(new HttpClient()
            {
                BaseAddress = new Uri(baseAddress)
            });

            var objResponse = await appApi.Adicionar(JsonConvert.SerializeObject(oRegistro)).ContinueWith(task =>
            {
                if (task.IsFaulted)
                {
                    return "ERRO";
                }

                return task.Result;

            });

            return objResponse;
        }


        #endregion

        #region Cadastros

        public async Task<List<PRODUTO>> ListarProdutos()
        {
            var appApi = RestService.For<IApiServicos>(new HttpClient()
            {
                BaseAddress = new Uri(baseAddress)
            });


            List<PRODUTO> objResponse = await appApi.ListarProdutos().ContinueWith(task =>
            {
                if (task.IsFaulted)
                {
                    return new List<PRODUTO>();
                }

                return task.Result;

            });

            return objResponse;
        }

        public async Task<List<PRODUTO_COSIF>> ListarProdutosCosif()
        {
            var appApi = RestService.For<IApiServicos>(new HttpClient()
            {
                BaseAddress = new Uri(baseAddress)
            });

            var objResponse = await appApi.ListarProdutosCosif().ContinueWith(task =>
            {
                if (task.IsFaulted)
                {
                    return new List<PRODUTO_COSIF>();
                }

                return task.Result;

            });

            return objResponse;
        }

        #endregion




    }
}