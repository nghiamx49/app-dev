const CategoriesService = {
  getAllCategories: async () => {
    try {
      let response = await fetch(
        "http://tam-application/api/home/categories",
        {
          credentials: "include",
        }
      );
      let data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  },
  getCategoryDetail: async (categoryId) => {
    try {
      let response = await fetch(
        `http://tam-application/api/home/categories/detail/${categoryId}`,
        {
          credentials: "include",
        }
      );
      let data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  },
  createCategory: async (category) => {
    try {
      let response = await fetch(
        `http://tam-application/api/home/categories/create`,
        {
          method: "POST",
          credentials: "include",
          body: JSON.stringify(category),
          headers: {
            "Content-Type": "application/json",
          },
          redirect: "follow",
        }
      );
      let data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  },
  editCategory: async (categoryId, category) => {
    try {
      let response = await fetch(
        `http://tam-application/api/home/categories/edit/${categoryId}`,
        {
          method: "PUT",
          credentials: "include",
          body: JSON.stringify(category),
          headers: {
            "Content-Type": "application/json",
          },
          redirect: "follow",
        }
      );
      let data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  },
  deleteCategory: async (categoryId) => {
    try {
      let response = await fetch(
        `http://tam-application/api/home/categories/delete/${categoryId}`,
        {
          method: "DELETE",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          redirect: "follow",
        }
      );
      let data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  },
};

export default CategoriesService;
