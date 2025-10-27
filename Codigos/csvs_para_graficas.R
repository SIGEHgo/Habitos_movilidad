datos = readxl::read_excel("Output/base_filtrada_completa_excel.xlsx")
datos = readxl::read_excel("Output/datos_filtrados.xlsx")

dependencia = datos |> 
  dplyr::count(Dependencia)


edad = datos |> 
  dplyr::count(Edad_Clasificacion, sort = T)




genero = datos |> 
  dplyr::count(Genero, sort = T)




discapacidad = datos |> 
  dplyr::count(`¿Usted presenta alguna discapacidad?`, sort = T)


jsonlite::write_json(datos, "Output/base_filtrada.json", pretty = TRUE)




