import { Routes, Route } from "react-router-dom";
import { Index } from '../Pages/Index';
import { Pokemon } from '../Pages/Pokemon';

export function RouteComp(){
    return (
        <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/pokemon/:id" element={<Pokemon />} />
        </Routes>
    );
}