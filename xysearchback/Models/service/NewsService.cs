using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using xysearchback.Models.dao;
using xysearchback.Util;
using xysearchback.Models.vo;
namespace xysearchback.Models.service
{
    public class NewsService
    {
        NewsDao newsDao = new NewsDao();
        public List<NewsVO> getAllList() {
            List<NewsVO> result = newsDao.getAllList();
            return result;
        }
        public List<NewsVO> getListByCpname(string cpname) {
            List<NewsVO> result = newsDao.getListByCpname(cpname);
            return result;
        }
        public News getListById(string id) {
            News result = newsDao.getListById(id);
            return result;
        }
        public int addCpname(News news) {
            int result = newsDao.addCpname(news);
            return result;
        }
        public int updateInformaticaById(News news) {
            int result = newsDao.updateInformaticaById(news);
            return result;
        }
        public int deleteById(string id) {
            int result = newsDao.deleteCpById(id);
            return result;
        }
    }
}