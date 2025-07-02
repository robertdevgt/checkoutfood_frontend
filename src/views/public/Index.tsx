import { Link } from "react-router-dom"
import ShowContentComponent from "@/components/public/ShowContentComponent"

export default function Index() {
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
            <div className="relative h-full w-full flex items-center px-10">
              <p className="text-white text-3xl md:text-4xl font-semibold leading-tight">
                Todos tus <span className="text-primary">restaurantes favoritos</span> en un solo lugar
              </p>
            </div>
          </div>
        </ShowContentComponent>

        <ShowContentComponent>
          <div className="relative h-72 overflow-hidden shadow-md bg-[url(/img/bg-2.jpg)] bg-cover bg-center">
            <div className="absolute inset-0 bg-black/70" />
            <div className="relative h-full w-full flex items-center justify-end px-10">
              <p className="text-white text-3xl md:text-4xl font-semibold leading-tight text-right">
                Tus antojos <span className="text-primary">a la puerta</span> de tu casa
              </p>
            </div>
          </div>
        </ShowContentComponent>

        <ShowContentComponent>
          <div className="relative h-72 overflow-hidden shadow-md bg-[url(/img/bg-3.jpg)] bg-cover bg-center">
            <div className="absolute inset-0 bg-black/70" />
            <div className="relative h-full w-full flex items-center justify-center px-10 text-center">
              <p className="text-white text-3xl md:text-4xl font-semibold leading-tight">
                ¡<span className="text-primary">Regístrate</span> y haz tu primer pedido!
              </p>
            </div>
          </div>
        </ShowContentComponent>
      </section>

      <section className="p-20">
        <div className="flex justify-center items-center h-full flex-col">
          <h1 className="font-bold text-4xl">Registrate</h1>
          <Link to={'/register'} className="mt-5 bg-blue-500 text-white p-5 rounded w-1/3 text-xl font-bold uppercase hover:bg-blue-600 transition-colors text-center">
            Crear Cuenta
          </Link>
        </div>
      </section>

    </div>
  )
}
