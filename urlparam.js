/**
 * decodeURIComponent
 * support '+' and '%20'
 * @param str {String}
 */
const deURI = str => decodeURIComponent(str.replace(/\+/g,'%20'));

/**
 * query string to object
 * @param queryString {String}
 */
const getUrlQuery = function(queryString){
	if(queryString == null){
		return {};
	}

	if(queryString[0] === '?'){
		queryString = queryString.slice(1);
	}

	let qList = queryString.split('&');
	let qObj = {};
	qList.forEach(q=>{
		let [qName,...qValue] = q.split('=');
		qObj[deURI(qName)] = deURI(qValue.join('='));
	});
	return qObj;
};

/**
 * object to query string
 * @param obj 
 */
const createQuery = function(obj){
	if(obj == null){
		return '';
	}
	let qList = [];
	Object.entries(obj).forEach(([key,val]) => {
		if(val.push === Array.prototype.push){
			val.forEach(val => {
				qList.push(`${encodeURIComponent(key)}=${encodeURIComponent(val)}`);
			});
		}else{
			qList.push(`${encodeURIComponent(key)}=${encodeURIComponent(val)}`);
		}
	});
	return qList.join('&');
};

/*
test
createQuery({a:1,b:'test123','中文':'测试','<>?,./':'!@#$%^&*()_+'});
getUrlQuery("a=1&b=test123&%E4%B8%AD%E6%96%87=%E6%B5%8B%E8%AF%95&%3C%3E%3F%2C.%2F=!%40%23%24%25%5E%26*()_%2B");
*/