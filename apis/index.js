import Axios from './axios';
// import {_retrieveData} from '../asyncStorage/AsyncFuncs';

class WService{

// static post = (type , form) => {
// 	return new Promise((resolve,reject) => {
// 		resolve(Axios.post(type,form,{timeout : 20000}))})
// }

// static postWithBody = (type , form) => {
// 	return new Promise((resolve,reject) => {
// 		resolve(Axios.post(type,form,{headers: {"Content-Type": "application/json"}		,timeout : 20000}))})
// }

// static dashboardPost = (type, header, form) => {
// 	return new Promise((resolve,reject) => {
// 		resolve(Axios.post(type,form,{headers : {
// 			'UUID' : header.id,
// 			'Authentication' : header.auth,
// 		},timeout : 7000}))})
// }

// static dashboardPut = (type, header, form) => {
// 	return new Promise((resolve,reject) => {
// 		resolve(Axios.put(type,form,{headers : {
// 			'UUID' : header.id,
// 			'Authentication' : header.auth,
// 		},timeout : 7000}))})
// }

// static get = (type,header) => {
// 	return new Promise((resolve,reject) => {
// 		resolve(Axios.get(type,{headers : {
// 			'UUID' : header.id,
// 			'Authentication' : header.auth,
// 		}}))})	
// }

static getWithoutHeader = (type) => {
	return new Promise((resolve,reject) => {
		resolve(Axios.get(type,{timeout : 20000}))})	
}

// static addAlertDashboard = (plate_no , status , type) => {
// 	const form = new FormData();
// 	form.append('statusofvehicle',status);
// 	form.append('vehicle_plate_number',plate_no)
// 	return new Promise((resolve,reject) => {
// 		resolve(Axios.post(type,form,{timeout : 7000}))})
// }

}
module.exports = WService
