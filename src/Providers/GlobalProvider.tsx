  "use client";
  import { ProductsRevenueDetails } from "@data/productRevenue";
  import React, {
    PropsWithChildren,
    useEffect,
    useState,
  } from "react";
  import GlobalProviderContext from "../Context/GlobalContext";


  const GlobalProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [productRevenue, setProductRevenue] = useState<ProductsRevenueDetails>({
      aprovacaoPorcentagem: 0,
      reembolsoPorcentagem: 0,
      chargebackPorcentagem: 0,
      valorLiquido: 0,
      numVendas: 0,
      vendasClickCloneFy: 0,
      conversaoBoletoPorcentagem: 0,
      numBoletosGerados: 0,
      vendasClickCloneFyPorcentagem: 0,
    });

    useEffect(() => {
      console.log("teste");
    }, [])

    return (
      <GlobalProviderContext.Provider
        value={{ productRevenue, setProductRevenue }}
      >
        {children}
      </GlobalProviderContext.Provider>
    );
  };

  export default GlobalProvider;
