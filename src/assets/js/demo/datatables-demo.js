// Call the dataTables jQuery plugin

$(document).ready(function () {
        
  $('#dataTable').DataTable( 
    {
      dom: 'Bfrtip',
      "searching": true ,
      "paging": true,
      "order": [[0, "asc"]],
      "ordering": true,
      //"columnDefs": [
      //  {
      //    "targets": [3],
      //    "orderable":false
      //  }
      //],
      buttons: [
        { extend: 'pdf', className: 'btn-primary btn btn-sm' },
        { extend: 'excel', className: 'btn-success btn btn-sm' },
        { extend: 'print', className: 'btn-info btn btn-sm' },
        { extend: 'csv', className: 'btn-warning btn btn-sm' },
        { extend: 'copy', className: 'btn-danger btn btn-sm' },
      ]
    }
  );
});