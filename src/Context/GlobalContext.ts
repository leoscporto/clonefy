"use client";
import { ProductsRevenueDetails } from "@data/productRevenue";
import { Dispatch, SetStateAction, createContext } from "react";

const GlobalProviderContext = createContext<{
  productRevenue: ProductsRevenueDetails;
  setProductRevenue: Dispatch<SetStateAction<ProductsRevenueDetails>>;
}>({
  productRevenue: {
    aprovacaoPorcentagem: 0,
    reembolsoPorcentagem: 0,
    chargebackPorcentagem: 0,
    valorLiquido: 0,
    numVendas: 0,
    vendasClickCloneFy: 0,
    conversaoBoletoPorcentagem: 0,
    numBoletosGerados: 0,
    vendasClickCloneFyPorcentagem: 0,
  },
  setProductRevenue: null!
});

export default GlobalProviderContext;
