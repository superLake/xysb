using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace xysearchback.Models.vo
{
    public class NewsVO
    {
        public int rowid
        {
            get;
            set;
        }
        public int id
        {
            get;
            set;
        }
        public string dtname
        {
            get;
            set;
        }
        public string cpname
        {
            get;
            set;
        }
        public string penaltyid
        {
            get;
            set;
        }
        public DateTime publishtime
        {
            get;
            set;
        }

        public string officename
        {
            get;
            set;
        }
        public string pagelayout
        {
            get;
            set;
        }
        public string pagesize
        {
            get;
            set;
        }
        public string articleurl
        {
            get;
            set;
        }
        public string articletitle
        {
            get;
            set;
        }
    }
}