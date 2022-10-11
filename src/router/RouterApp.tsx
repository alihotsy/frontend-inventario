import { Container } from "@mui/material"
import { FC } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { EstadoEquipoPage } from "../estado-equipo/pages/EstadoEquipoPage"
import { InventarioPage } from "../inventario/pages/InventarioPage"
import { UpdateItem } from "../inventario/pages/UpdateItem"
import { MarcasPage } from "../marcas/pages/MarcasPage"
import { Navbar } from "../shared/Navbar"
import { TipoEquipoPage } from "../tipo-equipo/pages/TipoEquipoPage"
import { UsuariosPage } from "../usuarios/pages/UsuariosPage"


export const RouterApp = ():JSX.Element => {
  return (
    <BrowserRouter>
      <Navbar/>
      <Container>
        <Routes>
            <Route path="/" element={<InventarioPage/>}/>
            <Route path="/usuarios" element={<UsuariosPage/>}/>
            <Route path="/marcas" element={<MarcasPage/>}/>
            <Route path="/estados" element={<EstadoEquipoPage/>}/>
            <Route path="/tipos" element={<TipoEquipoPage/>}/>
            <Route path="/update/:id" element={<UpdateItem/>}/>
            <Route path="/create" element={<UpdateItem/>}/>
            <Route path="*" element={<InventarioPage/>}/>
        </Routes>

      </Container>
    </BrowserRouter>
  )
}
