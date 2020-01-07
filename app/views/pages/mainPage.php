<?php
include_once APP_PATH.'/views/inc/header.php';
?>

<!-- este es preloader -->
<div class="preloader flex justify-content-center align-items-center">
    <img src="<?php echo URL_PATH."/img/loading.gif"; ?>" alt="" style="max-width:50px;max-height:50px">
</div>




<div class="container">
    <div class="returnHome">
      <a href="<?php echo URL_PATH; ?>">
        <i class="fa fa-home"></i>        
      </a>
    </div>
    <?php include(APP_PATH."/views/inc/".$data['contenido'].".php"); ?>
</div>

<?php
include_once APP_PATH.'/views/inc/footer.php';
?>
