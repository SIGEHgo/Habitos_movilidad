datos = readxl::read_excel("Datos/Encuesta sobre hábitos de movilidad de personas servidoras públicas del Gobierno del estado de Hidalgo (respuestas).xlsx")


names(datos) = names(datos) |>  gsub(pattern = "_Trabajo", replacement = "_Trabajo_Hogar")
names(datos) = names(datos) |>  gsub(pattern = " _Trabajo", replacement = "_Trabajo_Hogar")

names(datos) = names(datos) |>  gsub(pattern = "_Origen", replacement = "_Hogar_Trabajo")
names(datos) = names(datos) |>  gsub(pattern = " _Origen", replacement = "_Hogar_Trabajo")

names(datos) = names(datos) |>  stringr::str_squish()


datos = datos[-c(1:11),]

datos = datos |> 
  dplyr::select(`Marca temporal`:`Situación laboral`,`¿Usted presenta alguna discapacidad?`,
                Colonia_Hogar_Trabajo, `Código postal_Hogar_Trabajo`, Municipio_Hogar_Trabajo, Colonia_Trabajo_Hogar, `Código Postal_Trabajo_Hogar`, Municipio_Trabajo_Hogar,
                `¿Con qué frecuencia realiza este viaje?_Hogar_Trabajo`,`¿Cuál es el horario típico de su primer viaje?`, 
                `¿Cuál es el tiempo de traslado que realiza a su lugar de trabajo?_Hogar_Trabajo`, `Antes de llegar a su trabajo, ¿Realiza un viaje intermedio?_Hogar_Trabajo`, `¿Cuántos viajes intermedios realiza antes de llegar a su destino final?_Hogar_Trabajo`,
                `¿Qué medio de transporte utiliza para llegar a su lugar de trabajo?_Hogar_Trabajo`, `¿Cómo calificaría la accesibilidad al transporte público desde su domicilio particular?_Hogar_Trabajo`, `¿Cómo calificaría la calidad del transporte público que utiliza?_Hogar_Trabajo`,
                `De 1 al 7, en donde 7 es menos probable y 1 es más probable. ¿Qué alternativas de transporte elegiría para realizar el viaje hacia su lugar de trabajo? (Deberá elegir una opción diferente en cada columna) [Vehículo particular]_Hogar_Trabajo`,
                `De 1 al 7, en donde 7 es menos probable y 1 es más probable. ¿Qué alternativas de transporte elegiría para realizar el viaje hacia su lugar de trabajo? (Deberá elegir una opción diferente en cada columna) [Auto compartido]_Hogar_Trabajo`,
                `De 1 al 7, en donde 7 es menos probable y 1 es más probable. ¿Qué alternativas de transporte elegiría para realizar el viaje hacia su lugar de trabajo? (Deberá elegir una opción diferente en cada columna) [Transporte público colectivo (micro, urvan, combi)]_Hogar_Trabajo`,
                `De 1 al 7, en donde 7 es menos probable y 1 es más probable. ¿Qué alternativas de transporte elegiría para realizar el viaje hacia su lugar de trabajo? (Deberá elegir una opción diferente en cada columna) [Tuzobús]_Hogar_Trabajo`,
                `De 1 al 7, en donde 7 es menos probable y 1 es más probable. ¿Qué alternativas de transporte elegiría para realizar el viaje hacia su lugar de trabajo? (Deberá elegir una opción diferente en cada columna) [Taxi]_Hogar_Trabajo`,
                `De 1 al 7, en donde 7 es menos probable y 1 es más probable. ¿Qué alternativas de transporte elegiría para realizar el viaje hacia su lugar de trabajo? (Deberá elegir una opción diferente en cada columna) [Bicicleta]_Hogar_Trabajo`,
                `De 1 al 7, en donde 7 es menos probable y 1 es más probable. ¿Qué alternativas de transporte elegiría para realizar el viaje hacia su lugar de trabajo? (Deberá elegir una opción diferente en cada columna) [A pie]_Hogar_Trabajo`,
                `¿Utiliza diferentes medios de transporte para llegar a su lugar de trabajo?`,
                `¿Qué otros medios de transporte utiliza para llegar a su lugar de trabajo?`,
                
                `Comúnmente, ¿En qué horario realiza el viaje de regreso a su domicilio particular?_Trabajo_Hogar`,
                #`¿Qué otra opción de transporte ha considerado para realizar el viaje de regreso a su domicilio particular?`,
                `¿Cuál es el tiempo de traslado que realiza a su domicilio particular?_Trabajo_Hogar`,
                `Antes de llegar a su destino final: ¿Realiza un viaje intermedio?...53`,
                `Antes de llegar a su destino final: ¿Realiza un viaje intermedio?...90`,
                `¿Cuántos viajes intermedios realiza antes de llegar a su domicilio?`,
                `¿ Qué medios de transporte utiliza para llegar a su domicilio particular?`,
                `¿Cómo calificaría la accesibilidad al transporte público desde su lugar de trabajo?`,
                `¿Cómo calificaría la calidad del transporte público que utiliza?`,
                `De 1 al 7, en donde 7 es menos probable y 1 es más probable. ¿Qué alternativas de transporte elegiría para realizar el viaje hacia su domicilio particular? (Deberá elegir una opción diferente en cada columna) [Vehículo particular]_Trabajo_Hogar`,
                `De 1 al 7, en donde 7 es menos probable y 1 es más probable. ¿Qué alternativas de transporte elegiría para realizar el viaje hacia su domicilio particular? (Deberá elegir una opción diferente en cada columna) [Transporte público colectivo (micro, Urvan, combi)]_Trabajo_Hogar`,
                `De 1 al 7, en donde 7 es menos probable y 1 es más probable. ¿Qué alternativas de transporte elegiría para realizar el viaje hacia su domicilio particular? (Deberá elegir una opción diferente en cada columna) [Tuzobús]_Trabajo_Hogar`,
                `De 1 al 7, en donde 7 es menos probable y 1 es más probable. ¿Qué alternativas de transporte elegiría para realizar el viaje hacia su domicilio particular? (Deberá elegir una opción diferente en cada columna) [Taxi]_Trabajo_Hogar`,
                `De 1 al 7, en donde 7 es menos probable y 1 es más probable. ¿Qué alternativas de transporte elegiría para realizar el viaje hacia su domicilio particular? (Deberá elegir una opción diferente en cada columna) [Bicicleta]_Trabajo_Hogar`,
                `De 1 al 7, en donde 7 es menos probable y 1 es más probable. ¿Qué alternativas de transporte elegiría para realizar el viaje hacia su domicilio particular? (Deberá elegir una opción diferente en cada columna) [Taxi]_Trabajo_Hogar`,
                `De 1 al 7, en donde 7 es menos probable y 1 es más probable. ¿Qué alternativas de transporte elegiría para realizar el viaje hacia su domicilio particular? (Deberá elegir una opción diferente en cada columna) [Auto compartido]_Trabajo_Hogar`,
                `¿Utiliza diferentes medios de transporte para llegar a su domicilio particular?_Trabajo_Hogar...79`,
                `¿ Qué otro medio de transporte utiliza para llegar a su domicilio particular?_Trabajo_Hogar`,
                `Normalmente, ¿Cuánto gasta mensualmente en transporte?`
  )


