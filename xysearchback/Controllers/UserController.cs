using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using xysearchback.Util;

namespace xysearchback.Controllers
{
    public class UserController : Controller
    {
        //
        // GET: /User/
        public ActionResult Index()
        {
            return View();
        }
        //登录
        public JsonResult login() {
            string username = Request.Params["username"];
            string password = Request.Params["password"];
            Session["login"] = "on";
            if(username=="admin" && password=="admin@2018xysearch"){
                
                return Json(new { data = username, msg = "登陆成功",status=0 }, JsonRequestBehavior.AllowGet);
            }
            return Json(new { data = username, msg = "登陆失败，用户名或密码不正确", status = 1 }, JsonRequestBehavior.AllowGet);
        }
        //验证码生成
        //public JsonResult sCodeProducer()
        //{
        //    ProduceScode scodeProducer = new ProduceScode();
        //    string scode = scodeProducer.CreateRandomCode(6);
        //    return Json(new { status = 0, msg = "验证码发送成功", data = scode }, JsonRequestBehavior.AllowGet);
        //}
        public JsonResult GetCheckCode()
        {
            string checkcode = CheckCodeImage.GenerateCheckCodes(4);
            string scode = CheckCodeImage.CreateCheckCodeImage(checkcode);
            return Json(new { status = 0, msg = "获取验证码成功", data = scode }, JsonRequestBehavior.AllowGet);
        }
        public JsonResult CheckCode() {
            string scode = Request.Params["scode"];
            string checkcode = Session["CheckCode"].ToString();
            if (scode == checkcode)
            {
                return Json(new { status=0,msg="验证通过"},JsonRequestBehavior.AllowGet);
            }else{
                return Json(new { status = 1, msg = "验证失败" }, JsonRequestBehavior.AllowGet);
            }
        }

    }
}
