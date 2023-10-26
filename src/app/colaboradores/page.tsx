import LearnMoreAbout from "@components/LearnMoreAbout/LearnMoreAbout";

import SearchBar from "@components/SearchBar/SearchBar";

export default function Colaboradores() {
  return (
    <>
      <div className="flex justify-between items-center py-4 px-6">
        <h1 className="text-2xl font-bold">Colaboradores</h1>
      </div>
      <div className="bg-white">
        <div className="flex justify-between items-center py-4 px-6 bg-gray-100">
          <SearchBar />

          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Adicionar Colaborador
          </button>
        </div>
        <div className="border-t-2 border-gray-200"></div>
      </div>
      <LearnMoreAbout
        normalText="Aprenda mais sobre os "
        underlinedText="colaboradores"
      />
    </>
  );
}
