$( document ).ready(function() {
    // console.log(groupP_data);

    for(probeGroup_index in groupP_data){
        var probeGroup=groupP_data[probeGroup_index];
        $('#group_probe_id').append(new Option(probeGroup['groupProbeName'],probeGroup['groupProbeId']));
    }

    var tr_priv_table='';
    var stt=0;
    for (group_name in gpriv_data){
        list_priv=gpriv_data[group_name];
        // console.log(list_priv);
        
        for(priv_index in list_priv){
            stt=stt+1;
            var priv=list_priv[priv_index];
            tr_priv_table=tr_priv_table+
                '<tr>'
                    +'<td>'+stt+'</td>'
                    +'<td>'+group_name+'</td>'
                    +'<td>'+priv.groupPrivName+'</td>'
                    +'<td>'
                        +'<i class="icon-trash text-danger" aria-hidden="true"'
                            +'onclick="DeleteConfirmDialog('+priv.groupPrivId+')"></i>'
                        +'<i class="icon-pencil5 ml-1" aria-hidden="true"'
                            +'onclick="edit_priv_func(\''+group_name+'\',\''+priv_index+'\')"></i>';
            tr_priv_table=tr_priv_table+'</td>'+'</tr>'
        }
        
    }
    $('#table_priv').append(tr_priv_table);
});

var abc;
function add_priv_func(){
    $('.form-control:checkbox').map(function(i,e){
        checkBox=$(e);
        // console.log(e.checked);
        checkBox.bootstrapToggle('off');
        
    });
    $('#gp_name').val("");

    $('#form_add_edit_priv').attr('method','post');
    $('#add_edit_popup').modal('show');
}

function edit_priv_func(group_name,priv_index){
    list_priv=gpriv_data[group_name];
    var priv=list_priv[priv_index];
    // console.log(priv);
    $("#group_probe_id").val(priv.groupProbeId);
    $("#group_probe_id").selectpicker('render');
    $("#gp_name").val(priv.groupPrivName);


    priv.privAddUser==1 ? $('#add_user_priv').bootstrapToggle('on'): $('#add_user_priv').bootstrapToggle('off');
    priv.privEditUser==1 ? $('#edit_user_priv').bootstrapToggle('on'): $('#edit_user_priv').bootstrapToggle('off');
    priv.privDelUser==1 ? $('#del_user_priv').bootstrapToggle('on'): $('#del_user_priv').bootstrapToggle('off');

    priv.privAddProbe==1 ? $('#add_probe_priv').bootstrapToggle('on'): $('#add_probe_priv').bootstrapToggle('off');
    priv.privConfProbe==1 ? $('#conf_probe_priv').bootstrapToggle('on'): $('#conf_probe_priv').bootstrapToggle('off');
    priv.privDelProbe==1 ? $('#del_probe_priv').bootstrapToggle('on'): $('#del_probe_priv').bootstrapToggle('off');

    priv.privAddConfEvent==1 ? $('#add_conf_event_priv').bootstrapToggle('on'): $('#add_conf_event_priv').bootstrapToggle('off');
    priv.privEditConfEvent==1 ? $('#conf_event_priv').bootstrapToggle('on'): $('#conf_event_priv').bootstrapToggle('off');
    priv.privDelConfEvent==1 ? $('#del_conf_event_priv').bootstrapToggle('on'): $('#del_conf_event_priv').bootstrapToggle('off');

    priv.privDelEvent==1 ? $('#del_event_priv').bootstrapToggle('on'): $('#del_event_priv').bootstrapToggle('off');
    priv.privAckEvent==1 ? $('#ack_event_priv').bootstrapToggle('on'): $('#ack_event_priv').bootstrapToggle('off');

    $('#form_add_edit_priv').attr('method','put');
    $('#group_priv_id').val(priv.groupPrivId);
    $('#add_edit_popup').modal('show');
    
}

function submitForm(form){
    // console.log($(form));
    var url = '/mPrivilege';
    var formData = $(form).serialize();
    // console.log(formData);
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

function DeleteConfirmDialog(group_priv_id){

    $.confirm({
        message: 'Delete This Privilege?',
        onOk: function() {
            $.ajax({
                url: '/mPrivilege',
                type: 'DELETE',
                data:{'group_priv_id':group_priv_id},
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
