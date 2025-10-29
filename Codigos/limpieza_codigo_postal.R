df = readxl::read_excel("Datos/Encuesta sobre hábitos de movilidad de personas servidoras públicas del Gobierno del estado de Hidalgo (respuestas).xlsx")

datos = readxl::read_excel("Output/datos_filtrados.xlsx")
mun = sf::read_sf("../../Importantes_documentos_usar/Municipios/municipiosjair.shp")

codigo_geometrias = sf::read_sf("Datos/CP_Hgo.shp")
codigo_geometrias = codigo_geometrias |> sf::st_transform(crs = 4326) |>  sf::st_make_valid()

hogar = datos |>  dplyr::select(Dependencia, `Código postal_Hogar_Trabajo`) |>  unique()
hogar = hogar |> 
  dplyr::group_by(`Código postal_Hogar_Trabajo`) |> 
  dplyr::summarise(depencia = paste0(Dependencia, collapse = ","))

hogar_conteo = datos |> 
  dplyr::count(`Código postal_Hogar_Trabajo`)

hogar = hogar |> dplyr::left_join(y = hogar_conteo, by = c("Código postal_Hogar_Trabajo" = "Código postal_Hogar_Trabajo"))
hogar = hogar |> 
  dplyr::mutate(depencia = depencia |>  gsub(pattern = ",", replacement = ", ")) |> 
  dplyr::arrange(dplyr::desc(n))

hogar = hogar |>  dplyr::left_join(y = codigo_geometrias, by = c("Código postal_Hogar_Trabajo" = "d_cp"))  |>  sf::st_as_sf(crs = 4326)



municipios_hogar = sf::st_join(x = hogar |>  sf::st_centroid(), y = mun, join = sf::st_intersects)
municipios_hogar = municipios_hogar |>  dplyr::select(`Código postal_Hogar_Trabajo`, NOM_MUN) |>  sf::st_drop_geometry()
hogar = hogar |>  dplyr::left_join(y = municipios_hogar, by = c("Código postal_Hogar_Trabajo" = "Código postal_Hogar_Trabajo")) |> 
  dplyr::relocate(NOM_MUN, .after = `Código postal_Hogar_Trabajo`)


sf::st_write(hogar, "Output/Base_geometria/hogar_cp.geojson", driver = "GeoJSON", delete_dsn = TRUE)



# leaflet() |> 
#   addTiles() |> 
#   addPolygons(data = hogar, popup = hogar$`Código postal_Hogar_Trabajo`)
# 
# 
# library(leaflet)
# leaflet() |> 
#   addTiles() |> 
#   addPolygons(data = codigo_geometrias |>  sf::st_transform(crs = 4326), popup = codigo_geometrias$d_cp)





### Trabajo
trabajo = datos |>  dplyr::select(Dependencia, `Código Postal_Trabajo_Hogar`) |>  unique()
trabajo = trabajo |> 
  dplyr::group_by(`Código Postal_Trabajo_Hogar`) |> 
  dplyr::summarise(depencia = paste0(Dependencia, collapse = ",")) |> 
  dplyr::ungroup() |> 
  dplyr::mutate(depencia = depencia |> gsub(pattern = ",", replacement = ", "))




trabajo = trabajo |>  dplyr::left_join(y = codigo_geometrias, by = c("Código Postal_Trabajo_Hogar" = "d_cp")) |>  sf::st_as_sf(crs = 4326)
municipio_trabajo = trabajo |>  sf::st_centroid() |>  sf::st_join(y = mun, join = sf::st_intersects) |>  
  dplyr::select(`Código Postal_Trabajo_Hogar`, NOM_MUN) |>  sf::st_drop_geometry()

trabajo = trabajo |> dplyr::left_join(y = municipio_trabajo, by = c("Código Postal_Trabajo_Hogar" = "Código Postal_Trabajo_Hogar")) |> 
  dplyr::relocate(NOM_MUN, .after = `Código Postal_Trabajo_Hogar`)

trabajo_conteo = datos |> 
  dplyr::count(`Código Postal_Trabajo_Hogar`)


trabajo = trabajo |>  dplyr::left_join(y = trabajo_conteo, by = c("Código Postal_Trabajo_Hogar" = "Código Postal_Trabajo_Hogar")) |> 
  dplyr::relocate(n, .after = depencia) |>  dplyr::arrange(dplyr::desc(n))


sf::st_write(trabajo, "Output/Base_geometria/trabajo_cp.geojson", driver = "GeoJSON", delete_dsn = TRUE)
