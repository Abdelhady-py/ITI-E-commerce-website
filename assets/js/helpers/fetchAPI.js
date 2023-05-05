//get all data
export const getAllProducts = async (url) => {
  const response = await fetch(url);
  const data = await response.json();

  return data;
};

//get all categories

export const getAllCategories = async (url) => {
  const response = await fetch(url);
  const data = await response.json();

  return data;
};


