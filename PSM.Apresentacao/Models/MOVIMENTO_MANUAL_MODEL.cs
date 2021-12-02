using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PSM.Apresentacao.Models
{
    [Serializable]
    public class MOVIMENTO_MANUAL_MODEL
    {
        public int DAT_MES { get; set; }
        public int DAT_ANO { get; set; }
        public decimal NUM_LANCAMENTO { get; set; }
        public string COD_PRODUTO { get; set; }
        public string COD_COSIF { get; set; }
        public string DES_DESCRICAO { get; set; }
        public System.DateTime DAT_MOVIMENTO { get; set; }
        public string COD_USUARIO { get; set; }
        public decimal VAL_VALOR { get; set; }
    }
}