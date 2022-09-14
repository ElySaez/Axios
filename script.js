
// control para formulario
var submit_form = document.getElementById("form_rut");
submit_form.onsubmit = function (e) {
    e.preventDefault();// evita el comportamiento natural del form
}

//btn de buscar
document.getElementById("buscar").onclick = function () {
    let rut_q = document.getElementById("rut_q").value;
    buscar(rut_q);
};


//buscar con axios async
function buscar(rut_q) {
    axios({
        method: 'get',
        url: 'https://api.libreapi.cl/rut/activities',
        responseType: 'json', // default
        params: {
            rut: rut_q
        }
    })
        .then(function (response) {
            // handle success
            // console.log(response);

            if (response.status === 200) {
                let data = response.data.data;
                // console.log(data.data.name)
                document.getElementById('name').innerHTML = data.name;
                document.getElementById('rut').innerHTML = data.rut;

                if(data.activities != null){
                    data.activities.forEach(e => {
                        console.log(e);
                        document.getElementById('activities').innerHTML =
                            '<p>' + e.name + '</p>' +
                            '<p>' + e.code + '</p>' +
                            '<p>' + e.category + '</p>' +
                            '<p>' + e.subject_to_vat + '</p>' +
                            '<p>' + e.date + '</p>'
                            ;
                    });
                }
            }

        })
        .catch(function (error) {
            // handle error
            // console.log(error);
            alert(`Hay un error: ${error.message}`);

        });
}
