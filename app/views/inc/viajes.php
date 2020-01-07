<div class="contenedorConductores">
  <h3>En este módulo podrás crear, consultar y actualizar la información de los viajes</h3>

  <div class="flex justify-content-start">
    <button class="btn btn-success" id="agregarViaje">Agregar viaje</button>
  </div>

  <div class="modificarInfoForm mt-20 mb-20 hidden">
    <form class="form">
        <div class="row">

          <div class="col-xs-12 col-md-4">
              <div class="form-group">
                <label for="">Fecha de viaje</label>
                <input type="text" class="form-control" id="fecha">
              </div>
          </div>

          <div class="col-xs-12 col-md-4">
            <div class="form-group">
              <label for="">Destino del viaje</label>
              <input type="text" class="form-control" id="destino">
            </div>
          </div>

          <div class="col-xs-12 col-md-4">
            <div class="form-group">
              <label for="">Distancia del viaje</label>
              <input type="text" class="form-control" id="distancia">
            </div>
          </div>

          <div class="col-xs-12 col-md-4">
            <div class="form-group">
              <label for="">Conductor del viaje</label>
              <select class="form-control" id="conductor">
                <option selected hidden value=""></option>
              </select>
            </div>
          </div>

          <div class="col-xs-12 col-md-4">
            <div class="form-group">
              <label for="">Vehículo del viaje</label>
              <select class="form-control" id="vehiculo">
                <option selected hidden value=""></option>
              </select>
            </div>
          </div>

        </div>

        <!-- aqui van los de los materiales -->
        <div class="row mt-20">

              <h4>Agregar materiales al viaje</h4>

              <div class="col-xs-12 col-md-4">
                <label for="">Material</label>
                <select class="form-control" id="material">
                  <option selected hidden value=""></option>
                </select>
              </div>

              <div class="col-xs-12 col-md-4">
                <label for="">Cantidad</label>
                <input type="text" class="form-control" id="cantidad">
              </div>

              <div class="col-xs-12 col-md-4 flex justify-content-center">
                <button class="btn btn-primary" id="agregarMaterial">Agregar material</button>
              </div>

        </div>

        <div class="row mt-20 flex justify-content-center hidden" id="tablaMaterial">

          <div class="col-xs-7">

            <table class="table table-striped">
              <thead>
                <tr>
                  <th>Material</th>
                  <th>Cantidad</th>
                </tr>
              </thead>
              <tbody></tbody>
            </table>

          </div>
        </div>





        <div class="row mt-20 mb-20">
          <div class="col-xs-12 flex justify-content-center">
            <button class="btn btn-success" id="crearViaje">Confirmar viaje</button>
          </div>
        </div>
    </form>
  </div>

  <div class="contenedorTabla mt-30 hidden">
    <table class="table table-striped">
      <thead>
        <tr>
          <th>No.</th>
          <th>Fecha</th>
          <th>Destino</th>
          <th>Distancia</th>
          <th>Materiales</th>
          <th>Costo</th>
          <th>Conductor</th>
          <th>Vehículo</th>
          <th>Estado</th>
        </tr>
      </thead>
      <tbody>

      </tbody>
    </table>
  </div>

  <div class="noViajes flex justify-content-center mt-20 hidden">
    <div class="panel panel-warning">
      <div class="panel-header bg-warning" style="padding:10px">
        <p>Actualmente no tienes viajes registrados</p>

      </div>
    </div>
  </div>
</div>
