var osisToParatext=function(t){function r(n){if(e[n])return e[n].exports;var s=e[n]={exports:{},id:n,loaded:!1};return t[n].call(s.exports,s,s.exports,r),s.loaded=!0,s.exports}var e={};return r.m=t,r.c=e,r.p="",r(0)}([function(t,r,e){"use strict";function n(t){if("string"!=typeof t)throw"osisToParatext: first argument must be a string.";return o.format(t)}var s=e(1),o=new s,a=Object.freeze({Gen:["GEN"],Exod:["EXO"],Lev:["LEV"],Num:["NUM"],Deut:["DEU"],Josh:["JOS"],Judg:["JDG"],Ruth:["RUT"],"1Sam":["1SA"],"2Sam":["2SA"],"1Kgs":["1KI"],"2Kgs":["2KI"],"1Chr":["1CH"],"2Chr":["2CH"],Ezra:["EZR"],Neh:["NEH"],Esth:["EST"],Job:["JOB"],Ps:["PSA"],Prov:["PRO"],Eccl:["ECC"],Song:["SNG"],Isa:["ISA"],Jer:["JER"],Lam:["LAM"],Ezek:["EZK"],Dan:["DAN"],Hos:["HOS"],Joel:["JOL"],Amos:["AMO"],Obad:["OBA"],Jonah:["JON"],Mic:["MIC"],Nah:["NAM"],Hab:["HAB"],Zeph:["ZEP"],Hag:["HAG"],Zech:["ZEC"],Mal:["MAL"],Matt:["MAT"],Mark:["MRK"],Luke:["LUK"],John:["JHN"],Acts:["ACT"],Rom:["ROM"],"1Cor":["1CO"],"2Cor":["2CO"],Gal:["GAL"],Eph:["EPH"],Phil:["PHP"],Col:["COL"],"1Thess":["1TH"],"2Thess":["2TH"],"1Tim":["1TI"],"2Tim":["2TI"],Titus:["TIT"],Phlm:["PHM"],Heb:["HEB"],Jas:["JAS"],"1Pet":["1PE"],"2Pet":["2PE"],"1John":["1JN"],"2John":["2JN"],"3John":["3JN"],Jude:["JUD"],Rev:["REV"],Tob:["TOB"],Jdt:["JDT"],GkEsth:["ESG"],EsthGr:["ESG"],AddEsth:["ADE"],Wis:["WIS"],Sir:["SIR"],Bar:["BAR"],EpJer:["LJE"],DanGr:["DAG"],SgThree:["S3Y"],PrAzar:["S3Y"],Sus:["SUS"],Bel:["BEL"],"1Macc":["1MA"],"2Macc":["2MA"],"3Macc":["3MA"],"4Macc":["4MA"],PrMan:["MAN"],"1Esd":["1ES"],"2Esd":["2ES"],Ps151:["PS2"],AddPs:["PS2"]}),i={$chapters:["$b"],$verses:["$b $c"],singleChapterFormat:"bcv",singleChapterBooks:[],Ps151Format:"b","b-c":"-$b ","bc-v":"-$c:","cv-cv":"-","v-c":"-$chapters ",".v":":",",c":",$b ",",v":",$verses:"};o.setBooks(a),o.setOptions(i),t.exports=n},function(t,r){"use strict";function e(){return{b:"$b",c:"$c",v:"$v","-":"-",",":", ",".":" ","c.v":":",$chapters:["ch","chs"],$verses:["v","vv"],singleChapterFormat:"bv",singleChapterBooks:["Obad","Phlm","2John","3John","Jude","PrAzar","SgThree","Sus","Bel","EpJer","PrMan","Ps151","AddPs"],Ps151Format:"bc",maxPs:150}}function n(){function t(t,r){for(var e=n(t,r),s=[],o=0,i=e.length;o<i;o++)s.push(a(e[o]));return s.join("")}function r(t,r){for(var e=n(t,r),s=[],o=0,i=e.length;o<i;o++){var p=e[o];p.format=a(p),s.push(p)}return{tokens:s}}function n(t,r){if("string"!=typeof t)throw"OsisFormatter: first argument (OSIS) must be a string.";for(var e=O(r),n=t.split(","),s=[];n.length>0;){var o=P(n.shift());s.push(d(o,e)),n.length>0&&s.push({osis:",",type:",",parts:[],laters:[]})}return l(s)}function a(t){for(var r=["bookRange","bookSequence"],e=0;e<=1;e++){var n=r[e];if("string"==typeof t[n]){var s=M[t[n]];if(void 0!==s&&"string"==typeof s[0])return s[0]}}for(var o=[],a=0,p=t.parts.length;a<p;a++)o.push(i(t,t.parts[a]));return o.join("")}function i(t,r){var e="";switch(r.type){case"c":case"v":""!==r.subType&&"undefined"!=typeof C[r.subType]&&(e=u(r.subType,r,t));case"b":return e+u(r.type,r,t);case".":case"-":case",":default:return u(p(r.type,r.subType,t.position),r,t)}}function p(t,r,e){var n=r.split(t),s=o(n,2),a=s[0],i=s[1];"string"==typeof e&&"string"==typeof C[e]&&(t=e);for(var p=i,u=0,f=a.length;u<=f;u++){for(i=p;i.length>0;){if("string"==typeof C[""+a+t+i])return""+a+t+i;i=i.substr(0,i.length-1)}a=a.substr(1)}return t}function u(t,r,e){var n=C[t];return n.indexOf("$")===-1?n:(n=n.replace(/\$chapters/g,function(){var t="undefined"==typeof M[r.b+".$chapters"]?C.$chapters:M[r.b+".$chapters"];return t.length>1&&f(r,e)>0?t[1]:t[0]}),n=n.replace(/\$verses/g,function(){return C.$verses.length>1&&c(r,e)===!0?C.$verses[1]:C.$verses[0]}),n=n.replace(/\$b/g,function(){var t=M[r.b].length-1;if(0===t)return M[r.b][0];var n=f(r,e);return n>t?M[r.b][t]:M[r.b][n]}),n=n.replace(/\$c/g,"string"==typeof r.c?r.c:""),n=n.replace(/\$v/g,"string"==typeof r.v?r.v:""))}function f(t,r){if("b"===r.type&&!A(t.b))return 2;var e="c"===t.type?"c":"";if(e+=t.laters.join("")+","+r.laters.join(","),e.indexOf("-c")>=0)return 1;if("Ps"===t.b&&e.indexOf("-b")>=0){for(var n=0,s=r.parts.length;n<s;n++){var o=r.parts[n];if("c"===o.type){if(parseInt(o.c,10)<C.maxPs)return 1;break}}return 0}return e.split("c").length>2?1:0}function c(t,r){var e="v"===t.type?"v":"";e+=t.laters.join("")+","+r.laters.join(",");var n=e.split("c"),s=o(n,1),a=s[0];return a.indexOf("-")>=0||a.split("v").length>2}function l(t){for(var r=[],e=t[0];t.length>0;){var n=t.shift();","===n.type?h(n,e,t):0===r.length&&v(n),b(n,t),g(n.parts),0===t.length&&r.length>1&&(r[r.length-1].position=2===r.length?"&":",&"),r.push(n),e=n}return r}function v(t){if("b"!==t.parts[0].type){var r=t.type.split("-"),e=o(r,1),n=e[0],s="";A(t.parts[0].b)&&(s="b1"),t.parts[0].subType=s+"^"+n}}function h(t,r,e){"undefined"!=typeof r.subTokens&&(r=r.subTokens[r.subTokens.length-1]);var n=r.parts[r.parts.length-1],s=r.type.split("-"),o=e[0].type.split("-");t.parts=[{type:",",subType:s.pop()+","+o[0],b:n.b,c:n.c,v:n.v,laters:[]}]}function b(t,r){var e=t.type,n=[],s=!1,a=!1;"b"===e&&(n.push(t.parts[0].b),s=!0);for(var i=0,p=r.length;i<p;i++){var u=r[i],f=u.type;if(","!==f&&(s===!0&&("b"===f?n.push(u.parts[0].b):s=!1),a!==!0))if(f.indexOf("b")>=0){var c=f.split("b"),l=o(c,1),v=l[0];if(v.length>0&&t.laters.push(v),s===!1)break;a=!0}else t.laters.push(f)}n.length>1&&y(t,n,r)}function y(t,r,e){for(;r.length>1;){var n=r.join(",");if("undefined"!=typeof M[n]&&"string"==typeof M[n][0])return t.bookSequence=n,void(t.subTokens=e.splice(0,2*(r.length-1)));r.pop()}}function g(t){for(var r=[],e=t.length,n=0;n<e;n++)r.push(t[n].type);for(var s=0;s<e;s++)r.shift(),t[s].laters=r.filter(function(t){return"."!==t})}function d(t,r){var e=t.split("-"),n=o(e,2),s=n[0],a=n[1],i=m(s,r);if(void 0===a)return i;var p=m(a,r),u=i.parts;u.push(S(i,p));var f={osis:t,type:i.type+"-"+p.type,parts:u.concat(p.parts),laters:[]};return"b-b"===f.type&&(f.bookRange=i.parts[0].b+"-"+p.parts[0].b),f}function S(t,r){var e=t.parts[t.parts.length-1],n={type:"-",subType:t.type+"-"+r.type,b:e.b,laters:[]};return"undefined"!=typeof e.c&&(n.c=e.c),"undefined"!=typeof e.v&&(n.v=e.v),n}function m(t,r){var e=t.split("."),n=o(e,3),s=n[0],a=n[1],i=n[2];if("undefined"==typeof M[s])throw'Unknown OSIS book: "'+s+'" ('+t+")";var p={osis:t,type:"",parts:[],laters:[]},u=A(s),f=u&&"string"==typeof i&&("bv"===C.singleChapterFormat||"b"===C.singleChapterFormat);return E(s,a,i,u,f,r,p)===!1?p:T(s,a,i,f,r,p)===!1?p:(p.type+="v",p.parts.push({type:"v",subType:"",b:s,c:a,v:i,laters:[]}),r.v=parseInt(i,10),p)}function E(t,r,e,n,s,o,a){var i=void 0===e&&n===!0&&"b"===C.singleChapterFormat;if(t!==o.b||void 0===r||i){if(o.b=t,o.c=0,o.v=0,a.parts.push({type:"b",subType:"",b:t,laters:[]}),a.type="b",void 0===r||i)return!1;var p="b.c";s===!0?p="b.v":n===!0&&(p="b1.c"),a.parts.push({type:".",subType:p,b:t,laters:[]})}return!0}function T(t,r,e,n,s,o){if(parseInt(r,10)!==s.c||void 0===e){if(s.c=parseInt(r,10),s.v=0,n===!0)return!0;if(o.parts.push({type:"c",subType:"",b:t,c:r,laters:[]}),o.type+="c",void 0===e)return!1;o.parts.push({type:".",subType:"c.v",b:t,laters:[]})}return!0}function A(t){return C.singleChapterBooks.indexOf(t)>=0}function P(t){if($.test(t)===!1)throw"Invalid osis format: '"+t+"'";return"bc"===C.Ps151Format&&(t=t.replace(/(?:Ps151|AddPs)(?:\.\d+\b)?/g,"Ps.151")),t}function O(t){var r={b:"",c:0,v:0};if(null==t)return r;if(t=P(t),t.indexOf("-")>=0){var e=t.split("-"),n=o(e,2),s=n[1];return O(s)}var a=t.split("."),i=o(a,3),p=i[0],u=i[1],f=i[2];if("undefined"==typeof M[p])throw'Unknown OSIS book provided for "context": "'+p+'" ('+t+')"';return r.b=p,"string"==typeof u&&(r.c=parseInt(u,10),"string"==typeof f&&(r.v=parseInt(f,10))),r}function J(t){if(C=e(),null!=t)for(var r=Object.keys(t),n=0,o=r.length;n<o;n++){var a=r[n],i=s(C[a]);if("undefined"!==i&&s(t[a])!==i)throw'Invalid type for options["'+a+'"]. It should be "'+i+'".';C[a]=t[a]}}function k(t){M={},Object.keys(t).forEach(function(r){var e=t[r];if(Array.isArray(e)===!1)throw'books["'+r+'"] should be an array: '+Object.prototype.toString.call(e)+".";if(e.length<1||e.length>3)throw'books["'+r+'"] should have exactly 1, 2, or 3 items. ';M[r]=e})}var $=/^[1-5A-Za-z]{2,}(?:\.\d{1,3}(?:\.\d{1,3})?)?(?:-[1-5A-Za-z]{2,}(?:\.\d{1,3}(?:\.\d{1,3})?)?)?$/,M={},C=e();return{format:t,tokenize:r,setOptions:J,setBooks:k}}var s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol?"symbol":typeof t},o=function(){function t(t,r){var e=[],n=!0,s=!1,o=void 0;try{for(var a,i=t[Symbol.iterator]();!(n=(a=i.next()).done)&&(e.push(a.value),!r||e.length!==r);n=!0);}catch(p){s=!0,o=p}finally{try{!n&&i["return"]&&i["return"]()}finally{if(s)throw o}}return e}return function(r,e){if(Array.isArray(r))return r;if(Symbol.iterator in Object(r))return t(r,e);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}();t.exports=n}]);