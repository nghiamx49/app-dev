const SystemInfo = {
  forAdmin: async () => {
    try {
      let response = await fetch(
        "http://tam-application.studio/api/admin/systeminfo",
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
        "http://tam-application.studio/api/home/systeminfo",
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
        `http://tam-application.studio/api/profile/${userId}/relatedcourses/currentinfo`,
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
