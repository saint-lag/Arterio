
interface Category {
  name: string;
  subcategories: string[];
}

export const categories: Category[] = [
  {
    name: "Organização e Fixação",
    subcategories: ["Abraçadeiras Nylon", "Velcro", "Acessórios"],
  },
  {
    name: "Fitas Adesivas",
    subcategories: ["Gaffer & Photo", "Crepe & Artística", "Demarcação", "Técnicas", "Dupla Face", "Embalagem", "Saúde"],
  },
  {
    name: "Elétrica e Conectores",
    subcategories: ["Plugs e Adaptadores", "Bocais", "Conectores BNC", "Filtros de Linha"],
  },
  {
    name: "Pilhas e Baterias",
    subcategories: ["AA", "AAA", "9V", "CR2032"],
  },
  {
    name: "Químicos e Sprays",
    subcategories: ["Limpeza", "Manutenção", "Efeitos Especiais"],
  },
  {
    name: "Papelaria",
    subcategories: ["Escrita", "Marcadores", "Corte e Grampo", "Diversos"],
  },
  {
    name: "Higiene e Proteção",
    subcategories: ["Higiene Pessoal", "Proteção Solar", "Outros"],
  },
  {
    name: "Ferramentas e Set",
    subcategories: ["Garras e Travas", "Infraestrutura", "Câmera/Lente", "Organização"],
  },
];

