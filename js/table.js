const $table = $('#table');
const $remove = $('#remove');
const id = JSON.parse(localStorage.getItem("account")).id;
let selections = [];

function initTable() {
  $table.bootstrapTable({
    url: "http://localhost:8080/task2EJB/app/contact/view_by_accountID/" + id,
    columns: [
      [
        {
            field: 'fullName',
            title: 'Full Name'
        }, {
            field: 'emailAddress',
            title: 'Email'
        }, {
            field: 'gender',
            title: 'Gender'
        },  {
            field: 'phoneNumber',
            title: 'Phone Number'
        },  {
            field: 'activeStatus',
            title: 'Active Status'
        },  {
            field: 'address',
            title: 'Address'
        }, {
          field: 'operate',
          title: 'Item Operate',
          align: 'center',
          events: operateEvents,
          formatter: operateFormatter
        }
      ]
    ],
    search: true
  });
}

function operateFormatter(value, row, index) {
  return [
    '<a class="edit" title="Edit" role="button" data-toggle="modal" data-target="#createContactModal" >',
    '<span>Edit</span>',
    '</a>  ',
    '<a class="remove" href="javascript:void(0)" title="Remove">',
    '<span>Delete</span>',
    '</a>'
  ].join('');
}

window.operateEvents = {
  'click .edit': function (e, value, row, index) {
    localStorage.setItem("contactID", row.contactID);
    $("#fname").val(row.firstName);
    $("#lname").val(row.lastName);
    $("#eaddress").val(row.emailAddress);
    row.gender == "male" ? $("#radio_male").prop("checked", true) : $("#radio_female").prop("checked", true);
    $("#pnumber").val(row.phoneNumber); 
    row.activeStatus ? $("#cb_activeStatus").prop("checked", true) : $("#cb_activeStatus").prop("checked", false);
    $("#street").val(row.street);
    $("#city").val(row.city);
    $("#state").val(row.state);
    $("#country").val(row.country);
  },
  'click .remove': function(e, value, {contactID}, index) {
    $.ajax({
      url: 'http://localhost:8080/task2EJB/app/contact/delete/' + contactID,
      type: 'DELETE',
      success: () => {
        $table.bootstrapTable('remove', {
          field: 'contactID',
          values: [contactID]
        });
      }
    });
  }
};

$(() => {
	initTable();
})