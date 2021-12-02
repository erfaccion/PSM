using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using Newtonsoft.Json;
using PSM.Apresentacao.Models;
using PSM.Apresentacao.Servicos;
using PSM.Database.Entity;

namespace PSM.Apresentacao.Controllers
{
    public class HomeController : Controller
    {
        #region Listas

        public async Task<List<cLabelValue>> ListaProdutos()
        {
            List<PRODUTO> lstItens = await new ApiServicos().ListarProdutos();

            List<cLabelValue> oRetorno = new List<cLabelValue>();
            oRetorno.Add(new cLabelValue() { value = "", label = "-- Selecione --" });

            foreach (PRODUTO item in lstItens)
            {
                oRetorno.Add(new cLabelValue() { value = item.COD_PRODUTO, label = item.DES_PRODUTO });
            }
            return oRetorno;
        }

        public async Task<List<cLabelValue>> ListaProdutosCosif()
        {
            List<PRODUTO_COSIF> lstItens = await new ApiServicos().ListarProdutosCosif();

            List<cLabelValue> oRetorno = new List<cLabelValue>();
            oRetorno.Add(new cLabelValue() { value = "", label = "-- Selecione --" });

            foreach (PRODUTO_COSIF item in lstItens)
            {
                oRetorno.Add(new cLabelValue() { value = item.COD_COSIF, label = String.Format("{0} - ({1})", item.COD_COSIF, item.COD_CLASSIFICACAO) });
            }
            return oRetorno;
        }

        #endregion

        #region Consultas JSON

        public async Task<ActionResult> ListarMovimentos()
        {
            //Recuperar o parametro
            List<VW_MOVIMENTO_MANUAL> oResumo = new List<VW_MOVIMENTO_MANUAL>();

            try
            {
                oResumo = await new ApiServicos().Listar(null);

            }
            catch (Exception ex)
            {
                oResumo = new List<VW_MOVIMENTO_MANUAL>();
            }

            return Json(oResumo, JsonRequestBehavior.AllowGet);
        }

        #endregion

        #region IncluirMovimento

        public async Task<ActionResult> IncluirMovimento()
        {
            //Recuperar os parametros
            MOVIMENTO_MANUAL_MODEL oRegistro = new MOVIMENTO_MANUAL_MODEL();

            oRegistro.DAT_ANO = Convert.ToInt32(Request.QueryString.Get("dat_ano"));
            oRegistro.DAT_MES = Convert.ToInt32(Request.QueryString.Get("dat_mes"));
            oRegistro.COD_PRODUTO = Request.QueryString.Get("cod_produto");
            oRegistro.COD_COSIF = Request.QueryString.Get("cod_cosif");
            oRegistro.DES_DESCRICAO = Request.QueryString.Get("des_descricao");
            oRegistro.VAL_VALOR = Convert.ToDecimal(Request.QueryString.Get("val_valor"));



            try
            {

                var oResultado = await new ApiServicos().Adicionar(oRegistro);

            }
            catch (Exception ex)
            {
                return Json(new { result = "ERRO", mensagem = ex.Message }, JsonRequestBehavior.AllowGet);
            }

            return Json(new { result = "OK", mensagem = ""}, JsonRequestBehavior.AllowGet);
        }

        #endregion


        #region View Index

        public async Task<ActionResult> Index()
        {
            ViewBag.ListaProdutos = await ListaProdutos();
            ViewBag.ListaProdutosCosif = await ListaProdutosCosif();


            return View();
        }

        #endregion

    }
}
