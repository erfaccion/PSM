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
    [RoutePrefix("api/Movimentos")]
    public class MovimentosController : ApiController
    {

        #region Listar

        [AcceptVerbs("POST")]
        [Route("Listar")]
        public List<VW_MOVIMENTO_MANUAL> Listar(HttpRequestMessage request)
        {
            var content = request.Content.ReadAsStringAsync().Result;
            
            CFiltro filtro = JsonConvert.DeserializeObject<CFiltro>(content);


            List<VW_MOVIMENTO_MANUAL> lstResult = new List<VW_MOVIMENTO_MANUAL>();

            try
            {
                using (dbPSMEntities conn = new dbPSMEntities())
                {
                    lstResult = conn.VW_MOVIMENTO_MANUAL.Where(x => 
                                                                (
                                                                    (x.DAT_ANO > 0 )&&
                                                                    (x.DAT_MES > 0)
                                                                )
                                                            )
                                                            .OrderBy(y => y.DAT_ANO)
                                                            .ThenBy(y => y.DAT_MES)
                                                            .ThenBy(y => y.NUM_LANCAMENTO)
                                                            .ToList();
                    
                    return lstResult;
                }
            }
            catch
            {
                return new List<VW_MOVIMENTO_MANUAL>();
            }


        }

        #endregion

        #region Adicionar

        [AcceptVerbs("POST")]
        [Route("Adicionar")]
        public string Adicionar(HttpRequestMessage request)
        {
            var content = request.Content.ReadAsStringAsync().Result;

            MOVIMENTO_MANUAL oRegistro = JsonConvert.DeserializeObject<MOVIMENTO_MANUAL>(content);


            try
            {
                using (dbPSMEntities conn = new dbPSMEntities())
                {
                    MOVIMENTO_MANUAL oAnterior = conn.MOVIMENTO_MANUAL.Where(x =>
                                                                                    (
                                                                                        (x.DAT_MES.Equals(oRegistro.DAT_MES)) &&
                                                                                        (x.DAT_ANO.Equals(oRegistro.DAT_ANO))
                                                                                    )
                                                                            )
                                                                            .OrderByDescending(y => y.NUM_LANCAMENTO)
                                                                            .Take(1)
                                                                            .FirstOrDefault();


                    oRegistro.DAT_MOVIMENTO = DateTime.Now;
                    oRegistro.COD_USUARIO = "TESTE";
                    oRegistro.NUM_LANCAMENTO = (oAnterior != null ? (oAnterior.NUM_LANCAMENTO + 1) : 1);
                    
                    conn.MOVIMENTO_MANUAL.Add(oRegistro);
                    conn.SaveChanges();

                }
            }
            catch(Exception ex)
            {
                return ex.Message;
            }

            return "OK";

        }

        #endregion

    }
}