datos = datos |> 
  dplyr::mutate(colonias_hogar_trabajo_limpias = Colonia_Hogar_Trabajo |>  stringi::stri_trans_general("Latin-ASCII") |>  tolower() |> 
                                 gsub(pattern = "  ", replacement = " ") |> stringr::str_squish() |> 
                                 gsub(pattern = "fracc\\.", replacement = "fraccionamiento")  |> gsub(pattern = "fracc ", replacement = "fraccionamiento ") |>
                                 gsub(pattern = "frac\\.", replacement = "fraccionamiento") |>  gsub(pattern = "fracc:", replacement = "fraccionamiento") |> 
                                 gsub(pattern = "col\\.", replacement = "colonia")  |> gsub(pattern = "col ", replacement = "colonia ") |> 
                                 gsub(pattern = "loc\\.", replacement = "localidad") |>  gsub(pattern = "loc ", replacement = "localidad ") |> 
                                 gsub(pattern = "priv\\.", replacement = "privada") |>  gsub(pattern = "priv ", replacement = "privada ")) |> 
  dplyr::mutate(
    colonias_hogar_trabajo_limpias = dplyr::case_when(
      colonias_hogar_trabajo_limpias == "ampliacion sta julia" ~ "ampliacion santa julia",
      colonias_hogar_trabajo_limpias == "campestre v. alamo" ~ "campestre villas del alamo",
      colonias_hogar_trabajo_limpias == "carlos robirosa" ~ "carlos rovirosa",
      colonias_hogar_trabajo_limpias == "chacarria" ~ "chavarria",
      colonias_hogar_trabajo_limpias == "el lano segunda seccion" ~ "el llano segunda seccion",
      colonias_hogar_trabajo_limpias == "el pammar" ~ "el palmar",
      colonias_hogar_trabajo_limpias == "ell tezontle" ~ "el tezontle",
      colonias_hogar_trabajo_limpias == "felipe angekes" ~ "felipe angeles",
      colonias_hogar_trabajo_limpias == "fraccionamiento campestre villas del alamo" ~ "fraccionamiento campestre, villas del alamo",
      colonias_hogar_trabajo_limpias == "fraccionamiento la providencia siglo xxi" ~ "fraccionamiento la providencia, siglo xxi",
      colonias_hogar_trabajo_limpias == "fraccionamiento paseo de las reinas v" ~ "fraccionamiento paseo de las reynas v seccion",
      colonias_hogar_trabajo_limpias == "fraccionamiento pirarantos" ~ "fraccionamiento piracantos",
      colonias_hogar_trabajo_limpias == "fraccionamiento san luis 2" ~ "fraccionamiento san luis ii",
      colonias_hogar_trabajo_limpias == "fraccionamiento san luis ll" ~ "fraccionamiento san luis ii",
      colonias_hogar_trabajo_limpias == "fraccionamiento sta matilde" ~ "fraccionamiento santa matilde",
      colonias_hogar_trabajo_limpias == "francisco i. madero" ~ "francisco i madero",
      colonias_hogar_trabajo_limpias == "haciendas de hidaldo" ~ "haciendas de hidalgo",
      colonias_hogar_trabajo_limpias == "hdas. de hidalgo blvd. santa catarina" ~ "haciendas de hidalgo blvd. santa catarina",
      colonias_hogar_trabajo_limpias == "isste" ~ "issste",
      colonias_hogar_trabajo_limpias == "juan c doria" ~ "juan c, doria",
      colonias_hogar_trabajo_limpias == "juan c. doria" ~ "juan c, doria",
      colonias_hogar_trabajo_limpias == "ls palmitas" ~ "las palmitas",
      colonias_hogar_trabajo_limpias == "mineral del monte hidalgo" ~ "mineral del monte",
      colonias_hogar_trabajo_limpias == "nueva francisco i. madero" ~ "nueva francisco i madero",
      colonias_hogar_trabajo_limpias == "nva. fco. i. madero" ~ "nueva francisco i madero",
      colonias_hogar_trabajo_limpias == "pachuca, hidalgo" ~ "pachuca",
      colonias_hogar_trabajo_limpias == "parque de poblamieto" ~ "parque de poblamiento",
      colonias_hogar_trabajo_limpias == "parque del poblamiento" ~ "parque de poblamiento",
      colonias_hogar_trabajo_limpias == "paseos de chavarriz" ~ "paseos de chavarria",
      colonias_hogar_trabajo_limpias == "paseos de chavrria" ~ "paseos de chavarria",
      colonias_hogar_trabajo_limpias == "pasesos de la plata" ~ "paseos de la plata",
      colonias_hogar_trabajo_limpias == "peridistas" ~ "periodistas",
      colonias_hogar_trabajo_limpias == "periodista" ~ "periodistas",
      colonias_hogar_trabajo_limpias == "piracantos 4 seccion" ~ "piracantos iv seccion",
      colonias_hogar_trabajo_limpias == "plutarco" ~ "plutarco elias calles",
      colonias_hogar_trabajo_limpias == "plutarco e. calles" ~ "plutarco elias calles",
      colonias_hogar_trabajo_limpias == "plutarco elias" ~ "plutarco elias calles",
      colonias_hogar_trabajo_limpias == "pri - chacon" ~ "pri-chacon",
      colonias_hogar_trabajo_limpias == "pri chacon" ~ "pri-chacon",
      colonias_hogar_trabajo_limpias == "prvdenc" ~ "providencia",
      colonias_hogar_trabajo_limpias == "san antonio el desmonto" ~ "san antonio el desmonte",
      colonias_hogar_trabajo_limpias == "san cristobal la providencia" ~ "san cristobal, la providencia",
      colonias_hogar_trabajo_limpias == "san cristobal, la providencia, mineral de la reforma" ~ "san cristobal, la providencia",
      colonias_hogar_trabajo_limpias == "san juan tilcuatla" ~ "san juan tilcuautla",
      colonias_hogar_trabajo_limpias == "san pedro nopalcalco" ~ "san pedro nopancalco",
      colonias_hogar_trabajo_limpias == "tercera demarcaion" ~ "tercera demarcacion",
      colonias_hogar_trabajo_limpias == "tulipantes" ~ "tulipanes",
      colonias_hogar_trabajo_limpias == "zempoala, centro" ~ "zempoala",
      TRUE ~ colonias_hogar_trabajo_limpias
    )
  ) |>  
  dplyr::relocate(colonias_hogar_trabajo_limpias, .after = Colonia_Hogar_Trabajo)

