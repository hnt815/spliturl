import $ from 'jquery'
const tools = {
     isNotEmptyString (obj) {
        return typeof (obj) === "string" && obj !== "";
      },
      parseString(obj, defaultValue) {
        if (this.isNullOrEmpty(obj)) {
          return defaultValue;
        }
        return obj.toString();
      },
      isNullOrEmpty(obj) {
        return this.isNull(obj) || obj === "";
      },
      isNull(obj) {
        return typeof (obj) === "undefined" || obj == null;
      },
      urlParamToJson(urlParam) {
        let item, index, json = {};
        const array = this.parseString(urlParam, "").split("&");
        for (let i = 0; i < array.length; i++) {
          if (this.isNotEmptyString(array[i])) {
            index = array[i].indexOf("=");
            item = [array[i].substring(0, index), array[i].substring(index + 1)];
            if (item.length === 1 && this.isNotEmptyString(item[0])) {
              json[item[0]] = "";
            } else if (item.length > 1 && this.isNotEmptyString(item[0])) {
              json[item[0]] = item[1];
            }
          }
        }
        return json;
      },
}
export default function splitUrl(url){
    const result = {
      url: "",
      params: {}
    };
    if (tools.isNotEmptyString(url)) {
      let hash = '';
      if (url.indexOf("#") > -1) {
        hash = url.substring(url.indexOf("#") + 1);
        url = url.substring(0, url.indexOf("#"));
      }
      let index = url.indexOf("?");
      if (index < 0) {
        result["url"] = url;
      } else {
        result["url"] = tools.parseString(url.substring(0, index), "");
        result["urlParams"] = tools.urlParamToJson(url.substring(index + 1))
      }
      index = hash.indexOf("?");
      if (index < 0) {
        result["hash"] = hash;
      } else {
        result["hash"] = tools.parseString(hash.substring(0, index), "");
        result["hashParams"] = tools.urlParamToJson(hash.substring(index + 1))
      }
      result["params"] = $.extend({}, result["urlParams"], result["hashParams"]);
    }
    return result;

  }

