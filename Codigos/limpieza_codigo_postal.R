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
        `Código postal_Hogar_Trabajo` == "82161" ~ "42186",
        `Código postal_Hogar_Trabajo` == "42111186" ~ "42186",
        `Código postal_Hogar_Trabajo` == "4115" ~ "42115",  # Error de dedo
        `Código postal_Hogar_Trabajo` == "420000" ~ "42000",
        
        `Código postal_Hogar_Trabajo` == "54680" ~ "42853",  # Tepeji del Rio
        `Código postal_Hogar_Trabajo` == "55660" ~ "42986",  # Fuera de tula de allende
        `Código postal_Hogar_Trabajo` == "54660" ~ "42995",  # Fuera de tula de allende
        `Código postal_Hogar_Trabajo` == "45185" ~ "42000",  # En mineral de la reforma pero el codigo no aparece 42186
        `Código postal_Hogar_Trabajo` == "54763" ~ "42855",  # Segun google
        `Código postal_Hogar_Trabajo` == "46160" ~ "42160",  # Seguramente error de dedo
        `Código postal_Hogar_Trabajo` == "55755" ~ "43802",  # Duda de tizayuca, pero eso salio en una pagina
        TRUE ~ `Código postal_Hogar_Trabajo`
     )
   )


library(leaflet)
leaflet() |> 
  addTiles() |> 
  addPolygons(data = codigos |>  sf::st_transform(crs = 4326), popup = codigos$d_cp)

a = codigo_hogar$`Código postal_Hogar_Trabajo` |>  unique() |>  data.frame()
names(a) = "codigo"
a = a |> 
  dplyr::filter(as.numeric(codigo)>43998)
