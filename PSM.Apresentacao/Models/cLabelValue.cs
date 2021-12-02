using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PSM.Apresentacao.Models
{
    [Serializable]
    public class cLabelValue
    {
        public string label { get; set; }
        public string value { get; set; }
        public string group { get; set; }

        public cLabelValue()
        {
            label = "";
            value = "";
            group = "";
        }
    }

}