### Edad
datos = datos |> 
  dplyr::mutate(Edad = Edad |> substr(start = 1, stop = 2) |>  as.numeric())

datos = datos |> 
  dplyr::mutate(`¿Cuál es el horario típico de su primer viaje?_Homologado` = `¿Cuál es el horario típico de su primer viaje?` |>  substr(start = 1, stop = 4) |> stringr::str_squish()) |>
  dplyr::relocate(`¿Cuál es el horario típico de su primer viaje?_Homologado`, .after = `¿Cuál es el horario típico de su primer viaje?`)


datos = datos |> dplyr::mutate(
  `¿Cuál es el horario típico de su primer viaje?_Homologado` = dplyr::case_when(
    `¿Cuál es el horario típico de su primer viaje?_Homologado` %in% c("04:3","4:30","5:00", "5:45", "06:0", "6.30", "6:00", "6:15", "6:20", "6:25", "6:30", "6:35", "6:45") ~ "06:00 - 07:00 am",
    `¿Cuál es el horario típico de su primer viaje?_Homologado` %in% c("07:0", "07:3", "7 al", "7:00", "7:15", "7:20", "7:30", "7:35", "7:40", "7:45", "7:50", "7am", "de 7") ~ "07:00 - 08:00 am",
    `¿Cuál es el horario típico de su primer viaje?_Homologado` %in% c("08:0", "08:3", "8 a", "8:00", "8:15", "8:20", "8:25", "8:30", "8:40", "8:45") ~ "08:00 - 09:00 am",
    `¿Cuál es el horario típico de su primer viaje?_Homologado` %in% c("9 am", "9:30", "9:45") ~ "09:00 - 10:00 am",
    `¿Cuál es el horario típico de su primer viaje?_Homologado` %in% c("3:00", "De 6", "17:0", "15:0", "16:0", "3:30", "3.30", "De 1", "13:0", "15.0", "3:45", "De 3", "11:0", "12:0", "19:3", "2:30") ~ "Otro",
    TRUE ~ `¿Cuál es el horario típico de su primer viaje?_Homologado`
  )
)

