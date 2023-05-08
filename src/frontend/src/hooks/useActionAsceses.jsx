export function useActionAsceses(ascesData, setAscesData) {
  const deleteAscesa = ascesa_id => {
    setAscesData(ascesData.filter(ascesa => ascesa.id !== ascesa_id));
  };
  const completeAscesa = new_ascesa => {
    let newData = [...ascesData];
    newData[newData.map(item => item.id).indexOf(new_ascesa.id)] = new_ascesa;
    setAscesData(newData);
  };
  return [completeAscesa, deleteAscesa];
}
