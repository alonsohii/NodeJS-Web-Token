
INSERT INTO `bp_categorias` (`idbp_Categorias`, `nombre`, `img`, `Descripcion`) VALUES (1, 'IT & Programación', NULL, 'IT & Programación');
INSERT INTO `bp_categorias` (`idbp_Categorias`, `nombre`, `img`, `Descripcion`) VALUES (2, 'Diseño / Multimedia', NULL, 'Diseño grafico , multimedia');
INSERT INTO `bp_categorias` (`idbp_Categorias`, `nombre`, `img`, `Descripcion`) VALUES (3, 'Traducción de Contenidos', NULL, 'IT & Programación');
INSERT INTO `bp_categorias` (`idbp_Categorias`, `nombre`, `img`, `Descripcion`) VALUES (4, 'Ventas y Marketing', NULL, 'Marketing');
INSERT INTO `bp_categorias` (`idbp_Categorias`, `nombre`, `img`, `Descripcion`) VALUES (5, 'Soporte Administrativo', NULL, 'Soporte Administrativo');
INSERT INTO `bp_categorias` (`idbp_Categorias`, `nombre`, `img`, `Descripcion`) VALUES (6, 'Legal', NULL, 'Legal');
INSERT INTO `bp_categorias` (`idbp_Categorias`, `nombre`, `img`, `Descripcion`) VALUES (7, 'Finanzas y Administración', NULL, 'Finanzas y Administración');
INSERT INTO `bp_categorias` (`idbp_Categorias`, `nombre`, `img`, `Descripcion`) VALUES (8, 'Ingeniería y Manufactura', NULL, 'Ingeniería y Manufactura');

-- SubCategorias

INSERT INTO `bp_subcategorias` (`idbp_Subcategorias`, `nombreSub`, `descripcion`, `imgSub`, `bp_Subcategoriascol`, `idbp_Categoriasfk`, `url`) VALUES ('1', 'Programación Web', 'Programación Web', NULL, NULL, '1', NULL);
INSERT INTO `bp_subcategorias` (`idbp_Subcategorias`, `nombreSub`, `descripcion`, `imgSub`, `bp_Subcategoriascol`, `idbp_Categoriasfk`, `url`) VALUES ('2', 'Diseño web', 'Diseño web', NULL, NULL, '1', NULL);