datos = datos |> 
  dplyr::mutate(
    Edad_Clasificacion = dplyr::case_when(
      Edad >= 20 & Edad <= 30 ~ "20-30 años",
      Edad > 30 & Edad < 60 ~ "31-59 años",
      Edad >= 60 ~ "60 y más"
    )
  ) |> 
  dplyr::relocate(Edad_Clasificacion, .after = Edad)


datos = datos |>  dplyr::mutate(
  `¿Qué medio de transporte utiliza para llegar a su lugar de trabajo?_Hogar_Trabajo_limpio` = `¿Qué medio de transporte utiliza para llegar a su lugar de trabajo?_Hogar_Trabajo` |>  stringi::stri_trans_general("Latin-ASCII") |>  tolower() |>  gsub(pattern = "  ", replacement = " ") |> stringr::str_squish()
)


datos = datos |>  dplyr::mutate(
  `¿Qué medio de transporte utiliza para llegar a su lugar de trabajo?_Hogar_Trabajo_limpio` = dplyr::case_when(
    `¿Qué medio de transporte utiliza para llegar a su lugar de trabajo?_Hogar_Trabajo_limpio` == "1ro a pie, 2do y 3ro en combi" ~ "transporte publico colectivo (micro, urvan, combi)",
    `¿Qué medio de transporte utiliza para llegar a su lugar de trabajo?_Hogar_Trabajo_limpio` == "autobus y combi" ~ "transporte publico colectivo (micro, urvan, combi)",
    `¿Qué medio de transporte utiliza para llegar a su lugar de trabajo?_Hogar_Trabajo_limpio` == "tuzobus, alimentadora y combi" ~ "transporte publico colectivo (micro, urvan, combi)",
    `¿Qué medio de transporte utiliza para llegar a su lugar de trabajo?_Hogar_Trabajo_limpio` == "tuzobus y combi" ~ "transporte publico colectivo (micro, urvan, combi)",
    `¿Qué medio de transporte utiliza para llegar a su lugar de trabajo?_Hogar_Trabajo_limpio` == "autobus" ~ "transporte publico colectivo (micro, urvan, combi)",
    `¿Qué medio de transporte utiliza para llegar a su lugar de trabajo?_Hogar_Trabajo_limpio` == "combi, tuzobus y aveces vehiculo particular" ~ "transporte publico colectivo (micro, urvan, combi)",
    `¿Qué medio de transporte utiliza para llegar a su lugar de trabajo?_Hogar_Trabajo_limpio` == "puede ser vehiculo, taxi o transporte publico" ~ "transporte publico colectivo (micro, urvan, combi)",
    `¿Qué medio de transporte utiliza para llegar a su lugar de trabajo?_Hogar_Trabajo_limpio` == "transporte publico colectivo, masivo, individual, vehiculo particular" ~ "transporte publico colectivo (micro, urvan, combi)",
    `¿Qué medio de transporte utiliza para llegar a su lugar de trabajo?_Hogar_Trabajo_limpio` == "vehiculo y transporte publico" ~ "transporte publico colectivo (micro, urvan, combi)",
    `¿Qué medio de transporte utiliza para llegar a su lugar de trabajo?_Hogar_Trabajo_limpio` == "camion foraneo" ~ "transporte publico colectivo (micro, urvan, combi)",
    `¿Qué medio de transporte utiliza para llegar a su lugar de trabajo?_Hogar_Trabajo_limpio` == "micro, camion y tuzobuz" ~ "transporte publico colectivo (micro, urvan, combi)",
    `¿Qué medio de transporte utiliza para llegar a su lugar de trabajo?_Hogar_Trabajo_limpio` == "camion foraneo" ~ "transporte publico colectivo (micro, urvan, combi)",
    `¿Qué medio de transporte utiliza para llegar a su lugar de trabajo?_Hogar_Trabajo_limpio` == "hago uso de doble transporte, transporte publico y tuzobus" ~ "transporte publico colectivo (micro, urvan, combi)",
    `¿Qué medio de transporte utiliza para llegar a su lugar de trabajo?_Hogar_Trabajo_limpio` == "transporte foraneo" ~ "transporte publico colectivo (micro, urvan, combi)",
    `¿Qué medio de transporte utiliza para llegar a su lugar de trabajo?_Hogar_Trabajo_limpio` == "micro, camion y tuzobuz" ~ "transporte publico colectivo (micro, urvan, combi)",
    `¿Qué medio de transporte utiliza para llegar a su lugar de trabajo?_Hogar_Trabajo_limpio` == "urvan y tuzobus" ~ "transporte publico colectivo (micro, urvan, combi)",
    `¿Qué medio de transporte utiliza para llegar a su lugar de trabajo?_Hogar_Trabajo_limpio` == "autobus y tuzobus" ~ "transporte publico colectivo (micro, urvan, combi)",
    `¿Qué medio de transporte utiliza para llegar a su lugar de trabajo?_Hogar_Trabajo_limpio` == "colectivo, tuzobus, pie o alimentadora" ~ "transporte publico colectivo (micro, urvan, combi)",
    `¿Qué medio de transporte utiliza para llegar a su lugar de trabajo?_Hogar_Trabajo_limpio` == "autobus o vehiculo particular" ~ "transporte publico colectivo (micro, urvan, combi)",
    `¿Qué medio de transporte utiliza para llegar a su lugar de trabajo?_Hogar_Trabajo_limpio` == "transporte publico y tuzobus" ~ "transporte publico colectivo (micro, urvan, combi)",
    `¿Qué medio de transporte utiliza para llegar a su lugar de trabajo?_Hogar_Trabajo_limpio` == "colectivo y tuzobus" ~ "transporte publico colectivo (micro, urvan, combi)",
    `¿Qué medio de transporte utiliza para llegar a su lugar de trabajo?_Hogar_Trabajo_limpio` == "colectivo, tuzobus, pie o alimentadora" ~ "transporte publico colectivo (micro, urvan, combi)",
    
    
    `¿Qué medio de transporte utiliza para llegar a su lugar de trabajo?_Hogar_Trabajo_limpio` == "auto particular, o transporte publico" ~ "vehiculo particular",
    `¿Qué medio de transporte utiliza para llegar a su lugar de trabajo?_Hogar_Trabajo_limpio` == "vehiculo particular" ~ "vehiculo particular",
    `¿Qué medio de transporte utiliza para llegar a su lugar de trabajo?_Hogar_Trabajo_limpio` == "vehiculo de familiar" ~ "vehiculo particular",
    `¿Qué medio de transporte utiliza para llegar a su lugar de trabajo?_Hogar_Trabajo_limpio` == "auto particular, o transporte publico" ~ "vehiculo particular",
    `¿Qué medio de transporte utiliza para llegar a su lugar de trabajo?_Hogar_Trabajo_limpio` == "auto,motocicleta,taxi" ~ "vehiculo particular",
    `¿Qué medio de transporte utiliza para llegar a su lugar de trabajo?_Hogar_Trabajo_limpio` == "moto" ~ "vehiculo particular",
    `¿Qué medio de transporte utiliza para llegar a su lugar de trabajo?_Hogar_Trabajo_limpio` == "motocicleta" ~ "vehiculo particular",
    `¿Qué medio de transporte utiliza para llegar a su lugar de trabajo?_Hogar_Trabajo_limpio` == "motoneta" ~ "vehiculo particular",
    `¿Qué medio de transporte utiliza para llegar a su lugar de trabajo?_Hogar_Trabajo_limpio` == "por lo menos 2 veces pos semana en particular" ~ "vehiculo particular",
    `¿Qué medio de transporte utiliza para llegar a su lugar de trabajo?_Hogar_Trabajo_limpio` == "vehiculo particular y transporte publico colectivo (combi)" ~ "vehiculo particular",
    `¿Qué medio de transporte utiliza para llegar a su lugar de trabajo?_Hogar_Trabajo_limpio` == "puede ser carro particular o transporte" ~ "vehiculo particular",
    `¿Qué medio de transporte utiliza para llegar a su lugar de trabajo?_Hogar_Trabajo_limpio` == "puede ser carro particular o transporte" ~ "vehiculo particular",
    `¿Qué medio de transporte utiliza para llegar a su lugar de trabajo?_Hogar_Trabajo_limpio` == "vehiculo particular y camion de pasajeros, tuzo bus" ~ "vehiculo particular",
    
    
    `¿Qué medio de transporte utiliza para llegar a su lugar de trabajo?_Hogar_Trabajo_limpio` == "tuzobus y transporte publico debo tomar minimo 2 transportes" ~ "tuzobus",
    `¿Qué medio de transporte utiliza para llegar a su lugar de trabajo?_Hogar_Trabajo_limpio` == "tuzobus y vehiculo" ~ "tuzobus",
    `¿Qué medio de transporte utiliza para llegar a su lugar de trabajo?_Hogar_Trabajo_limpio` == "tuzobus y micro" ~ "tuzobus",
    `¿Qué medio de transporte utiliza para llegar a su lugar de trabajo?_Hogar_Trabajo_limpio` == "y tuzobus (ruta alimentadora)" ~ "tuzobus",
    `¿Qué medio de transporte utiliza para llegar a su lugar de trabajo?_Hogar_Trabajo_limpio` == "tuzobus y colectivo" ~ "tuzobus",
    `¿Qué medio de transporte utiliza para llegar a su lugar de trabajo?_Hogar_Trabajo_limpio` == "tuzobus y vehiculo particular" ~ "tuzobus",
    
    
    `¿Qué medio de transporte utiliza para llegar a su lugar de trabajo?_Hogar_Trabajo_limpio` == "en vehiculo particular compartiendo el auto y a veces a pie" ~ "auto compartido",
    `¿Qué medio de transporte utiliza para llegar a su lugar de trabajo?_Hogar_Trabajo_limpio` == "previo al viaje en auto compartido, caminata por aprox. 35 minutos y/o viaje en transporte publico colectivo (combi)" ~ "auto compartido",
    
    `¿Qué medio de transporte utiliza para llegar a su lugar de trabajo?_Hogar_Trabajo_limpio` == "scooter manual y transporte publico colectivo" ~ "otros",
    `¿Qué medio de transporte utiliza para llegar a su lugar de trabajo?_Hogar_Trabajo_limpio` == "vehiculo oficial" ~ "otros",
    

    TRUE ~ `¿Qué medio de transporte utiliza para llegar a su lugar de trabajo?_Hogar_Trabajo_limpio`
  )
)


