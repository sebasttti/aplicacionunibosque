<div class="contenedorConductores">
  <h3>En este módulo podrás consultar y modificar la información de los conductores</h3>

  <div class="flex justify-content-start">
    <button class="btn btn-success" id="agregarConductor">Agregar conductor</button>
  </div>

  <div class="modificarInfoForm mt-20 mb-20 hidden">
    <form class="form">
        <div class="row">

          <div class="col-xs-12 col-md-4">
              <div class="form-group">
                <label for="nombreVehiculo">Nombre del conductor</label>
                <input type="text" class="form-control" id="nombre">
              </div>
          </div>

          <div class="col-xs-12 col-md-4">
            <div class="form-group">
              <label for="fechaSoat">Apellido del conductor</label>
              <input type="text" class="form-control" id="apellido">
            </div>
          </div>

          <div class="col-xs-12 col-md-4">
            <div class="form-group">
              <label for="fechaTecno">Cédula del conductor</label>
              <input type="text" class="form-control" id="cedula">
            </div>
          </div>

          <div class="col-xs-12 col-md-4">
            <div class="form-group">
              <label for="fechaTecno">Licencia del conductor</label>
              <input type="text" class="form-control" id="licencia">
            </div>
          </div>


        </div>

        <div class="row mt-20 mb-20">
          <div class="col-xs-12 flex justify-content-center">
            <button class="btn btn-primary hidden" id="crearInformacion">Crear conductor</button>
            <button class="btn btn-primary hidden" id="actualizarInformacion">Actualizar información</button>
          </div>
        </div>
    </form>
  </div>

  <div class="contenedorTabla mt-30">
    <table class="table table-striped">
      <thead>
        <tr>
          <th>No.</th>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>Cédula</th>
          <th>Número de licencia</th>
          <th>Estado</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>

      </tbody>
    </table>
  </div>
</div>
