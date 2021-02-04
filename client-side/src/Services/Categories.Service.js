const CategoriesService = {
  getAllCategories: async () => {
    try {
      let response = await fetch("/api/home/categories");
      let data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  },
  getCategoryDetail: async (categoryId) => {
    try {
      let response = await fetch(`/api/home/categories/detail/${categoryId}`);
      let data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  },
  createCategory: async (category) => {
    try {
      let response = await fetch(`/api/home/categories/create`, {
        method: "POST",
        body: JSON.stringify(category),
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow",
      });
      let data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  },
  editCategory: async (categoryId, category) => {
    try {
      let response = await fetch(`/api/home/categories/edit/${categoryId}`, {
        method: "PUT",
        body: JSON.stringify(category),
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow",
      });
      let data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  },
  deleteCategory: async (categoryId) => {
    try {
      let response = await fetch(`/api/home/categories/delete/${categoryId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        redirect: "follow",
      });
      let data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  },
};

export default CategoriesService;
