using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using xysearchback.Models;
using xysearchback.Models.service;
using xysearchback.Models.vo;
namespace xysearchback.Controllers
{
    public class NewsController : Controller
    {
        //
        // GET: /News/

        public ActionResult Index()
        {
            return View();
        }
        NewsService newsService = new NewsService();
        //列表页展示
        public JsonResult list() {
            try {
                if (Session["login"].ToString() == "on")
                {
                    List<NewsVO> result;
                    try
                    {
                        result = newsService.getAllList();
                    }
                    catch (Exception e)
                    {
                        return Json(new { status = 1, msg = "查询失败", statusText = e }, JsonRequestBehavior.AllowGet);
                    }

                    return Json(new { status = 0, msg = "查询成功", data = result }, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    return Json(new { status = 10, msg = "请登录" }, JsonRequestBehavior.AllowGet);
                } 
            }catch{
                return Json(new { status = 10, msg = "请登录" }, JsonRequestBehavior.AllowGet);
            }
           
           
        }
        //列表页搜索功能
        public JsonResult search() {
            List<NewsVO> result;
            try {
                if (Session["login"].ToString() == "on")
                {
                    try
                    {
                        string cpname = Request.Params["searchtext"];
                        result = newsService.getListByCpname(cpname);
                        return Json(new { status = 0, msg = "查询成功", data = result }, JsonRequestBehavior.AllowGet);
                    }
                    catch (Exception e)
                    {
                        return Json(new { status = 1, msg = "查询成功", statusText = e }, JsonRequestBehavior.AllowGet);
                    }
                }
                else
                {
                    return Json(new { status = 10, msg = "请登录" }, JsonRequestBehavior.AllowGet);
                }
            }
            catch {
                return Json(new { status = 10, msg = "请登录" }, JsonRequestBehavior.AllowGet);
            }
            
            
        }
        //详情页展示功能
        public JsonResult searchById() {
            try {
                if (Session["login"].ToString() == "on")
                {
                    string id = Request.Params["id"];
                    News result;
                    try
                    {
                        result = newsService.getListById(id);
                    }
                    catch (Exception e)
                    {
                        return Json(new { status = 1, msg = "查询失败", statusText = e }, JsonRequestBehavior.AllowGet);
                    }
                    return Json(new { status = 0, msg = "查询成功", data = result }, JsonRequestBehavior.AllowGet);
                }
                else
                {
                    return Json(new { status = 10, msg = "请登录" }, JsonRequestBehavior.AllowGet);
                } 
            }
            catch {
                return Json(new { status = 10, msg = "请登录" }, JsonRequestBehavior.AllowGet);
            }
            
            
        }
        //添加企业
        public JsonResult add() {
            try {
                if (Session["login"].ToString() == "on")
                {
                    News news = new News();
                    news.dtname = Request.Params["dtname"];
                    news.cpname = Request.Params["cpname"];
                    news.penaltyid = Request.Params["penaltyid"];
                    news.publishtime = Convert.ToDateTime(Request.Params["publishtime"]);
                    news.officename = Request.Params["officename"];
                    news.pagelayout = Request.Params["pagelayout"];
                    news.pagesize = Request.Params["pagesize"];
                    news.articleurl = Request.Params["articleurl"];
                    news.articletitle = Request.Params["articletitle"];
                    try
                    {
                        int result = newsService.addCpname(news);
                        return Json(new { status = 0, msg = "添加成功", data = result }, JsonRequestBehavior.AllowGet);
                    }
                    catch (Exception e)
                    {
                        return Json(new { status = 1, msg = "添加失败", statusText = e }, JsonRequestBehavior.AllowGet);
                    }
                }
                else
                {
                    return Json(new { status = 10, msg = "请登录" }, JsonRequestBehavior.AllowGet);
                }
            }
            catch {
                return Json(new { status = 10, msg = "请登录" }, JsonRequestBehavior.AllowGet);
            }
            
            
        }
        public JsonResult update() {
            try {
                if (Session["login"].ToString() == "on")
                {
                    News news = new News();
                    news.id = int.Parse(Request.Params["id"]);
                    news.dtname = Request.Params["dtname"];
                    news.cpname = Request.Params["cpname"];
                    news.penaltyid = Request.Params["penaltyid"];
                    news.publishtime = Convert.ToDateTime(Request.Params["publishtime"]);
                    news.officename = Request.Params["officename"];
                    news.pagelayout = Request.Params["pagelayout"];
                    news.pagesize = Request.Params["pagesize"];
                    news.articleurl = Request.Params["articleurl"];
                    news.articletitle = Request.Params["articletitle"];
                    try
                    {
                        int result = newsService.updateInformaticaById(news);
                        return Json(new { status = 0, msg = "更新成功", data = result }, JsonRequestBehavior.AllowGet);
                    }
                    catch (Exception e)
                    {
                        return Json(new { status = 1, msg = "更新失败", statusText = e }, JsonRequestBehavior.AllowGet);
                    }
                }
                else
                {
                    return Json(new { status = 10, msg = "请登录" }, JsonRequestBehavior.AllowGet);
                }
            }
            catch {
                return Json(new { status = 10, msg = "请登录" }, JsonRequestBehavior.AllowGet);
            }
            
            
        }
        public JsonResult delete() {
            try {
                if (Session["login"].ToString() == "on")
                {
                    string id = Request.Params["id"];
                    try
                    {
                        int result = newsService.deleteById(id);
                        return Json(new { status = 0, msg = "删除成功", data = result }, JsonRequestBehavior.AllowGet);
                    }
                    catch (Exception e)
                    {
                        return Json(new { status = 1, msg = "删除失败", statusText = e }, JsonRequestBehavior.AllowGet);
                    }
                }
                else
                {
                    return Json(new { status = 10, msg = "请登录" }, JsonRequestBehavior.AllowGet);
                }  
            }
            catch {
                return Json(new { status = 10, msg = "请登录" }, JsonRequestBehavior.AllowGet);
            }
             
        }
    }
}