datos = datos |> 
  dplyr::mutate(
    `¿Cómo calificaría la accesibilidad al transporte público desde su domicilio particular?_Hogar_Trabajo` = dplyr::if_else(
      condition = is.na(`¿Cómo calificaría la accesibilidad al transporte público desde su domicilio particular?_Hogar_Trabajo`),
      true = "Sin dato",
      false = `¿Cómo calificaría la accesibilidad al transporte público desde su domicilio particular?_Hogar_Trabajo`
    )
  )


datos = datos |>  
  dplyr::mutate(
    `¿Cómo calificaría la accesibilidad al transporte público desde su lugar de trabajo?` = dplyr::if_else(
      condition = is.na(`¿Cómo calificaría la accesibilidad al transporte público desde su lugar de trabajo?`),
      true = "Sin dato",
      false = `¿Cómo calificaría la accesibilidad al transporte público desde su lugar de trabajo?`
    )
  )
  
datos = datos |> 
  dplyr::mutate(
    `¿Cómo calificaría la calidad del transporte público que utiliza?` = dplyr::if_else(
      condition = is.na(`¿Cómo calificaría la calidad del transporte público que utiliza?`),
      true = "Sin dato",
      false = `¿Cómo calificaría la calidad del transporte público que utiliza?`
    )
  )

