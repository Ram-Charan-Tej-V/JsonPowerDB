/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */


/* global jpdbIRL */

var jpdbBaseURL = "http://api.login2explore.com:5577";
var jbdbIRL = "/api/irl";
var jpdbIML = "/api/iml";
var stdDBName="SCHOOL-DB";
var stdRelationName = "STUDENT-TABLE";
var connToken = "90932259|-31949270681283661|90954456";

$("#stdid").focus();

function saveRecNo2LS(jsonObj) {
    var lvData = JSON.parse(jsonObj.data); 
    localStorage.setItem("recno", lvData.rec_no);
}

function getStdrnAsJsonObj() {
    var stdrn = $("#stdid").val();
    var jsonStr = {
        rn: stdrn
    };
    return JSON.stringify(jsonStr);
}
function fillData(jsonObj) {
    saveRecNo2LS(jsonObj);
    var record = JSON.parse(jsonObj.data).record;
    $("#stdname").val(record.name);
    $("#stdclass").val(record.class);
    $("#stdbd").val(record.bd);
    $("#stdad").val(record.ad);
    $("#stded").val(record.ed);
}

function resetForm() {
    $("#stdrn").val("");
    $("#stdname").val("");
    $("#stdclass").val("");
    $("#stdbd").val("");
    $("#stdad").val("");
    $("#stded").val("");
    $("#stdrn").prop("disabled", false);
    $("#save").prop("disabled", true);
    $("#update").prop("disabled", true); 
    $("#reset").prop("disabled", true);
    $("#empid").focus();
    }
  
function validateData() {
    var stdrn, stdname, stdclass, stdbd, stdad, stded; 
    stdrn = $("stdrn").val(); 
    stdname = $("#stdname").val();
    stdclass = $("#stdclass").val();
    stdbd = $("#stdbd").val();
    stdad = $("#stdad").val();
    stded = $("#stded").val();

    if (stdrn === "") {
        alert("Student Roll-No missing"); 
        $("#stdrn").focus();
        return "";
    } 
    if (stdname === "") { 
        alert("Student Name missing");
        $("#stdname").focus(); 
        return "";
    }    
    if (stdclass === "") {
        alert("Student Class missing");
        $("#stdclass").focus();
        return "";
    }
    if (stdbd === "") {
        alert("Student Birth-Date missing");
        $("#stdbd").focus();
        return "";
    }
    if (stdad === "") {
        alert("Student Address missing");
        $("#stdad").focus();
        return "";
    }
    if (stded === "") {
        alert("Student Enrollment-Date missing");
        $("#stded").focus();
        return "";
    }
    
    var jsonStrObj = {
        rn: stdrn,
        name: stdname,
        class: stdclass,
        bd: stdbd,
        ad: stdad,
        ed: stded
    };
    return JSON.stringify(jsonStrObj);
}

function getStd() {
    var StdrnsonObj = getStdrnAsJsonObj();
    var getRequest = createGET_BY_KEYRequest(connToken, stdDBName, stdRelationName, stdrnJsonObj);
    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommandAtGivenBaseUrl(getRequest, jpdbBaseURL, jpdbIRL);
    jQuery.ajaxSetup({async: true});
    if (resJsonObj.status === 400) {
        $("#save").prop("disabled", false);
        $("#reset").prop("disabled", false);
        $("#stdname").focus();

    } else if (resJsonObj.status === 200) {

        $("#stdrn").prop("disabled", true); 
        fillData(resJsonObj);

        $("#update").prop("disabled", false);
        $("#reset").prop("disabled", false);
        $("#stdname").focus();

    }
}

function saveData() {
    var jsonStrObj = validateData();
    if (jsonStrObj === " "){
        return "";
    }
    var putRequest = createPUTRequest(connToken, jsonStrObj, stdDBName, stdRelationName); 
    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommandAtGivenBaseUrl(putRequest, jpdbBaseURL, jpdbIML); 
    jQuery.ajaxSetup({async: true});
    resetForm();
    $("#stdrn").focus();
    
    
function updateData() {
    $("#update").prop("disabled", true); 
    jsonchg = validateData();
    var updateRequest = createUPDATERecordRequest(connToken, jsonchg, stdDBName, stdRelationName, localStorage.getItem("recno"));
    jQuery.ajaxSetup ({async : false}); 
    var resJsonObj = executeCommandAtGivenBaseUrl(updateRequest, jpdbBaseURL, jpdbIML); 
    jQuery.ajaxSetup ({async : true}); 
    console.log(resJsonObj);
    resetForm();
    $('#stdrn').focus();
    }