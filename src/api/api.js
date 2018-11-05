import axios from 'axios';
// let api = axios.create({
// 	headers : {
// 		'Content-Type' : 'application/x-www-form-urlencoded'
// 	}
// })

//注册
export const register = (params) => { return axios.post(`/register`, params)};
//验证码
export const vcode = (params) => { return axios.post(`/vcode`, params)};
//登录
export const login = (params) => { return axios.post(`/login`, params)};
//请求所有bogo
export const allbogo = () => { return axios.get(`/allbogo`)};
//获取个人bogo
export const personalBogo = (userName) => { return axios.get(`/personalBogo?userName=${userName}`) };
//新建bogo
export const createBogo = (params) => { return axios.post(`/createBogo`, params)};
//获取详情
export const getDetails = (id) => { return axios.get(`details?id=${id}`) };
//评论保存
export const commentSave = (params) => { return axios.post(`commentSave`, params) };