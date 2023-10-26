import LearnMoreAbout from "@components/LearnMoreAbout/LearnMoreAbout";
import PageHandler from "@components/PageDisplay/PageHandler";
import SearchBar from "@components/SearchBar/SearchBar";

export default function Membros() {
  return (
    <>
      <div className="flex justify-between items-center py-4 px-6">
        <h1 className="text-2xl font-bold">Área de Membros</h1>
      </div>
      <div className="bg-white">
        <div className="flex justify-start py-2 px-6">
          <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded mr-2">
            Cursos
          </button>
          <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-2 px-4 rounded mr-2">
            Escolas
          </button>
        </div>
        <div className="flex justify-between items-center py-4 px-6 bg-gray-100">
          <SearchBar />
        </div>

        <div className="border-t-2 border-gray-200"></div>
      </div>
      <LearnMoreAbout
        normalText="Aprenda mais sobre a "
        underlinedText="área de membros"
      />
    </>
  );
}