datos = datos |> 
  dplyr::mutate(
    `¿Cuántos viajes intermedios realiza antes de llegar a su destino final?_Hogar_Trabajo` = dplyr::if_else(
      condition = is.na(`¿Cuántos viajes intermedios realiza antes de llegar a su destino final?_Hogar_Trabajo`),
      true = "0",
      false = `¿Cuántos viajes intermedios realiza antes de llegar a su destino final?_Hogar_Trabajo`
    )
  )

datos = datos |> 
  dplyr::mutate(
    `¿Con qué frecuencia realiza este viaje?_Hogar_Trabajo` = dplyr::case_when(
      `¿Con qué frecuencia realiza este viaje?_Hogar_Trabajo` == "Más de 5 veces a la semana" ~ "Más de 5 veces a la semana",
      `¿Con qué frecuencia realiza este viaje?_Hogar_Trabajo` == "5 veces a la semana" ~ "5 veces a la semana",
      `¿Con qué frecuencia realiza este viaje?_Hogar_Trabajo` == "4 veces a la semana" ~ "4 veces a la semana o menos",
      `¿Con qué frecuencia realiza este viaje?_Hogar_Trabajo` == "3 veces a la semana" ~ "4 veces a la semana o menos",
      `¿Con qué frecuencia realiza este viaje?_Hogar_Trabajo` == "2 veces a la semana" ~ "4 veces a la semana o menos",
      `¿Con qué frecuencia realiza este viaje?_Hogar_Trabajo` == "1 vez a la semana" ~ "4 veces a la semana o menos",
      TRUE ~ `¿Con qué frecuencia realiza este viaje?_Hogar_Trabajo`
    )
  )


