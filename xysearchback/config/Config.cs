using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace xysearchback.config
{
    public class Config
    {
        public static string pretable = "xy1_";
        public static string colName(string colName)
        {
            if (colName == "企业名称")
            {
                colName = "cpname";
                return colName;
            }
            else if (colName == "处罚部门名称")
            {
                colName = "dtname";
                return colName;
            }
            else if (colName == "处罚决定书文号")
            {
                colName = "penaltyid";
                return colName;
            }
            else if (colName == "登报日期")
            {
                colName = "publishtime";
                return colName;
            }
            else if (colName == "登报报社名称")
            {
                colName = "officename";
                return colName;
            }
            else if (colName == "登报版面")
            {
                colName = "pagelayout";
                return colName;
            }
            else if (colName == "登报尺寸")
            {
                colName = "pagesize";
                return colName;
            }
            else
            {
                return colName;
            }
        }
    }
}