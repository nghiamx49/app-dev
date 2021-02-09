const SystemInfo = {
  forAdmin: async () => {
    try {
      let response = await fetch(
        "http://localhost:5000/admin/systeminfo",
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
  forStaff: async () => {
    try {
      let response = await fetch(
        "http://localhost:5000/home/systeminfo",
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
  forUser: async (userId) => {
    try {
      let response = await fetch(
        `http://localhost:5000/profile/${userId}/relatedcourses/currentinfo`,
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
};

export default SystemInfo;
