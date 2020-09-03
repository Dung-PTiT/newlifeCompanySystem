$( document ).ready(function() {
    //add priv list to form
    for(priv_index in privl_data){
        var priv=privl_data[priv_index];
        $('#group_priv_id').append(new Option(priv['groupPrivName'],priv['groupPrivId']));
    }

    var stt=0;
    for (group in info_data) {
        stt++;
        // console.log("-----------------")
        var tr_group='<tr class="bg-dark pt-0 pb-0">'
        +'<td class="" style="font-size:1.1rem;">'+group+'</td>'
        +'<td><i class="icon-plus3 float-right" aria-hidden="true"></i></td>'
        +'</tr>';

        var tr_user_table='<tr class="row-user-table"><td colspan="3"><table class="table table-bordered">'
            +'<tr class="bg-light"><th>Username</th>'
                +'<th>Họ Tên</th>'
                + '<th>Group Privilege</th>'
                + '<th>Tác Vụ</th>'
                +'</tr>';
        var group_privilege=info_data[group].privilege;
        group_probe_id=info_data[group]['groupProbeId'];
        for(user_index in info_data[group].userList){
            var user=info_data[group].userList[user_index];
            tr_user_table=tr_user_table+
                '<tr>'
                    +'<td>'+user.userName+'</td>'
                    +'<td>'+user.name+'</td>'
                    +'<td>'+user.groupPrivName+'</td>'
                    +'<td>';
            if(group_privilege.privDelUser==1){
                tr_user_table=tr_user_table+'<i class="icon-trash text-danger" aria-hidden="true"'
                +'onclick="ConfirmDialog(\''+user.name+'\',\''+user.userName+'\','+group_probe_id+')"></i>';
            }
            if(group_privilege.privEditUser==1){
                tr_user_table=tr_user_table+'<i class="icon-pencil5 ml-1" aria-hidden="true"'
                +'onclick="edit_user_func(\''+user.name+'\',\''+user.userName+'\',\''+user.groupPrivName+'\')"></i>';
            }
            tr_user_table=tr_user_table+'</td>'+'</tr>'
        }
        tr_user_table=tr_user_table +'</table></td></tr>';
        $("#userTable").append(tr_group);
        $("#userTable").append(tr_user_table);
    }
});

function add_user_func(){
    $('#name').val("");
    $('#username').attr("readonly",false);
    $('#username').val("");
    $('#password').val("");
    $('#group_priv_id').selectpicker('deselectAll');
    $('#group_priv_id').selectpicker('render');
    
    $('#add_edit_popup').modal('show');

    $('#form_add_edit_user').attr('action','/addEditUser');
    $('#form_add_edit_user').attr('method','post');
}

function edit_user_func(name, username,groupPrivName){
    $('#name').val(name);
    $('#username').attr("readonly",true);
    $('#username').val(username);
    $('#password').val("");
    // $('#group_priv_id').options.each(function( index ) {
    //     console.log( index + ": " + $(this).text());
    //   });
    var element = document.getElementById('group_priv_id');
    for (var i = 0; i < element.options.length; i++) {
        element.options[i].selected = groupPrivName.includes(element.options[i].text) ==true;
        
    }
    $('#group_priv_id').selectpicker('render');
    $('#add_edit_popup').modal('show');

    $('#form_add_edit_user').attr('action','/addEditUser');
    $('#form_add_edit_user').attr('method','put');
}

function submitForm(form){
    console.log($(form));
    var url = '/addEditUser';
    var formData = $(form).serialize();
    var method=$(form).attr('method');
    $.ajax({
        url: url,
        type: method,
        data:formData,
        success: function(response) {
            alert(response);
          location.reload();
        },
        error: function (xhr, textStatus, errorThrown) {  
            alert("ERROR "+textStatus);
            console.log('Error in Operation');  
        }
     });
}
function ConfirmDialog(name,username,group_probe_id){

    $.confirm({
        message: 'Delete This Entry?',
        onOk: function() {
            // console.log(username);
            $.ajax({
                url: '/deleteUser',
                type: 'DELETE',
                data:{'username':username,'group_probe_id':group_probe_id},
                success: function(response) {
                    alert(response);
                  location.reload();
                },
                error: function (xhr, textStatus, errorThrown) {  
                    alert("ERROR "+textStatus);
                    console.log('Error in Operation');  
                }
             });
        }
    });

}
