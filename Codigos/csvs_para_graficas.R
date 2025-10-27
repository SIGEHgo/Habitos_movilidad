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



prueba = datos |> 
  dplyr::count(`De 1 al 7, en donde 7 es menos probable y 1 es más probable. ¿Qué alternativas de transporte elegiría para realizar el viaje hacia su lugar de trabajo? (Deberá elegir una opción diferente en cada columna) [Vehículo particular]_Hogar_Trabajo`)

jsonlite::write_json(datos, "Output/base_filtrada.json", pretty = TRUE)



prueba = datos |> 
  dplyr::count(`De 1 al 7, en donde 7 es menos probable y 1 es más probable. ¿Qué alternativas de transporte elegiría para realizar el viaje hacia su domicilio particular? (Deberá elegir una opción diferente en cada columna) [Auto compartido]_Trabajo_Hogar`)



