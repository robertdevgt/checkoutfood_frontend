import { Link } from "react-router-dom";
import { useAppStore } from "@/store";
import ShowContentComponent from "@/components/public/ShowContentComponent";

export default function Index() {

  const logedIn = useAppStore((state) => state.logedIn);

  return (
    <div className="h-full">
      <div className="h-96 bg-[url(/img/bg-index.jpg)] opacity-60">
        <div className="flex justify-center items-center h-full flex-col">
          <h1 className="font-bold text-4xl">Checkout Food</h1>
          <p className="text-xl">¡La comida que necesites, te la llevamos!</p>
        </div>
      </div>

      <section className="space-y-5 mt-10">
        <ShowContentComponent>
          <div className="relative h-72 overflow-hidden shadow-md bg-[url(/img/bg-1.jpg)] bg-cover bg-center">
            <div className="absolute inset-0 bg-black/70" />
            <div className="relative h-full w-full flex flex-col items-center justify-center px-10">
              {logedIn ? (
                <>
                  <p className="text-white text-3xl md:text-4xl font-semibold leading-tight">
                    ¿Tienes hambre? Busca tu restaurante favorito
                  </p>
                  <div className="flex justify-between gap-2">
                    <Link to={'/restaurants'} className="mt-5 bg-blue-500 text-white p-5 rounded text-xl font-bold uppercase hover:bg-blue-600 transition-colors text-center">
                      Descubrir restaurantes
                    </Link>
                  </div>
                </>
              ) : (
                <>
                  <p className="text-white text-3xl md:text-4xl font-semibold leading-tight">
                    Inicia Sesión o Registrate
                  </p>
                  <div className="flex justify-between gap-2">
                    <Link to={'/login'} className="mt-5 bg-blue-500 text-white p-5 rounded text-xl font-bold uppercase hover:bg-blue-600 transition-colors text-center">
                      Iniciar Sesión
                    </Link>
                    <Link to={'/register'} className="mt-5 bg-blue-500 text-white p-5 rounded text-xl font-bold uppercase hover:bg-blue-600 transition-colors text-center">
                      Crear Cuenta
                    </Link>
                  </div>
                </>
              )}

            </div>
          </div>
        </ShowContentComponent >
      </section >

    </div>
  )
}
