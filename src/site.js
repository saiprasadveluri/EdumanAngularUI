// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.


export function ShowMessageDialog(title,errMsg)
{
  jQuery.noConflict(); 
  
  $("#myModal").modal('show');
  $("#dlgTitle").text(title);
  $("#errMsg").text(errMsg);
}

export function HideMessageDialog()
{
  jQuery.noConflict(); 
  $("#errMsg").text("");
  $("#myModal").modal('hide');
  
}

