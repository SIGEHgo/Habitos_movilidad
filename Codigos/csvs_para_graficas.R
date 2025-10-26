datos = readxl::read_excel("Output/base_filtrada_completa_excel.xlsx")

dependencia = datos |> 
  dplyr::count(Dependencia)
write.csv(dependencia, "Output/Tablas_para_graficas/dependencia.csv", fileEncoding = "UTF-8", row.names = F)
#writexl::write_xlsx(dependencia, "Output/Tablas_para_graficas/dependencia.xlsx")



edad = datos |> 
  dplyr::count(Edad_Clasificacion, sort = T)
write.csv(edad, "Output/Tablas_para_graficas/edad.csv", fileEncoding = "UTF-8", row.names = F)
#writexl::write_xlsx(edad, "Output/Tablas_para_graficas/edad.xlsx")



genero = datos |> 
  dplyr::count(Genero, sort = T)
write.csv(genero, "Output/Tablas_para_graficas/genero.csv", fileEncoding = "UTF-8", row.names = F)
#writexl::write_xlsx(genero, "Output/Tablas_para_graficas/genero.xlsx")



discapacidad = datos |> 
  dplyr::count(`¿Usted presenta alguna discapacidad?`, sort = T)
write.csv(discapacidad, "Output/Tablas_para_graficas/discapacidad.csv", fileEncoding = "UTF-8", row.names = F)
#writexl::write_xlsx(discapacidad, "Output/Tablas_para_graficas/discapacidad.xlsx")

jsonlite::write_json(datos, "Output/base_filtrada.json", pretty = TRUE)




