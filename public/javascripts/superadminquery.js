function deleteLine1(id){
    superagent.delete(`/superadmin/line`).send({id_line: id})
}