write.csv(datos, "Output/base_ver2.csv", row.names = F, fileEncoding = "latin1")
writexl::write_xlsx(datos, "Output/base_ver2.xlsx")

datos$Edad_Clasificacion |>  table()
datos$Genero |>  table()
datos$Dependencia |>  table()
datos$`¿Usted presenta alguna discapacidad?` |>  table()
datos$`¿Cuál es el horario típico de su primer viaje?_Homologado` |>  table()
datos$`¿Con qué frecuencia realiza este viaje?_Hogar_Trabajo` |>  table()
datos$`¿Cómo calificaría la accesibilidad al transporte público desde su domicilio particular?_Hogar_Trabajo` |>  unique()
datos$`¿ Qué medios de transporte utiliza para llegar a su domicilio particular?` |>  unique()
datos$`Comúnmente, ¿En qué horario realiza el viaje de regreso a su domicilio particular?_Trabajo_Hogar` |>  unique()
datos$`¿Cuál es el tiempo de traslado que realiza a su domicilio particular?_Trabajo_Hogar` |>  unique()
datos$`¿Cómo calificaría la accesibilidad al transporte público desde su lugar de trabajo?` |>  unique()
datos$`¿Cómo calificaría la calidad del transporte público que utiliza?` |>  unique()
datos$`¿ Qué otro medio de transporte utiliza para llegar a su domicilio particular?_Trabajo_Hogar` |>  unique()  # Pendiente
datos$`Normalmente, ¿Cuánto gasta mensualmente en transporte?` |>  unique()
datos$`¿Cuántos viajes intermedios realiza antes de llegar a su destino final?_Hogar_Trabajo` |>  unique()

