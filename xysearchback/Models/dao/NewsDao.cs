using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using xysearchback.Util;
using xysearchback.config;
using xysearchback.Models.vo;
namespace xysearchback.Models.dao
{
     //List<News> result = QueryDB.Context().Sql(sql).Parameters(Formatsearchcontent).QueryMany<News>();
    public class NewsDao
    {
        //获取所有企业列表
        public List<NewsVO> getAllList() {
            //ROW_NUMBER() over (order by id asc) as rowid
            string sql = "SELECT id,ROW_NUMBER() over (order by id desc) as rowid,dtname,cpname,penaltyid,publishtime,officename,pagelayout,pagesize,articleurl,articletitle FROM " + Config.pretable + "search order by id desc";
            List<NewsVO> result = QueryDB.Context().Sql(sql).QueryMany<NewsVO>();
            return result;
        }
        //根据企业名查询列表
        public List<NewsVO> getListByCpname(string cpname) {
            string formatecpname = string.Format("%{0}%",cpname);
            string sql = "SELECT id,ROW_NUMBER() over (order by id desc) as rowid,dtname,cpname,penaltyid,publishtime,officename,pagelayout,pagesize,articleurl,articletitle FROM dbo." + Config.pretable + "search WHERE " + Config.pretable + "search." + Config.colName("企业名称") + " LIKE @0"; ;
            List<NewsVO> result = QueryDB.Context().Sql(sql).Parameters(formatecpname).QueryMany<NewsVO>();
            return result;
        }
        //根据id获取企业信息
        public News getListById(string id)
        {
            int cid = int.Parse(id);
            string sql = "SELECT dtname,cpname,penaltyid,publishtime,officename,pagelayout,pagesize,articleurl,articletitle FROM dbo." + Config.pretable + "search WHERE dbo." + Config.pretable + "search.id = @0 ";
            News result = QueryDB.Context().Sql(sql).Parameters(cid).QuerySingle<News>();
            return result;
        }
        //更新企业信息
        public int updateInformaticaById(News news) {
            //string sql = "insert into "+Config.pretable+"search(dtname,cpname,penaltyid,pubishtime,officename,pagelayout,pagesize,articleurl,articletitle) values (@0,@1,@2,@3,@4,@5,@6,@7,@8)";
            //Boolean result=QueryDB.Context().Sql(sql).Parameters(news.Dtname,news.Cpname,news.Penaltyid,news.Publishtime,news.Officename,news.Pagelayout,news.Pagesize,news.Articleurl,news.Articletitle).Execute();
            int result = QueryDB.Context().Update<News>(Config.pretable + "search", news).AutoMap(x => x.id).Where(x => x.id).Execute();
            return result;
        }
        //创建企业信息
        public int addCpname(News news) {
            int result = QueryDB.Context().Insert<News>(Config.pretable+"search",news).AutoMap(x => x.id).ExecuteReturnLastId<int>();
            return result;
        }
        //删除企业信息
        public int deleteCpById(string id) {
            int cid = int.Parse(id);
            int result = QueryDB.Context().Delete(Config.pretable + "search").Where("id", cid).Execute();
            return result;
        }
    }
}