import MultiDropdown, { Option } from "@components/MultiDropdown";

const Filter = ({
  filter,
  setFilter,
}: {
  filter: Option[];
  setFilter: (options: Option[]) => void;
}) => {
  const types: Option[] = [
    { key: "main course", value: "main course" },
    { key: "side dish", value: "side dish" },
    { key: "appetizer", value: "appetizer" },
    { key: "dessert", value: "dessert" },
    { key: "salad", value: "salad" },
    { key: "bread", value: "bread" },
    { key: "breakfast", value: "breakfast" },
    { key: "soup", value: "soup" },
    { key: "beverage", value: "beverage" },
    { key: "sauce", value: "sauce" },
    { key: "marinade", value: "marinade" },
    { key: "fingerfood", value: "fingerfood" },
    { key: "snack", value: "snack" },
    { key: "drink", value: "drink" },
  ];

  return (
    <MultiDropdown
      options={types}
      value={filter}
      onChange={setFilter}
      pluralizeOptions={(values: Option[]) =>
        values.length === 0 ? "Выберите тип" : `Выбрано: ${values.length}`
      }
    />
  );
};

export default Filter;
