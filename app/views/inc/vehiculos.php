<div class="contenedorVehiculos">
  <h3>En este módulo podrás consultar y modificar la información de los vehículos</h3>

  <div class="modificarInfoForm mt-20 mb-20 hidden">
    <form class="form">
        <div class="row">

          <div class="col-xs-12 col-md-4">
              <div class="form-group">
                <label for="nombreVehiculo">Nombre del vehículo</label>
                <input type="text" class="form-control" id="nombreVehiculo" name="nombre">
              </div>
          </div>

          <div class="col-xs-12 col-md-4">
            <div class="form-group">
              <label for="fechaSoat">Fecha de vencimiento SOAT</label>
              <input type="text" class="form-control" id="fechaSoat" name="fechasoat">
            </div>
          </div>

          <div class="col-xs-12 col-md-4">
            <div class="form-group">
              <label for="fechaTecno">Fecha de vencimiento R.Tecnicomecanica</label>
              <input type="text" class="form-control" id="fechaTecno" name="fechatecno">
            </div>
          </div>
        </div>

        <div class="row mt-20 mb-20">
          <div class="col-xs-12 flex justify-content-center">
            <button class="btn btn-primary" id="actualizarInformacion">Actualizar información</button>
          </div>
        </div>
    </form>
  </div>

  <div class="contenedorTabla mt-30">
    <table class="table table-striped">
      <thead>
        <tr>
          <th>No.</th>
          <th>Nombre del vehículo</th>
          <th>Fecha de vencimiento de SOAT</th>
          <th>Fecha de vencimiento de Revisión tecnico-mecánica</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>

      </tbody>
    </table>
  </div>
</div>