conteo = datos |> 
  dplyr::group_by(`¿Qué medio de transporte utiliza para llegar a su lugar de trabajo?_Hogar_Trabajo_limpio`) |> 
  dplyr::summarise(conteo = dplyr::n())
names(conteo)[1] = "variable"
conteo[grep(x = conteo$variable, pattern = "moto", ignore.case = T), ]$variable


datos$`De 1 al 7, en donde 7 es menos probable y 1 es más probable. ¿Qué alternativas de transporte elegiría para realizar el viaje hacia su lugar de trabajo? (Deberá elegir una opción diferente en cada columna) [Vehículo particular]_Hogar_Trabajo` |>  unique()

automovil = datos |>  
  dplyr::select(`De 1 al 7, en donde 7 es menos probable y 1 es más probable. ¿Qué alternativas de transporte elegiría para realizar el viaje hacia su lugar de trabajo? (Deberá elegir una opción diferente en cada columna) [Vehículo particular]_Hogar_Trabajo`) |> 
  dplyr::filter(`De 1 al 7, en donde 7 es menos probable y 1 es más probable. ¿Qué alternativas de transporte elegiría para realizar el viaje hacia su lugar de trabajo? (Deberá elegir una opción diferente en cada columna) [Vehículo particular]_Hogar_Trabajo` %in% c("1","2","3","4","5","6","7"))


automovil$`De 1 al 7, en donde 7 es menos probable y 1 es más probable. ¿Qué alternativas de transporte elegiría para realizar el viaje hacia su lugar de trabajo? (Deberá elegir una opción diferente en cada columna) [Vehículo particular]_Hogar_Trabajo` |>  table()/(772+129+83+75+60+70+200 )
  
  
sum(automovil$`De 1 al 7, en donde 7 es menos probable y 1 es más probable. ¿Qué alternativas de transporte elegiría para realizar el viaje hacia su lugar de trabajo? (Deberá elegir una opción diferente en cada columna) [Vehículo particular]_Hogar_Trabajo` |>  as.numeric())
write.csv(datos, "Output/base_ver.csv", row.names = F, fileEncoding = "latin1")





orden = datos |> 
  dplyr::select(
    `Marca temporal`, `Dirección de correo electrónico`, Nombre,
    Edad, Edad_Clasificacion, Dependencia, `¿Usted presenta alguna discapacidad?`,
    `¿Cuál es el horario típico de su primer viaje?_Homologado`, 
    `¿Con qué frecuencia realiza este viaje?_Hogar_Trabajo`,
    `¿Cuál es el tiempo de traslado que realiza a su lugar de trabajo?_Hogar_Trabajo`,
    
    `¿Cómo calificaría la accesibilidad al transporte público desde su domicilio particular?_Hogar_Trabajo`,
    `¿ Qué medios de transporte utiliza para llegar a su domicilio particular?`,
    `Comúnmente, ¿En qué horario realiza el viaje de regreso a su domicilio particular?_Trabajo_Hogar`,
    `¿Cuál es el tiempo de traslado que realiza a su domicilio particular?_Trabajo_Hogar`,
    `¿Cómo calificaría la accesibilidad al transporte público desde su lugar de trabajo?`,
    
    `¿Cómo calificaría la calidad del transporte público que utiliza?`,
    `¿ Qué otro medio de transporte utiliza para llegar a su domicilio particular?_Trabajo_Hogar`,
    `Normalmente, ¿Cuánto gasta mensualmente en transporte?`,
    `¿Cuántos viajes intermedios realiza antes de llegar a su destino final?_Hogar_Trabajo`
  )


orden$`¿Con qué frecuencia realiza este viaje?_Hogar_Trabajo` |>  table()



codigos = datos |> 
  dplyr::group_by(`Código postal_Hogar_Trabajo`) |> 
  dplyr::summarise(conteo = dplyr::n())

codigos = codigos |>  dplyr::arrange(dplyr::desc(conteo))




writexl::write_xlsx(orden, "Output/datos_filtrados.xlsx")
