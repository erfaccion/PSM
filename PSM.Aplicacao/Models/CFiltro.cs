using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PSM.Aplicacao.Models
{
    [Serializable]
    public class CFiltro
    {
        public int ano { get; set; }
        public int mes { get; set; }

        public CFiltro()
        {

        }
    }
}