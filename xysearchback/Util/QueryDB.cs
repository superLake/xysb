using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using FluentData;
namespace xysearchback.Util
{
    public class QueryDB
    {
        public static IDbContext Context()
        {
            return new DbContext().ConnectionStringName("conStr", new SqlServerProvider());
        }
    }
}