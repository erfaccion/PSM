using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

using PSM.Aplicacao.Models;
using PSM.Database.Entity;

namespace PSM.Aplicacao.Controllers
{
    [RoutePrefix("api/Cadastros")]
    public class CadastrosController : ApiController
    {

        #region ListarProdutos

        [AcceptVerbs("GET")]
        [Route("ListarProdutos")]
        public List<PRODUTO> ListarProdutos()
        {

            List<PRODUTO> lstResult = new List<PRODUTO>();

            try
            {
                using (dbPSMEntities conn = new dbPSMEntities())
                {
                    lstResult = conn.PRODUTO.Where(x => x.STA_STATUS.Equals("1"))
                                                            .OrderBy(y => y.DES_PRODUTO)
                                                            .ToList();
                    return lstResult;
                }
            }
            catch(Exception ex)
            {
                return new List<PRODUTO>();
            }


        }

        #endregion

        #region ListarProdutosCosif

        [AcceptVerbs("GET")]
        [Route("ListarProdutosCosif")]
        public List<PRODUTO_COSIF> ListarProdutosCosif()
        {

            List<PRODUTO_COSIF> lstResult = new List<PRODUTO_COSIF>();

            try
            {
                using (dbPSMEntities conn = new dbPSMEntities())
                {
                    lstResult = conn.PRODUTO_COSIF.Where(x => x.STA_STATUS.Equals("1"))
                                                            .OrderBy(y => y.COD_COSIF)
                                                            .ThenBy(y => y.COD_CLASSIFICACAO)
                                                            .ToList();

                    return lstResult;
                }
            }
            catch
            {
                return new List<PRODUTO_COSIF>();
            }


        }

        #endregion

    }
}
