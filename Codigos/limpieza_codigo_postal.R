datos = readxl::read_excel("Datos/Encuesta sobre hábitos de movilidad de personas servidoras públicas del Gobierno del estado de Hidalgo (respuestas).xlsx")
codigos = sf::read_sf("Datos/CP_Hgo.shp")

names(datos) = names(datos) |>  gsub(pattern = "_Trabajo", replacement = "_Trabajo_Hogar")
names(datos) = names(datos) |>  gsub(pattern = " _Trabajo", replacement = "_Trabajo_Hogar")

names(datos) = names(datos) |>  gsub(pattern = "_Origen", replacement = "_Hogar_Trabajo")
names(datos) = names(datos) |>  gsub(pattern = " _Origen", replacement = "_Hogar_Trabajo")

names(datos) = names(datos) |>  stringr::str_squish()


datos = datos[-c(1:11),]



codigo_hogar = datos |> 
  dplyr::select(Dependencia,`Código postal_Hogar_Trabajo`)

codigo_hogar = unique(codigo_hogar)
codigo_hogar = codigo_hogar |> 
  dplyr::mutate(
      `Código postal_Hogar_Trabajo` = dplyr::case_when(
        `Código postal_Hogar_Trabajo` == "82161" ~ "42161",
        `Código postal_Hogar_Trabajo` == "42111186" ~ "42186",
        `Código postal_Hogar_Trabajo` == "4115" ~ "41115",
        `Código postal_Hogar_Trabajo` == "420000" ~ "42000",
        TRUE ~ `Código postal_Hogar_Trabajo`
     )
   )


a = codigo_hogar$`Código postal_Hogar_Trabajo` |>  unique() |>  data.frame()
names(a) = "codigo"
a = a |> 
  dplyr::filter(as.numeric(codigo)>43998)
