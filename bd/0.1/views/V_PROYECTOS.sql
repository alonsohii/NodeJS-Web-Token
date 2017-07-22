-- DROP VIEW V_PROYECTOS;
CREATE VIEW V_PROYECTOS AS
SELECT idbp_proyecto as id , 
          Tiulo as nombre , 
          bp_proyecto.descripcion as descripcionp  , 
          oferta as presupuestoPersonalizado , 
          fecharegistro , fechaentrega ,
          _idbp_Categorias  as idcat, 
       bp_categorias.nombre as categoria,
       bp_categorias.img as imagencategoria,
          _idbp_Subcategorias as idsubcat ,
       nombreSub as subcategoria,
       imgSub as imagensubcategoria,
          desarrollo ,
          _idPresupuesto as idpresupuesto,
       CONCAT('Presupuesto de ', cantidad , ' hasta ' , cantidad2) as presupuestoDesc,
       -- Pais y moneda (Pendiente)
       cantidad as de,
       cantidad2 as hasta,
       bp_proyecto.url as urlproyecto
 FROM freelancer.bp_proyecto
LEFT JOIN freelancer.presupuesto on presupuesto.idPresupuesto = bp_proyecto._idPresupuesto
LEFT JOIN freelancer.bp_categorias on bp_categorias.idbp_Categorias = bp_proyecto._idbp_Categorias
LEFT JOIN freelancer.bp_subcategorias on bp_subcategorias.idbp_Subcategorias = bp_proyecto._idbp_Subcategorias;
